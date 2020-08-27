import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as FcIcons from "react-icons/fc";
import * as IoIcons from "react-icons/io";

export const AdminSidebarData = [
        {
          title: 'Home',
          path: '/admindashboard',
          // icon: <AiIcons.AiIFillHome /> ,
          cName: 'nav-text'
        },

        {
         title: 'Dashboard',
         path: '/dashboardDisplay',
         icon: <MdIcons.MdDashboard />,
         cName: 'nav-text'
        },

        {
         title: 'Support',
         path: '/adminSupport',
         icon: <MdIcons.MdSettings />,
         cName: 'nav-text'
        },

        {
         title: 'Setting',
         path: '/adminSetting',
         icon: <FcIcons.FcSupport/>,
         cName: 'nav-text'
        },

        
        
];