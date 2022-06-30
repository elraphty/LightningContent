import type {NextPage} from 'next';
import {useCallback, useEffect, useMemo, useState, useContext} from 'react';
import Head from 'next/head';
import BodyWrap from '../../components/BodyWrap';
import {Formik, Form} from 'formik';
import * as Yup from "yup";
import {SettingsFormValues, SetSubmitting} from '../../interfaces';
import {getSettings, updateSettings} from '../../api/settings';
import {toast} from 'react-toastify';

const validationSchema = Yup.object().shape({
  defaultCurrency: Yup.string().required('This field is required!').min(3, 'Provide default currency'),
  satsRatio: Yup.string().required('This field is required!').min(3, 'Specificy a ratio')
});

const Settings: NextPage = () => {
  const [userSettings, setUserSettings] = useState<SettingsFormValues>({
    satsRatio: '',
    defaultCurrency: '',
  });

  useEffect(() => {
    const getUserSettings = async () => {
      const settings = await getSettings();
      setUserSettings(settings.data.data);
    };

    getUserSettings();
  }, []);

  const initialValues: SettingsFormValues = {
    satsRatio: userSettings.satsRatio,
    defaultCurrency: userSettings.defaultCurrency,
  };

  const formSubmit: SetSubmitting<SettingsFormValues> = useCallback(async (values: SettingsFormValues, {setSubmitting}) => {

    try {
      const body: SettingsFormValues = {
        defaultCurrency: values.defaultCurrency.toLowerCase(),
        satsRatio: values.satsRatio
      };
      
      const res = await updateSettings(body);
      if(res.status === 200) {
        toast.success('Updated settings succesfully');
        setUserSettings(res.data.data);
      } else {
        toast.error('Could not update settings ');
      }
    } catch (e) {
      toast.error('Could not update settings ');
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
        <h1 className='page_headers'>Settings</h1>
        <section className='divider' />
        <section className='form_wrap'>
          <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={validationSchema} onSubmit={formSubmit} >{({values, errors, isSubmitting, handleChange}) => (
            <Form>
              <div className="wrap">
                <section className="inputgroup">
                  <label htmlFor="defaultCurrency" className="form_label">
                    Default Currency
                  </label>
                  <div className="flex items-center w-full">
                    <input
                      id="defaultCurrency"
                      className='form_input'
                      type="text"
                      value={values.defaultCurrency.toLocaleUpperCase()}
                      placeholder="Your default currency"
                      onChange={handleChange}
                    />
                  </div>
                </section>
                {errors.defaultCurrency ? <p className="formErrors">{errors.defaultCurrency}</p> : null}
              </div>
              <div className="wrap">
                <section className="inputgroup">
                  <label htmlFor="satsRatio" className="form_label">
                    Sats Ratio
                  </label>
                  <div className="flex items-center w-full">
                    <input
                      id="satsRatio"
                      className='form_input'
                      type="text"
                      value={values.satsRatio}
                      onChange={handleChange}
                      placeholder="Your sats to fiat ratio"
                    />
                  </div>
                </section>
                {errors.satsRatio ? <p className="formErrors">{errors.satsRatio}</p> : null}
              </div>
              <section className="wrap">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-bold mt-4 text-sm bg-black text-white rounded-lg p-3 w-full">
                  Update settings
                </button>
              </section>
            </Form>
          )}</Formik>
        </section>
      </BodyWrap>
    </>
  )
}

export default Settings;