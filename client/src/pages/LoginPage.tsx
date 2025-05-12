import { Link } from 'react-router';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Pirmas kartas?</h1>
          <Link to={'/signup'} className="link link-primary">
            Prašome užsiregistruoti
          </Link>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
