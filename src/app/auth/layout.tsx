import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
        {children}
      </div>
    </div>
  );
}
