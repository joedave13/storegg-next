import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { signIn } from '../../../services/auth';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const onSubmit = async () => {
    if (!email) {
      toast.error('Email address is required!');
    }

    if (!password) {
      toast.error('Password is required!');
    }

    if (email && password) {
      const data = {
        email,
        password,
      };

      const response = await signIn(data);

      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        const { token } = response.data;
        const tokenBase64 = btoa(token);
        Cookies.set('token', tokenBase64, { expires: 1 });
        // router.push('/');
      }
    }
  };

  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
      <p className="text-lg color-palette-1 m-0">
        Masuk untuk melakukan proses top up
      </p>
      <div className="pt-50">
        <label
          htmlFor="email"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Email Address
        </label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email"
          placeholder="Enter your email address"
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="password"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Password
        </label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="password"
          placeholder="Your password"
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          type="button"
          className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
          onClick={onSubmit}
        >
          Continue to Sign In
        </button>
        <Link href="/sign-up">
          <a
            className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill"
            role="button"
          >
            Sign Up
          </a>
        </Link>
      </div>
      <ToastContainer theme="colored" />
    </>
  );
}
