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
      link: '/dashboard'
    },
    {
      name: 'categories',
      title: 'Categories',
      faIcon: 'fa-sitemap',
      notifyClass: 'bg-warn label',
      link: '/categories'
    },
    {
      name: 'products',
      title: 'Products',
      faIcon: 'fa-cubes',
      notifyClass: 'bg-warn label',
      link: '/products'
    },
    {
      name: 'customers',
      title: 'Customers',
      faIcon: 'fa-users',
      notifyClass: 'bg-warn label',
      link: '/customers'
    },
    {
      name: 'suppliers',
      title: 'Suppliers',
      faIcon: 'fa-truck',
      notifyClass: 'bg-warn label',
      link: '/suppliers'
    },
    {
      name: 'manage',
      title: 'Manage Stock',
      faIcon: 'fa-plus',
      notifyClass: 'bg-warn label',
      sub: [
        {
          name: 'add_products',
          title: 'Stock Entry'
        }
      ]
    },
  ];
}
