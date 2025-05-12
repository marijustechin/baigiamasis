import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { userLoginSchema } from '../../schemas/user';
import { Link } from 'react-router';
import UserService from '../../services/user';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof userLoginSchema>> = async (
    formValues
  ) => {
    try {
      const response = UserService.login(formValues.email, formValues.password);
      console.log(response);
    } catch (error) {
      // kol kas tik console log
      console.log(error);
    }
    console.log(formValues);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="card-body">
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
          autoComplete="off"
          {...register('password')}
        />
        {errors.password && (
          <span className="text-xs text-rose-500">
            {errors.password.message}
          </span>
        )}
        <p>
          <Link to={'/'} className="link link-primary link-hover">
            Pamiršote slaptažodį?
          </Link>
        </p>
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Prisijungti
        </button>
      </div>
    </form>
  );
};
