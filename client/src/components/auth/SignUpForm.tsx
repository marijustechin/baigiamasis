import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { userRegisterSchema } from '../../schemas/user';
import { useNavigate } from 'react-router';
import UserService from '../../services/user.service';
import toast from 'react-hot-toast';
import HelperService from '../../services/helper.service';
import { useState } from 'react';

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof userRegisterSchema>> = async (
    formValues
  ) => {
    setSubmitting(true);

    try {
      await UserService.register(
        formValues.username,
        formValues.email,
        formValues.password
      );

      toast.success('Sėkmingai užsiregistravote! Prašome prisijungti.');
      navigate('/login');
    } catch (error) {
      toast.error(HelperService.errorToString(error), {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="card-body">
      <div className="form-control">
        <label htmlFor="username" className="label p-2">
          <span className="label-text">Vardas</span>
        </label>
        <input
          id="username"
          type="text"
          placeholder="Jūsų vardas"
          className="input input-bordered autofill:transition-colors autofill:duration-[999999999s]"
          autoComplete="on"
          {...register('username')}
        />
        {errors.username && (
          <span className="text-xs text-rose-500">
            {errors.username.message}
          </span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="email" className="label p-2">
          <span className="label-text">El. paštas</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="El. pašto adresas"
          className="input input-bordered autofill:transition-colors autofill:duration-[999999999s]"
          autoComplete="on"
          {...register('email')}
        />
        {errors.email && (
          <span className="text-xs text-rose-500">{errors.email.message}</span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="password" className="label p-2">
          <span className="label-text">Slaptažodis</span>
        </label>
        <input
          id="password"
          type="password"
          placeholder="Slaptažodis"
          className="input input-bordered autofill:transition-colors autofill:duration-[999999999s]"
          {...register('password')}
        />
        {errors.password && (
          <span className="text-xs text-rose-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          Užsiregistruoti
        </button>
      </div>
    </form>
  );
};
