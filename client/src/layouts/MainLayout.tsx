import { Outlet } from 'react-router';
import { Footer } from '../components/Footer';
import { Header } from '../components/header/Header';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
