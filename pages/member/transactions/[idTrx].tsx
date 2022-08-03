import jwtDecode from 'jwt-decode';
import Sidebar from '../../../components/organisms/Sidebar';
import TransactionDetailContent from '../../../components/organisms/TransactionDetailContent';
import { JWTPayloadTypes, UserTypes } from '../../../services/data-types';
import { getTransactionHistoryDetail } from '../../../services/member';

export default function TransactionDetail({ transactionDetail }) {
  return (
    <section className="transactions-detail overflow-auto">
      <Sidebar activeMenu="transactions" />
      <TransactionDetailContent />
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
  params: {
    idTrx: string;
  };
}

export async function getServerSideProps({ req, params }: GetServerSideProps) {
  const { token } = req.cookies;
  const { idTrx } = params;
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const userData: UserTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMAGE;
  userData.avatar = `${IMG}/player/${userData.avatar}`;
  const response = await getTransactionHistoryDetail(idTrx, jwtToken);

  return {
    props: {
      transactionDetail: response.data,
    },
  };
}
