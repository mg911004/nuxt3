export interface MenuItem {
  path: string;
  label: string;
  componentName: string;
  iconClass?: string;
}

export const APP_MENU: MenuItem[] = [
  {
    path: '/',
    label: 'Dashboard',
    componentName: 'DashboardIndex',
    iconClass: 'admin-sidebar__ico--dash',
  },
  {
    path: '/example/ui-kit',
    label: 'ui component kit',
    componentName: 'ExampleUiKit',
    iconClass: 'admin-sidebar__ico--dash',
  },
  {
    path: '/defect',
    label: '관리',
    componentName: 'DefectIndex',
    iconClass: 'admin-sidebar__ico--overlay',
  },
  {
    path: '/site/overview',
    label: '개요',
    componentName: 'SiteOverview',
    iconClass: 'admin-sidebar__ico--overlay',
  },
];

/**
 * 경로와 정확히 일치하는 sidebar 메뉴 반환
 */
export const findMenuByPath = (path: string): MenuItem | undefined => {
  return APP_MENU.find((m) => m.path === path);
};
