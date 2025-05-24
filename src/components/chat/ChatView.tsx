import React from 'react';
import { Chat } from '@/components/chat/Chat';
import { useTranslations } from 'next-intl';

export const ChatView = () => {
  const t = useTranslations('chat');
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 md:px-0 h-[calc(100vh-6rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('chat_page_title')}</h1>
        <p className="text-muted-foreground mt-2">{t('chat_page_description')}</p>
      </div>
      
      <div className="md:h-[calc(100%-6rem)]">
        <Chat />
      </div>
    </div>
  );
};
