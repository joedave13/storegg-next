import Footer from './Footer';
import MenuItem from './MenuItem';
import Profile from './Profile';

export default function Sidebar() {
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem icon="menu-overview" title="Overview" active />
          <MenuItem icon="menu-transactions" title="Transactions" />
          <MenuItem icon="menu-messages" title="Messages" />
          <MenuItem icon="menu-card" title="Card" />
          <MenuItem icon="menu-rewards" title="Rewards" />
          <MenuItem icon="menu-settings" title="Settings" />
          <MenuItem icon="menu-logout" title="Log Out" />
        </div>
        <Footer />
      </div>
    </section>
  );
}
