import { BrowserRouter, Route, Routes } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFounPage';
import { UserLayout } from './layouts/UserLayout';
import { UserHomePage } from './pages/UserHomePage';
import { AdminHomePage } from './pages/AdminHomePage';
import { AdminLayout } from './layouts/AdminLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/* registracija, loginas, listingai */}
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserHomePage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
