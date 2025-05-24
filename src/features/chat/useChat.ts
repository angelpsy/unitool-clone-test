import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system';
  timestamp: Date;
  lang?: string;
}

type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';

interface UseChatOptions {
  currentLanguage: string;
}

interface UseChatReturn {
  messages: ChatMessage[];
  connectionStatus: ConnectionStatus;
  error: string | null;
  isAiTyping: boolean;
  sendMessage: (messageText: string) => void;
}

interface SystemMessagePayload {
  type: 'ai_typing_started' | 'ai_typing_finished';
}

const useChat = ({ currentLanguage }: UseChatOptions): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const wsHost = process.env.NEXT_PUBLIC_WS_HOST || 'http://localhost';
  const wsPort = process.env.NEXT_PUBLIC_WS_PORT || '3000';
  const socketURL = `${wsHost}:${wsPort}`;

  useEffect(() => {
    if (!socketURL) {
      console.error('WebSocket URL is not defined. Please check environment variables NEXT_PUBLIC_WS_HOST and NEXT_PUBLIC_WS_PORT.');
      setConnectionStatus('error');
      setError('WebSocket URL is not defined.');
      return;
    }

    setConnectionStatus('connecting');
    setError(null);
    const socket = io(socketURL, {
      reconnectionAttempts: 5,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server', socket.id);
      setConnectionStatus('connected');
      setError(null);
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
      setConnectionStatus('disconnected');
      setError(reason === 'io server disconnect' ? 'Disconnected by server.' : 'Disconnected: ' + reason);
      setIsAiTyping(false);
    });

    socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
      setConnectionStatus('error');
      setError('Connection error: ' + err.message);
      setIsAiTyping(false);
    });

    socket.on('welcome', (welcomeMessage: string) => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: uuidv4(),
          text: welcomeMessage,
          sender: 'system',
          timestamp: new Date(),
        },
      ]);
    });

    socket.on('chat_message', (messageText: string) => {
      setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length -1];
        if(lastMessage && lastMessage.sender === 'user' && lastMessage.text === messageText) {
             return [
                ...prevMessages,
                {
                  id: uuidv4(),
                  text: messageText,
                  sender: 'ai',
                  timestamp: new Date(),
                  lang: currentLanguage,
                },
              ];
        }
        return [
          ...prevMessages,
          {
            id: uuidv4(),
            text: messageText,
            sender: 'ai',
            timestamp: new Date(),
            lang: currentLanguage,
          },
        ];
      });
    });

    socket.on('system_message', (payload: SystemMessagePayload) => {
      if (payload.type === 'ai_typing_started') {
        setIsAiTyping(true);
      } else if (payload.type === 'ai_typing_finished') {
        setIsAiTyping(false);
      }
    });

    return () => {
      if (socketRef.current) {
        console.log('Disconnecting WebSocket');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setConnectionStatus('disconnected');
      setIsAiTyping(false);
    };
  }, [socketURL, currentLanguage]);

  const sendMessage = useCallback((messageText: string) => {
    if (messageText.trim() && socketRef.current && socketRef.current.connected) {
      const userMessage: ChatMessage = {
        id: uuidv4(),
        text: messageText,
        sender: 'user',
        timestamp: new Date(),
        lang: currentLanguage,
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      socketRef.current.emit('chat_message', messageText);
    } else {
      console.log('Socket not connected or input is empty');
    }
  }, [currentLanguage, setMessages]);

  return {
    messages,
    connectionStatus,
    error,
    isAiTyping,
    sendMessage,
  };
};

export default useChat;
