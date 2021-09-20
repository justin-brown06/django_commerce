import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { get } from 'lodash';
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@material-ui/core';
import {
    ChevronLeft as ChevronLeftIcon,
    Menu as MenuIcon,
    MoreVert as MoreVertIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { mainMenu, secondaryMenu } from './NavMenu';
import { SearchIions } from '../Util/SearchIions.component';
import { setAccount } from '../../Login/Login.ducks';
import { NavAlertBell } from './NavAlertBell';
import { Copyright } from '../Util';

const DRAWER_WIDTH = 240;

const NavStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#F8F8FB'
    },
    appBar: {
        backgroundColor: '#F4F6FB',
        color: '#0C2556',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: theme.spacing(0, 1)
        // necessary for content to be below app bar
        // ...theme.mixins.toolbar
    },
    main: {
        flexGrow: 1,
        marginTop: 56,
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            marginTop: 48
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: 64
        }
        // padding: theme.spacing(3)
    },
    grow: {
        flexGrow: 1
    }
}));

export const Navigation = props => {
    const dispatch = useDispatch();
    const classes = NavStyles();
    const user = useSelector(state => state.login.user);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const accounts = useSelector(state =>
        state.login.user ? state.login.user.accounts : null
    );
    const account = useSelector(state => state.login.account);

    const [accountAnchorEl, setaccountAnchorEl] = useState(null);
    const [open, setOpen] = useState(true);

    const setNewAccount = id => {
        const account = accounts.find(account => account.id === id);
        if (!account) {
            return window.alert('Error setting account. Please try again.');
        }
        dispatch(setAccount(account));
        setaccountAnchorEl(null);
    };

    if (!isLoggedIn) {
        return props.children;
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar>
                    <IconButton
                        key='menuSwitch'
                        color='inherit'
                        aria-label='open drawer'
                        onClick={() => setOpen(!open)}
                        edge='start'
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        key='userNameTitle'
                        variant='h6'
                        noWrap
                        className={classes.title}
                    >
                        Hello, {user.firstName}
                    </Typography>
                    <NavAlertBell />
                    <div className={classes.grow} />
                    <SearchIions />
                    <div className={classes.grow} />
                    <IconButton
                        key='accountSwitch'
                        aria-label='more'
                        aria-controls='long-menu'
                        aria-haspopup='true'
                        onClick={event =>
                            setaccountAnchorEl(event.currentTarget)
                        }
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Typography
                        key='accountName'
                        variant='h6'
                        noWrap
                        className={classes.title}
                    >
                        Dashboard for{' '}
                        {get(account, 'accountName', 'Select Account')}
                    </Typography>
                    <Menu
                        id='accounts-menu'
                        anchorEl={accountAnchorEl}
                        keepMounted
                        open={Boolean(accountAnchorEl)}
                        onClose={() => setaccountAnchorEl(null)}
                    >
                        {accounts.map(account => (
                            <MenuItem
                                key={`account-select-${account.accountName}`}
                                onClick={() => setNewAccount(account.id)}
                            >
                                {account.accountName}
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                key='mainNavMenu'
                variant='permanent'
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
                PaperProps={{
                    style: { backgroundColor: '#0C2556', color: 'white' }
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton key='menuClose' onClick={() => setOpen(!open)}>
                        <ChevronLeftIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
                <Divider />
                {mainMenu(['external-office-manager'], open)}
                <div className={classes.grow} />
                <div style={{ marginBottom: '10rem' }}>
                    {secondaryMenu(['external-office-manager'], open)}
                </div>
            </Drawer>
            <main className={classes.main}>
                <div className={classes.content}>{props.children}</div>
                <Box pt={4}>
                    <Copyright />
                </Box>
            </main>
        </div>
    );
};
