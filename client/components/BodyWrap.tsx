import type {NextPage} from 'next';
import {ReactNode} from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
import RequireAuth from './RequireAuth';

type BodyProps = {
  children: ReactNode
}

const BodyWrap: NextPage<BodyProps> = (props: BodyProps) => {
  return (
    <RequireAuth>
      <>
        <Sidebar />
        <Topbar />
        <MobileNav />
        <div className='bodywrap'>
          {props.children}
        </div>
      </>
    </RequireAuth>
  )
}

export default BodyWrap;