import { Link } from 'react-router';
import { SignUpForm } from '../components/auth/SignUpForm';

export const SignUpPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-semibold">Ne pirmas kartas?</h1>
          <Link to={'/login'} className="link link-primary">
            Prašome prisijungti
          </Link>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};
