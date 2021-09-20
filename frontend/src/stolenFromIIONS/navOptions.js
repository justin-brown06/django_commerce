import React from 'react';
import {
    HomeOutlined as HomeIcon,
    PersonOutlined as PersonOutlineIcon,
    NoteAddOutlined as NoteAddIcon,
    AssessmentOutlined as AssessmentIcon,
    AccountBalanceOutlined as AccountBalanceIcon,
    Settings as SettingsIcon,
    ExitToApp as ExitToAppIcon,
    CalendarToday as UpdatesIcon
} from '@material-ui/icons';

const externalPhysicianClearance = ['external-physician'];

const externalClearance = [
    ...externalPhysicianClearance,
    'external-office-manager',
    'external-admin-setup'
];

export const mainTabs = [
    {
        id: 'home',
        line1: 'Home',
        icon: <HomeIcon />,
        to: '/home',
        roles: externalClearance
    },
    {
        id: 'updates',
        line1: 'Updates',
        icon: <UpdatesIcon />,
        to: '/updates',
        roles: externalClearance
    },
    {
        key: 'patients',
        line1: 'Patients',
        icon: <PersonOutlineIcon />,
        to: '/placeholder',
        roles: externalClearance
    },
    {
        key: 'insVerification',
        line1: 'Ins. Verification',
        icon: <NoteAddIcon />,
        to: '/iv',
        roles: externalClearance
    },
    {
        key: 'reports',
        line1: 'Reports',
        icon: <AssessmentIcon />,
        to: '/reports',
        roles: externalClearance
    },
    {
        key: 'billing',
        line1: 'Billing',
        icon: <AccountBalanceIcon />,
        to: '/placeholder',
        roles: externalClearance
    }
];

export const secondaryTabs = [
    {
        key: 'settings',
        line1: 'Settings',
        icon: <SettingsIcon />,
        to: '/user',
        roles: externalClearance
    },
    {
        key: 'logout',
        line1: 'Logout',
        icon: <ExitToAppIcon />,
        to: '/user/logout',
        roles: externalClearance
    }
];

export const dropdowns = [];
