import type {NextPage} from 'next';
import {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import BodyWrap from '../../components/BodyWrap';
import {Formik, Form} from 'formik';
import * as Yup from "yup";
import {ProfileFormValues, SetSubmitting} from '../../interfaces';
import {getDetails, updateDetails} from '../../api/profile';
import {toast} from 'react-toastify';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required!').min(3, 'Provide first name'),
  lastName: Yup.string().required('This field is required!').min(3, 'Provide last name'),
  url: Yup.string().required('This field is required!').min(3, 'Provide url'),
  bio: Yup.string().required('This field is required!').min(3, 'Provide bio')
});

const Profile: NextPage = () => {
  const [profile, setProfile] = useState<ProfileFormValues>({
    firstName: '',
    lastName: '',
    url: '',
    bio: '',
    image: '',
  });

  useEffect(() => {
    const getProfile = async () => {
      const result = await getDetails();
      setProfile(result.data.data);
    };

    getProfile();
  }, []);

  const initialValues: ProfileFormValues = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    bio: profile.bio,
    url: decodeURIComponent(profile.url)
  };

  const formSubmit: SetSubmitting<ProfileFormValues> = useCallback(async (values: ProfileFormValues, {setSubmitting}) => {

    try {
      const body: ProfileFormValues = {
        firstName: values.firstName,
        lastName: values.lastName,
        bio: values.bio,
        url: encodeURIComponent(values.url)
      };
      
      const res = await updateDetails(body);
      if(res.status === 200) {
        toast.success('Updated details succesfully');
        setProfile(res.data.data);
      } else {
        toast.error('Could not update details');
      }
    } catch (e) {
      toast.error('Could not update details');
    }

    setSubmitting(false);
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Lightning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BodyWrap>
        <h1 className='page_headers'>Profile</h1>
        <section className='divider' />
        <section className='form_wrap'>
          <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={validationSchema} onSubmit={formSubmit} >{({values, errors, isSubmitting, handleChange}) => (
            <Form>
              <div className="wrap">
                <section className="inputgroup">
                  <label htmlFor="firstName" className="form_label">
                    First Name
                  </label>
                  <div className="flex items-center w-full">
                    <input
                      id="firstName"
                      className='form_input'
                      type="text"
                      value={values.firstName}
                      placeholder="Your first name"
                      onChange={handleChange}
                    />
                  </div>
                </section>
                {errors.firstName ? <p className="formErrors">{errors.firstName}</p> : null}
              </div>
              <div className="wrap">
                <section className="inputgroup">
                  <label htmlFor="lastName" className="form_label">
                    Last Name
                  </label>
                  <div className="flex items-center w-full">
                    <input
                      id="lastName"
                      className='form_input'
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                    />
                  </div>
                </section>
                {errors.lastName ? <p className="formErrors">{errors.lastName}</p> : null}
              </div>
              <div className="wrap">
                <section className="inputgroup">
                  <label htmlFor="url" className="form_label">
                    Url
                  </label>
                  <div className="flex items-center w-full">
                    <input
                      id="url"
                      className='form_input'
                      type="url"
                      value={values.url}
                      placeholder="Your website url"
                      onChange={handleChange}
                    />
                  </div>
                </section>
                {errors.url ? <p className="formErrors">{errors.url}</p> : null}
              </div>
              <div className="wrap">
                <section className="inputgroup">
                  <label htmlFor="bio" className="form_label">
                    Bio
                  </label>
                  <div className="flex items-center w-full">
                    <textarea
                      id="bio"
                      rows={3}
                      className='form_textarea'
                      value={values.bio}
                      onChange={handleChange}
                      placeholder="Your bio"
                    />
                  </div>
                </section>
                {errors.bio ? <p className="formErrors">{errors.bio}</p> : null}
              </div>
              <section className="wrap">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-bold mt-4 text-sm bg-black text-white rounded-lg p-3 w-full">
                  Update profile
                </button>
              </section>
            </Form>
          )}</Formik>
        </section>
      </BodyWrap>
    </>
  )
}

export default Profile;
