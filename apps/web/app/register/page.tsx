'use client';

import UserRegistrationForm from 'apps/web/src/components/UserRegistration/UserRegistrationForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <UserRegistrationForm />
      </div>
    </main>
  );
}
