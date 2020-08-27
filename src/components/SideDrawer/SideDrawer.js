import React from 'react';
import {Link} from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import {IoIcons} from 'react-icons/io';
import './SideDrawer.css';



export const SideDrawer = [
     {
          title: 'Home',
          path: '/userdashboard',
          icon: <AiIcons.AiFillHome />,
          cName: 'nav-text'
     },

     {
          title: 'Profile',
          path: '/profile',
          icon: <AiIcons.AiFillHome />,
          cName: 'nav-text'
     },

     {
          title: 'Support',
          path: '/support',
          icon: <AiIcons.AiFillHome />,
          cName: 'nav-text'
     },

     {
          title: 'Setting',
          path: '/setting',
          icon: <AiIcons.AiFillHome />,
          cName: 'nav-text'
     },

     {
          title: 'Logout',
          path: '/',
          icon: <AiIcons.AiFillHome />,
          cName: 'nav-text'
     }
]



