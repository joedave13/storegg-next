/* eslint-disable react/jsx-one-expression-per-line */
import cx from 'classnames';
import NumberFormat from 'react-number-format';

interface TableRowProps {
  title: string;
  category: string;
  item: string;
  price: number;
  status: string;
  image: string;
}

export default function TableRow(props: TableRowProps) {
  const { title, category, item, price, status, image } = props;
  const statusClass = cx({
    'float-start icon-status': true,
    pending: status === 'PENDING',
    success: status === 'SUCCESS',
    failed: status === 'FAILED',
  });

  return (
    <tr className="align-middle">
      <th scope="row">
        <img
          className="float-start me-3 mb-lg-0 mb-3"
          src={image}
          width={80}
          height={60}
          alt="game thumbnail"
        />
        <div className="game-title-header">
          <p className="game-title fw-medium text-start color-palette-1 m-0">
            {title}
          </p>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">
            {category}
          </p>
        </div>
      </th>
      <td>
        <p className="fw-medium color-palette-1 m-0">{item}</p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">
          <NumberFormat
            value={price}
            prefix="Rp. "
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </p>
      </td>
      <td>
        <div>
          <span className={statusClass} />
          <p className="fw-medium text-start color-palette-1 m-0 position-relative">
            {status}
          </p>
        </div>
      </td>
    </tr>
  );
}
