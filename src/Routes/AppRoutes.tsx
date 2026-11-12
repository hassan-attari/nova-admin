import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AdminLayout } from '../Components/AdminLayout';
import { Products } from '../Pages/Products';
import { Users } from '../Pages/Users';
import { Login } from '../Pages/Login';
import { CreateProduct } from '../Pages/CreateProduct';
import { CreateUser } from '../Pages/CreateUser';
import { useAppSelector } from '../Redux/hooks';
import { paths } from './paths';

function ProtectedRoute() {
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const location = useLocation();

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate to={paths.login} replace state={{ from: location.pathname }} />
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={paths.login} element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path={paths.products} element={<Products />} />
          <Route path={paths.newProduct} element={<CreateProduct />} />
          <Route path={paths.users} element={<Users />} />
          <Route path={paths.newUser} element={<CreateUser />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={paths.products} replace />} />
    </Routes>
  );
}
