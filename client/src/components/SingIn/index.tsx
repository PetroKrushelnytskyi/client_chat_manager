import { UserContext } from '../../../contexts/User';
import { trpc } from '../../../lib/trpc';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';


import { Account } from '@prisma/client';

type SingInForm = Omit<
  Account,
  | 'id'
  | 'role'
  | 'createdAt'
  | 'updatedAt'
  | 'firstName'
  | 'lastName'
  | 'fatherly'
>;

export const SingIn = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<SingInForm>({
    defaultValues: {
      login: '',
      password: ''
    }
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
    }
  });

  const onSubmitFun = async (data: SingInForm) => {
    try {
      const response = await singInMutation.mutateAsync(data);

      login(response.token);
    } catch {
      setError('login', {
        type: 'manual',
        message: 'Невірний логін або пароль'
      });
    }
  };

  return (
    <div className="page__container">
      <div className="auth">
        <form className="auth__form" onSubmit={handleSubmit(onSubmitFun)}>
          <h1 className="auth__title">Вхід</h1>
          <label className="label">
            Логін
            <input
              type="text"
              className="input"
              {...register('login', { required: "Поле обов'язкове" })}
            />
            {errors.login?.message && (
              <span className="error">{errors.login.message}</span>
            )}
          </label>
          <label className="label">
            Пароль
            <input
              type="password"
              className="input"
              {...register('password')}
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
};
