import cx from 'classnames';
import Link from 'next/link';

interface MenuItemProps {
  title: string;
  icon:
    | 'menu-overview'
    | 'menu-transactions'
    | 'menu-messages'
    | 'menu-card'
    | 'menu-rewards'
    | 'menu-settings'
    | 'menu-logout';
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

export default function MenuItem(props: Partial<MenuItemProps>) {
  const { title, icon, active, href = '/#', onClick } = props;
  const classTitle = cx({
    item: true,
    'mb-30': true,
    active,
  });

  return (
    <div className={classTitle} onClick={onClick}>
      <img
        src={`/icon/${icon}.svg`}
        className="icon me-3"
        width={25}
        height={25}
        alt="menu"
      />
      <p className="item-title m-0">
        {onClick ? (
          <a className="text-lg text-decoration-none">{title}</a>
        ) : (
          <Link href={href}>
            <a className="text-lg text-decoration-none">{title}</a>
          </Link>
        )}
      </p>
    </div>
  );
}
