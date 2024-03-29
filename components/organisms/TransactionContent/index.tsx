import { useCallback, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { LatestTransactionTypes } from '../../../services/data-types';
import { getTransactionHistory } from '../../../services/member';
import ButtonTab from './ButtonTab';
import TableRow from './TableRow';

export default function TransactionContent() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [tab, setTab] = useState('ALL');

  const getTransactionHistoryData = useCallback(
    async (status) => {
      const response = await getTransactionHistory(status);
      if (response.error) {
        toast.error(response.message);
      } else {
        setData(response.data.data);
        setTotal(response.data.total);
      }
    },
    [getTransactionHistory]
  );

  useEffect(() => {
    getTransactionHistoryData('ALL');
  }, []);

  const onTabTransactionClick = (status: string) => {
    setTab(status);
    getTransactionHistoryData(status);
  };

  const IMG = process.env.NEXT_PUBLIC_IMAGE;

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Transactions
        </h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
            <NumberFormat
              value={total}
              prefix="Rp. "
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              <ButtonTab
                title="All Trx"
                active={tab === 'ALL'}
                onClick={() => onTabTransactionClick('ALL')}
              />
              <ButtonTab
                title="Success"
                active={tab === 'SUCCESS'}
                onClick={() => onTabTransactionClick('SUCCESS')}
              />
              <ButtonTab
                title="Pending"
                active={tab === 'PENDING'}
                onClick={() => onTabTransactionClick('PENDING')}
              />
              <ButtonTab
                title="Failed"
                active={tab === 'FAILED'}
                onClick={() => onTabTransactionClick('FAILED')}
              />
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                {data.map((item: LatestTransactionTypes) => (
                  <TableRow
                    key={item._id}
                    image={`${IMG}/${item.historyVoucherTopup.thumbnail}`}
                    title={item.historyVoucherTopup.gameName}
                    category={item.historyVoucherTopup.category}
                    item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`}
                    price={item.value}
                    status={item.status}
                    id={item._id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
