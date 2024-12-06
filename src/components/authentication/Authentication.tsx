import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const Authentication = () => {
  const [formType, setFormType] = useState<'login' | 'register'>('login'); // Track form type (login or register)

  const toggleForm = () => {
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  return (
    <div className="user-container">
      {formType === 'login' ? <LoginForm /> : <RegisterForm />}

      <div className="flex justify-center mt-4">
        <button 
          onClick={toggleForm} 
          className="text-blue-500 hover:text-blue-700 font-medium text-sm transition duration-200 ease-in-out">
          {formType === 'login' ? 'Need an account? Register here.' : 'Already have an account? Login here.'}
        </button>
      </div>

    </div>
  );
};
