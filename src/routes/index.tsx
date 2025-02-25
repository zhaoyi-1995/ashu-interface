import { Suspense, lazy, ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';
import Loading from '@/components/Loading';
import PageNotFoundView from '@/components/common/PageNotFoundView';
import MainLayout from '@/layouts/MainLayout';
import TestLayout from '@/layouts/TestLayout';
import BankApp from '@/pages/BankApp';
import DApp from '@/pages/DApp';
import Home from '@pages/Home';

const Immer = lazy(() => import('@pages/Immer'))
const State = lazy(() => import('@pages/State'))
const Jotai = lazy(() => import('@pages/Jotai'))


const Layout = ({children = <MainLayout />}: { children?: ReactNode }) => (
  <Suspense fallback={<Loading />}>
    { children }
  </Suspense>
)


const Routes: RouteObject[] = [];

const mainRoutes: RouteObject = {
  path: '/',
  element: <Layout />,
  children: [
    { path: '*', element: <PageNotFoundView /> },
    { path: '', element: <Home /> },
    { path: 'dapp', element: <DApp /> },
    { path: 'bank', element: <BankApp /> },
    { path: '404', element: <PageNotFoundView /> },
  ]
}

const testStateRoutes: RouteObject = {
  path: 'test',
  element: <Layout><TestLayout/></Layout>,
  children: [
    { path: 'immer', element: <Immer /> },
    { path: 'state', element: <State /> },
    { path: 'jotai', element: <Jotai /> },
  ]
}


Routes.push(mainRoutes, testStateRoutes)

export default Routes