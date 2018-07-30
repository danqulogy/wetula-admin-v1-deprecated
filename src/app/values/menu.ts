/**
 * Menu data mock
 */
export class MenuMock {
  static root = [
    {
      name: 'dashboard',
      title: 'Dashboard',
      faIcon: 'fa-tachometer',
      notifyContent: 'new',
      notifyClass: 'bg-warn label',
      link: '/dashboard',
    },
    {
      name: 'farmers',
      title: 'Farmers',
      faIcon: 'fa-users',
      notifyClass: 'bg-warn label',
      link: '/categories',
    },
    {
      name: 'organizations',
      title: 'Organizations',
      faIcon: 'fa-sitemap',
      notifyClass: 'bg-warn label',
      sub: [
        {
          name: 'crop_marketers',
          title: 'Crop Marketers',
          faIcon: 'fa-users',
        },
        {
          name: 'crop_marketers',
          title: 'NGOs',
          faIcon: 'fa-users',
        },
        {
          name: 'crop_marketers',
          title: 'LBCs',
          faIcon: 'fa-users',
        },
      ],
    },
    // {
    //   name: 'customers',
    //   title: 'Customers',
    //   faIcon: 'fa-users',
    //   notifyClass: 'bg-warn label',
    // },
    {
      name: 'suppliers',
      title: 'Reports',
      faIcon: 'fa-truck',
      notifyClass: 'bg-warn label',
      link: '/suppliers',
    },
    {
      name: 'manage',
      title: 'Manage',
      faIcon: 'fa-plus',
      notifyClass: 'bg-warn label',
      sub: [
        {
          name: 'add_products',
          title: 'Users',
        },
      ],
    },
  ]
}
