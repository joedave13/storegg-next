import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { checkout } from '../../../services/player';

export default function CheckoutConfirmation() {
  const [checkTransfer, setCheckTransfer] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    const itemDataLocal = localStorage.getItem('data-item');
    const topUpDataLocal = localStorage.getItem('topup-data');

    const itemData = JSON.parse(itemDataLocal!);
    const topUpData = JSON.parse(topUpDataLocal!);

    if (!checkTransfer) {
      toast.error('Make sure you have transferred your payment!');
    } else {
      const data = {
        voucher: itemData._id,
        nominal: topUpData.nominalItem._id,
        payment: topUpData.paymentItem.payment._id,
        bank: topUpData.paymentItem.bank._id,
        name: topUpData.bankAccountName,
        accountUser: topUpData.verifyId,
      };

      const response = await checkout(data);

      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success('Checkout Success!');
        router.push('/complete-checkout');
      }
    }
  };

  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input
          type="checkbox"
          checked={checkTransfer}
          onChange={() => setCheckTransfer(!checkTransfer)}
        />
        <span className="checkmark" />
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button
          className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
          type="button"
          onClick={onSubmit}
        >
          Confirm Payment
        </button>
      </div>
    </>
  );
}
