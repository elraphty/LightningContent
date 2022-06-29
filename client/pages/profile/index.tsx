import type {NextPage} from 'next';
import Head from 'next/head';
import BodyWrap from '../../components/BodyWrap';

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Lightning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BodyWrap>
        <h1 className='page_headers'>Profile</h1>
        <section className='divider'/>
      </BodyWrap>
    </>
  )
}

export default Profile;
