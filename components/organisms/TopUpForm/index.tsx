import { useRouter } from 'next/router';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BankTypes,
  NominalItemTypes,
  PaymentItemTypes,
} from '../../../services/data-types';
import NominalItem from './NominalItem';
import PaymentItem from './PaymentItem';

interface TopUpFormProps {
  nominals: NominalItemTypes[];
  payments: PaymentItemTypes[];
}

export default function TopUpForm(props: TopUpFormProps) {
  const { nominals, payments } = props;
  const [verifyId, setVerifyId] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [nominalItem, setNominalItem] = useState({});
  const [paymentItem, setPaymentItem] = useState({});
  const router = useRouter();

  const onNominalItemChange = (data: NominalItemTypes) => {
    setNominalItem(data);
  };

  const onPaymentItemChange = (payment: PaymentItemTypes, bank: BankTypes) => {
    const data = {
      payment,
      bank,
    };
    setPaymentItem(data);
  };

  const onSubmit = () => {
    let condition = true;

    if (!verifyId) {
      toast.error('Verify ID is required!');
      condition = false;
    }

    if (Object.keys(nominalItem).length === 0) {
      toast.error('Nominal is required!');
      condition = false;
    }

    if (Object.keys(paymentItem).length === 0) {
      toast.error('Payment type is required!');
      condition = false;
    }

    if (!bankAccountName) {
      toast.error('Bank account name is required!');
      condition = false;
    }

    if (condition) {
      const data = {
        verifyId,
        bankAccountName,
        nominalItem,
        paymentItem,
      };

      localStorage.setItem('topup-data', JSON.stringify(data));
      router.push('/checkout');
    }
  };

  return (
    <form action="./checkout.html" method="POST">
      <div className="pt-md-50 pt-30">
        <div className="">
          <label
            htmlFor="ID"
            className="form-label text-lg fw-medium color-palette-1 mb-10"
          >
            Verify ID
          </label>
          <input
            type="text"
            className="form-control rounded-pill text-lg"
            id="ID"
            value={verifyId}
            onChange={(e) => setVerifyId(e.target.value)}
            aria-describedby="verifyID"
            placeholder="Enter your ID"
          />
        </div>
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Nominal Top Up
        </p>
        <div className="row justify-content-between">
          {nominals.map((nominal) => (
            <NominalItem
              key={nominal._id}
              _id={nominal._id}
              coinQuantity={nominal.coinQuantity}
              coinName={nominal.coinName}
              price={nominal.price}
              onChange={() => onNominalItemChange(nominal)}
            />
          ))}
          <div className="col-lg-4 col-sm-6" />
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Payment Method
        </p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {payments.map((payment) =>
              payment.banks.map((bank) => (
                <PaymentItem
                  key={bank._id}
                  bankId={bank._id}
                  type={payment.type}
                  name={bank.bankName}
                  onChange={() => onPaymentItemChange(payment, bank)}
                />
              ))
            )}
            <div className="col-lg-4 col-sm-6" />
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label
          htmlFor="bankAccount"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Bank Account Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="bankAccount"
          value={bankAccountName}
          onChange={(e) => setBankAccountName(e.target.value)}
          aria-describedby="bankAccount"
          placeholder="Enter your Bank Account Name"
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button
          type="button"
          className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
          onClick={onSubmit}
        >
          Continue
        </button>
      </div>
      <ToastContainer theme="colored" />
    </form>
  );
}
