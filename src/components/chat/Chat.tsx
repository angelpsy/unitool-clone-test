import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useTranslations, useLocale } from 'next-intl';
import { Message } from '@/types/chat';
import useChat, { ChatMessage as HookChatMessage } from '@/features/chat/useChat';

export const Chat = () => {
  const t = useTranslations('chat');
  const currentLocale = useLocale();

  const { 
    messages: hookMessages, 
    sendMessage,
    connectionStatus,
    error: hookError,
    isAiTyping
  } = useChat({ currentLanguage: currentLocale });

  const messages: Message[] = hookMessages
    .filter(hookMsg => hookMsg.sender === 'user' || hookMsg.sender === 'ai') 
    .map((hookMsg: HookChatMessage): Message => ({
      id: hookMsg.id,
      text: hookMsg.text,
      from: hookMsg.sender as 'user' | 'ai', 
      timestamp: hookMsg.timestamp.getTime(),
    }));

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      sendMessage(text);
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return t('status_connected');
      case 'connecting':
        return t('status_connecting');
      case 'disconnected':
        return t('status_disconnected');
      case 'error':
        return t('status_error');
      case 'idle':
        return t('status_idle');
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col h-full bg-background rounded-lg shadow-lg border">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">{t('chat_title')}</h2>
        <p className="text-sm text-muted-foreground">
          {getStatusText()}
        </p>
        {hookError && (
          <p className="text-sm text-red-500 mt-1">{hookError}</p>
        )}
      </div>

      <ChatMessages messages={messages} isTyping={isAiTyping} />

      <ChatInput 
        onSendMessage={handleSendMessage} 
        isDisabled={connectionStatus !== 'connected'}
      />
    </div>
  );
};
