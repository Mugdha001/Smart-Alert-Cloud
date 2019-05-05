// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Billing from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import MapsView from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.jsx";
import cookie from 'react-cookies'


let dashboardRoutes=[];

 dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
    ,role:"admin"

  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
    ,role:"admin"

  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
    ,role:"admin"

  },
  {
    path: "/billing",
    name: "Billing",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Billing,
    layout: "/admin"
    ,role:"admin"

  },
  {
    path: "/mapsView",
    name: "Maps View",
    rtlName: "خرائط",
    icon: LocationOn,
    component: MapsView,
    layout: "/admin"
    ,role:"admin"

  },
  {
    path: "/login",
    name: "Logout",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    // layout: "/",
    funcDeletecookie: function(){
      cookie.remove('cookie', { path: '/' })
    }
    ,role:"admin"

  },
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // }
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "لوحة القيادة",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    }
    ,
    {
      path: "/billing",
      name: "Billing",
      rtlName: "طباعة",
      icon: LibraryBooks,
      component: Billing,
      layout: "/admin"
    },{
      path: "/table",
      name: "Table List",
      rtlName: "قائمة الجدول",
      icon: "content_paste",
      component: TableList,
      layout: "/admin"
    },  {
      path: "/login",
      name: "Logout",
      rtlName: "التطور للاحترافية",
      icon: Unarchive,
      component: UpgradeToPro,
      // layout: "/",
      funcDeletecookie: function(){
        cookie.remove('cookie', { path: '/' })
      }
    }
    
  ];


export default dashboardRoutes;
