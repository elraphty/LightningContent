import type {NextPage} from 'next'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BodyWrap from '../components/BodyWrap';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Lightning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BodyWrap>
        <h1 className='text-red mt-5'>Hello Testing</h1>
      </BodyWrap>

    </div>
  )
}

export default Home
