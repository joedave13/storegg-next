import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Footer from './Footer';
import MenuItem from './MenuItem';
import Profile from './Profile';

interface SidebarProps {
  activeMenu: 'overview' | 'transactions' | 'settings';
}

export default function Sidebar(props: SidebarProps) {
  const { activeMenu } = props;

  const router = useRouter();

  const logout = () => {
    Cookies.remove('token');
    router.push('/sign-in');
  };

  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem
            icon="menu-overview"
            title="Overview"
            href="/member"
            active={activeMenu === 'overview'}
          />
          <MenuItem
            icon="menu-transactions"
            title="Transactions"
            href="/member/transactions"
            active={activeMenu === 'transactions'}
          />
          <MenuItem icon="menu-messages" title="Messages" />
          <MenuItem icon="menu-card" title="Card" />
          <MenuItem icon="menu-rewards" title="Rewards" />
          <MenuItem
            icon="menu-settings"
            title="Settings"
            href="/member/edit-profile"
            active={activeMenu === 'settings'}
          />
          <MenuItem icon="menu-logout" title="Log Out" onClick={logout} />
        </div>
        <Footer />
      </div>
    </section>
  );
}
