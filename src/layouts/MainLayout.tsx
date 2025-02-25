import Header from '@/components/Header';
import { memo } from 'react';

import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default memo(MainLayout);
