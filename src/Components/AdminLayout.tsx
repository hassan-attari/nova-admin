import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Boxes, CircleUserRound, LogOut, Users } from 'lucide-react';
import { paths } from '../Routes/paths';
import { useDictionary } from '../Dictionary/useDictionary';
import { Brand } from '../Shared/Brand';
import { Preferences } from '../Shared/Preferences';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { signedOut } from '../Redux/authSlice';
import { logout } from '../Utils/services/auth';
import {
  Account,
  Content,
  Header,
  Main,
  Navigation,
  Shell,
  Sidebar,
  Skip,
} from './AdminLayout.styles';

export function AdminLayout() {
  const { t } = useDictionary();
  const username = useAppSelector((state) => state.auth.username);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const section = location.pathname.startsWith(paths.users) ? 'users' : 'products';
  const pageTitle =
    location.pathname === paths.newProduct
      ? 'newProduct'
      : location.pathname === paths.newUser
        ? 'newUser'
        : section;

  function signOut() {
    logout();
    dispatch(signedOut());
    navigate(paths.login, { replace: true });
  }

  return (
    <Shell>
      <title>{`${t(pageTitle)} | ${t('brand')}`}</title>
      <Skip href="#main">{t('skip')}</Skip>
      <Sidebar>
        <Brand />
        <p>{t('admin')}</p>
        <Navigation aria-label={t('admin')}>
          <NavLink to={paths.products}>
            <Boxes size={19} aria-hidden="true" />
            {t('products')}
          </NavLink>
          <NavLink to={paths.users}>
            <Users size={19} aria-hidden="true" />
            {t('users')}
          </NavLink>
        </Navigation>
        <Account>
          <div>
            <CircleUserRound size={30} aria-hidden="true" />
            <span dir="auto">{username}</span>
          </div>
          <button type="button" onClick={signOut}>
            <LogOut size={17} aria-hidden="true" />
            {t('logout')}
          </button>
        </Account>
      </Sidebar>
      <Content>
        <Header>
          <div>
            <h2>{t(section)}</h2>
            <span>{t('admin')}</span>
          </div>
          <Preferences />
        </Header>
        <Main id="main" tabIndex={-1}>
          <Outlet />
        </Main>
      </Content>
    </Shell>
  );
}
