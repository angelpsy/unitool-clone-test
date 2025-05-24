import React from 'react';
import { MessageType } from '@/types/chat';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  text: string;
  type: MessageType;
}

export const MessageBubble = ({ text, type }: MessageBubbleProps) => {
  const isUser = type === 'user';

  return (
    <div
      className={cn(
        'max-w-[80%] rounded-lg p-3 mb-2',
        isUser
          ? 'bg-gray-300 dark:bg-gray-800 text-primary-foreground ml-auto'
          : 'bg-gray-200 dark:bg-gray-700 text-muted-foreground'
      )}
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="m-0">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-200 dark:bg-gray-800 p-2 rounded overflow-x-auto text-sm">
              {children}
            </pre>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};
