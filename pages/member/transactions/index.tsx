import jwtDecode from 'jwt-decode';
import Sidebar from '../../../components/organisms/Sidebar';
import TransactionContent from '../../../components/organisms/TransactionContent';
import { JWTPayloadTypes, UserTypes } from '../../../services/data-types';

export default function Transaction() {
  return (
    <section className="transactions overflow-auto">
      <Sidebar activeMenu="transactions" />
      <TransactionContent />
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
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

  return {
    props: {
      user: userData,
    },
  };
}
