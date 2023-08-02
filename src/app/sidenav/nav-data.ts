import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: '/batchhome/course',
    icon: 'fa fa-book',
    label: 'Courses',
  },

  {
    routeLink: '/batchhome/subject',
    icon: 'fa fa-server',
    label: 'Subjects',
  },

  {
    routeLink: '/batchhome/batch',
    icon: 'fa fa-users',
    label: 'Batches',
  },
  {
    routeLink: '/trainers',
    icon: 'fa fa-id-card-o',
    label: 'Trainers',
  },
  {
    routeLink: '/trainees',
    icon: 'fa fa-user-plus',
    label: 'Trainees',
  },
  {
    routeLink: '/displaybranch',
    icon: 'fa fa-user-circle',
    label: 'MyProfile',
  },

  {
    routeLink: '/authentication',
    icon: 'fa fa-sign-out',
    label: 'Logout',
  },
];
