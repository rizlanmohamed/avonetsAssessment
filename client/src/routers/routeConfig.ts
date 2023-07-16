import {
    Dashboard,
    Expenses,
    PageNotFound
} from "../components/pages"

type Route = {
    path: string;
    component: React.ComponentType;
    name: string;
    permissions: string[];
  };

export const routes: Route[] = [
    {
        path: '/',
        component: Dashboard,
        name: 'Dashboard',
        permissions: ['SuperAdmin', 'Admin', 'SalesMan']
    },
    {
        path: 'expenses',
        component: Expenses,
        name: 'Expenses',
        permissions: ['SuperAdmin', 'Admin', 'SalesMan']
    },
    {
        path: '*',
        component: PageNotFound,
        name: 'PageNotFound',
        permissions: ['SuperAdmin', 'Admin', 'SalesMan']
    }
]