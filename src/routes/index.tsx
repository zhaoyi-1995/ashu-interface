import PageNotFoundView from '@/components/common/PageNotFoundView';
import MainLayout from '@/layouts/MainLayout';
import Home from '@pages/Home';
import { RouteObject } from 'react-router-dom';

const Routes: RouteObject[] = [];

const mainRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '*', element: <PageNotFoundView /> },
    { path: '/', element: <Home /> },
    { path: '404', element: <PageNotFoundView /> },
  ]
}

Routes.push(mainRoutes)

export default Routes