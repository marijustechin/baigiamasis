import { Outlet, useNavigate } from 'react-router';
import { useAuthStore } from '../stores/authStore';
import { Header } from '../components/header/Header';
import { Footer } from '../components/Footer';
import { useEffect } from 'react';

export const AdminLayout = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'ADMIN') navigate('/login');
  }, [user, navigate]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
