/* eslint-disable react/jsx-curly-newline */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { signUp } from '../services/auth';
import { CategoryTypes } from '../services/data-types';
import { getGameCategory } from '../services/player';

export default function SignUpPhoto() {
  const [categories, setCategories] = useState([]);
  const [favorite, setFavorite] = useState('');
  const [avatar, setAvatar] = useState<any>('');
  const [avatarPreview, setAvatarPreview] = useState('/');
  const [localForm, setLocalForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const getGameCategoryApi = useCallback(async () => {
    const data = await getGameCategory();
    setCategories(data);
    setFavorite(data[0]._id);
  }, [getGameCategory]);

  useEffect(() => {
    getGameCategoryApi();
  }, []);

  useEffect(() => {
    const getLocalForm = localStorage.getItem('user-form');
    setLocalForm(JSON.parse(getLocalForm!));
  }, []);

  const onSubmit = async () => {
    const getLocalForm = await localStorage.getItem('user-form');
    const form = JSON.parse(getLocalForm!);
    const data = new FormData();

    data.append('name', form.name);
    data.append('email', form.email);
    data.append('username', form.name);
    data.append('password', form.password);
    data.append('phoneNumber', '081234567890');
    data.append('role', 'USER');
    data.append('status', 'Y');
    data.append('favorite', favorite);
    data.append('avatar', avatar);

    const result = await signUp(data);
    if (result.error) {
      toast.error(result.message);
    } else {
      localStorage.removeItem('user-form');

      toast.success('Register successfully!');
      router.push('/sign-up-success');
    }
  };

  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">
                    {avatarPreview === '/' ? (
                      <Image
                        src="/icon/upload.svg"
                        width={120}
                        height={120}
                        alt="upload"
                      />
                    ) : (
                      <img
                        src={avatarPreview}
                        className="img-upload"
                        alt="upload"
                      />
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const avt = e.target.files![0];
                      setAvatarPreview(URL.createObjectURL(avt));
                      return setAvatar(avt);
                    }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                {localForm.name}
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">
                {localForm.email}
              </p>
              <div className="pt-50 pb-50">
                <label
                  htmlFor="category"
                  className="form-label text-lg fw-medium color-palette-1 mb-10"
                >
                  Favorite Game
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                  value={favorite}
                  onChange={(e) => setFavorite(e.target.value)}
                >
                  {categories.map((category: CategoryTypes) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button
                type="button"
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                onClick={onSubmit}
              >
                Create My Account
              </button>
              <a
                className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                href="/#"
                role="button"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
