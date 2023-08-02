import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: '/app-view-Branches',
        icon: 'fa fa-user-circle',
        label: 'Administration',
    },

    {
        routeLink: '/batchhome/course',
        icon: 'fa fa-building-o',
        label: 'Branches',

    },
    {
      routeLink: '/register',
      icon: 'fa fa-users',
      label: 'Register',
    },
    {
      routeLink: '/authentication',
      icon: 'fa fa-sign-out',
      label: 'Logout'
        },

//     {
//         routeLink: '/batchhome/batch',
//         icon: 'fa fa-users',
//         label: 'Batches'
//     },
//     {
//         routeLink: '/trainers',
//         icon: 'fa fa-id-card-o',
//         label: 'Trainers',
//     },
//     {
//         routeLink: '/trainees',
//         icon: 'fa fa-user-plus',
//         label: 'Trainees'
//     },

];
