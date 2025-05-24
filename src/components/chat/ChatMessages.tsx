import React, { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { useTranslations } from 'next-intl';

interface ChatMessagesProps {
  messages: Message[];
  isTyping?: boolean;
}

export const ChatMessages = ({ messages, isTyping = false }: ChatMessagesProps) => {
  const t = useTranslations('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          <p>{t('start_conversation')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              text={message.text}
              type={message.from}
            />
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="flex space-x-1">
                <span className="animate-bounce h-2 w-2 rounded-full bg-muted-foreground" style={{ animationDelay: '0ms' }}></span>
                <span className="animate-bounce h-2 w-2 rounded-full bg-muted-foreground" style={{ animationDelay: '300ms' }}></span>
                <span className="animate-bounce h-2 w-2 rounded-full bg-muted-foreground" style={{ animationDelay: '600ms' }}></span>
              </div>
              <span className="text-sm">{t('ai_is_typing')}</span>
            </div>
          )}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
