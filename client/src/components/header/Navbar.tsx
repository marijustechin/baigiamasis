import { Link } from 'react-router';
import { navLinks } from './NavbarLinks';
import { useAuthStore } from '../../stores/authStore';
import { ThemeToggle } from '../ThemeToggle';

export const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <button type="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link to={link.link}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to={'/'} className="flex items-end justify-center">
          <img src="/logo.png" alt="logotipas" />
          <span className="hidden md:block text-xl">arijusTechin</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link to={link.link}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          {user ? (
            <button onClick={logout} className="btn btn-primary">
              Atsijungti
            </button>
          ) : (
            <button className="btn btn-primary">
              <Link to={'/login'}>Prisijungti</Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
