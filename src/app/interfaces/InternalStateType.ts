interface LoggedInUserType {
  username: string;
  role: string;
  email?: string;
}

export interface InternalStateType {
  [key: string]: any;
  appName: string;
  darkMode: boolean;
  topNavTitle: string;
  topNavSubTitle: string;
  messagePanelOpen: boolean;
  sideNavOpen: boolean;
  sideNavMode: string;
  sideNavCollapse: boolean;
  pageFullScreen: boolean;
  pageFooter: boolean;
  initial: boolean;
  currentLoginUser: LoggedInUserType;
  titleColor1: string;
  titleColor2: string;
}
