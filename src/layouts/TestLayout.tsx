import TestHeader from '@/components/TestHeader';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const TestLayout = () => {
  return (
    <>
      <TestHeader />
      <Outlet />
    </>
  );
};

export default memo(TestLayout);
