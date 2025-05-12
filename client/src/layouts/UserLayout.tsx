import { Outlet, useNavigate } from 'react-router';
import { Header } from '../components/header/Header';
import { Footer } from '../components/Footer';
import { useAuthStore } from '../stores/authStore';
import { useEffect } from 'react';

export const UserLayout = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'USER') navigate('/login');
  }, [user, navigate]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
