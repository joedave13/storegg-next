import cx from 'classnames';

interface MenuItemProps {
  title: String;
  icon:
    | 'menu-overview'
    | 'menu-transactions'
    | 'menu-messages'
    | 'menu-card'
    | 'menu-rewards'
    | 'menu-settings'
    | 'menu-logout';
  active?: boolean;
}

export default function MenuItem(props: Partial<MenuItemProps>) {
  const { title, icon, active } = props;
  const classTitle = cx({
    item: true,
    'mb-30': true,
    active,
  });

  return (
    <div className={classTitle}>
      <img
        src={`/icon/${icon}.svg`}
        className="icon me-3"
        width={25}
        height={25}
        alt="menu"
      />
      <p className="item-title m-0">
        <a href="/#" className="text-lg text-decoration-none">
          {title}
        </a>
      </p>
    </div>
  );
}
