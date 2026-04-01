import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Fieldset from 'apps/web/src/components/Fieldset';
import Input from 'apps/web/src/components/Input';
import Label from 'apps/web/src/components/Label';
import Link from 'apps/web/src/components/Link';
import { useCallback, useState } from 'react';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

export default function UserRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Username validation (check trimmed length for consistency)
    const trimmedUsername = formData.username.trim();
    if (!trimmedUsername) {
      newErrors.username = 'Username is required';
    } else if (trimmedUsername.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    },
    [errors],
  );

  const handleButtonClick = useCallback(() => {
    // Trigger form submission
    const form = document.querySelector('form');
    if (form) {
      form.requestSubmit();
    }
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSuccessMessage('');
      setErrors({});

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);

      void (async () => {
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: formData.username.trim(),
              email: formData.email.trim(),
              password: formData.password,
            }),
          });

          const data = (await response.json()) as
            | { error: string }
            | { message: string; user: { username: string; email: string } };

          if (!response.ok) {
            setErrors({ general: 'error' in data ? data.error : 'Registration failed. Please try again.' });
          } else {
            setSuccessMessage('Registration successful! You can now log in.');
            setFormData({
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            });
          }
        } catch (error) {
          setErrors({ general: 'An error occurred. Please try again later.' });
        } finally {
          setIsSubmitting(false);
        }
      })();
    },
    [formData, validateForm],
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-black">Create Account</h2>

        {errors.general && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <Fieldset>
          <Label htmlFor="username" className="text-black">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange('username')}
            disabled={isSubmitting}
            autoComplete="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Choose a username"
          />
          {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="email" className="text-black">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            disabled={isSubmitting}
            autoComplete="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="password" className="text-black">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange('password')}
            disabled={isSubmitting}
            autoComplete="new-password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Min. 8 characters"
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="confirmPassword" className="text-black">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            disabled={isSubmitting}
            autoComplete="new-password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Re-enter password"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </Fieldset>

        <Button
          onClick={handleButtonClick}
          variant={ButtonVariants.Black}
          size={ButtonSizes.Medium}
          fullWidth
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
