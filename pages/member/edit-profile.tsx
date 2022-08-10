import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../components/atoms/Input';
import Sidebar from '../../components/organisms/Sidebar';
import { JWTPayloadTypes, UserTypes } from '../../services/data-types';
import { updateProfile } from '../../services/member';

export default function EditProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
  });

  const [imagePreview, setImagePreview] = useState('/');
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      setUser(userFromPayload);
    }
  }, []);

  const IMG = process.env.NEXT_PUBLIC_IMAGE;

  const onSubmit = async () => {
    const data = new FormData();
    data.append('name', user.name);
    data.append('avatar', user.avatar);
    const response = await updateProfile(data);

    if (response.error) {
      toast.error(response.message);
    } else {
      Cookies.remove('token');
      router.push('/sign-in');
    }
  };

  return (
    <section className="edit-profile overflow-auto">
      <Sidebar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bolbd color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="image-upload">
                  <label htmlFor="avatar">
                    {imagePreview === '/' ? (
                      <img
                        src={`${IMG}/player/${user.avatar}`}
                        width={90}
                        height={90}
                        style={{ borderRadius: '100%', objectFit: 'cover' }}
                        alt="img-profile"
                      />
                    ) : (
                      <img
                        src={imagePreview}
                        width={90}
                        height={90}
                        style={{ borderRadius: '100%', objectFit: 'cover' }}
                        alt="img-profile"
                      />
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const img = e.target.files![0];
                      setImagePreview(URL.createObjectURL(img));
                      return setUser({ ...user, avatar: img });
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input
                  label="Full Name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="pt-30">
                <Input label="Email Address" value={user.email} disabled />
              </div>
              {/* <div className="pt-30">
                <Input label="Phone" />
              </div> */}
              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="button"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  onClick={onSubmit}
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
