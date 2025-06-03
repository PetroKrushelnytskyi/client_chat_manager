import { UserContext } from '../../../contexts/User';
import { trpc } from '../../../lib/trpc';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Account } from '@prisma/client';

type SingInForm = Omit<
  Account,
  'id' | 'role' | 'createdAt' | 'updatedAt' | 'firstName' | 'lastName' | 'fatherly'
>;

export const SingIn = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SingInForm>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const { login } = useContext(UserContext);

  const singInMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        login(data.token);
      }
    },
    onError: (error) => {
      console.error('Error during sign-in:', error);
    },
  });

  const onSubmitFun = async (data: SingInForm) => {
    try {
      const response = await singInMutation.mutateAsync(data);
      login(response.token);
    } catch {
      setError('login', {
        type: 'manual',
        message: 'Невірний логін або пароль',
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <div className="w-full max-w-md bg-blue-100 p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmitFun)} className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Вхід</h1>

          <div>
            <label className="block text-sm font-medium text-gray-700">Логін</label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register('login', { required: "Поле обов'язкове" })}
            />
            {errors.login?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.login.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Пароль</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register('password')}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
};
