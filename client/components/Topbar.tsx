import type { NextPage } from 'next';
import { useAuth } from '../pages/context/AuthContext';

const Topbar: NextPage = () => {
  let { logout } = useAuth();

  const logoutUser = async () => {
    logout();
  }

  return (
    <div className='topbar'>
      <section className="right">
        <p onClick={logoutUser}>Logout</p>
      </section>
    </div>
  )
}

export default Topbar;