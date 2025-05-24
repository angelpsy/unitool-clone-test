import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
}

interface FormValues {
  message: string;
}

export const ChatInput = ({ onSendMessage, isDisabled = false }: ChatInputProps) => {
  const t = useTranslations('chat');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    if (!data.message.trim() || isDisabled || isSubmitting) return;

    setIsSubmitting(true);
    try {
      onSendMessage(data.message);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border-t p-4">
      <div className="flex flex-col space-y-2">
        <div className="relative">
          <Textarea
            {...register('message', {
              required: t('message_required')
            })}
            placeholder={t('type_message')}
            className={cn(
              'min-h-[80px] resize-none pr-14',
              errors.message && 'border-red-500'
            )}
            disabled={isDisabled || isSubmitting}
            onKeyDown={handleKeyDown}
          />
          <Button
            type="submit"
            size="sm"
            className={cn(
              'absolute bottom-2 right-2 px-3',
              isSubmitting && 'bg-opacity-70'
            )}
            disabled={isDisabled || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t('sending')}
              </span>
            ) : (
              t('send')
            )}
          </Button>
        </div>
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>
    </form>
  );
};
