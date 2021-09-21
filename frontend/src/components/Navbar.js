import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Badge,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar
} from '@material-ui/core';
import {
    ChevronLeft as ChevronLeftIcon,
    ShoppingCart as ShoppingCartIcon,
    Menu as MenuIcon,
    MoveToInbox as InboxIcon,
    Mail as MailIcon
} from '@material-ui/icons';
import { CustomLink } from '../components';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        color: '#30323B',
        backgroundColor: '#5BCA81'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        color: '#30323B',
        border: 'none'
    },
    drawerPaper: {
        width: drawerWidth,
        color: '#30323B',
        backgroundColor: '#5BCA81'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 2),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        color: '#30323B'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    },
    grow: {
        flexGrow: 1
    }
}));

export const Navbar = props => {
    const classes = useStyles();
    const { cartItems } = useSelector(state => state.cart);
    const cartCount = cartItems
        .map(x => x.quantity)
        .reduce((acc, cv) => acc + cv, 0);
    const [open, setOpen] = useState(false);

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
                        style={{ color: '#30323B' }}
                        aria-label='open drawer'
                        onClick={() => setOpen(!open)}
                        edge='start'
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <CustomLink to='/'>Homepage</CustomLink>
                    <div className={classes.grow} />
                    <CustomLink to='/cart'>
                        <IconButton key='shoppingCart' color='inherit'>
                            <Badge
                                key='shoppingCartCount'
                                badgeContent={cartCount}
                                color='secondary'
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </CustomLink>
                </Toolbar>
            </AppBar>
            <Drawer
                key='mainNavMenu'
                variant='persistent'
                className={classes.drawer}
                anchor='left'
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton
                        style={{ color: '#30323B' }}
                        onClick={() => setOpen(!open)}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                        (text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon style={{ color: '#30323B' }}>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    )}
                </List>
                <div className={classes.grow} />
                <div style={{ marginBottom: '10rem' }}>
                    <List>
                        {['Subscriptions', 'Logout'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon style={{ color: '#30323B' }}>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                <div className={classes.drawerHeader} />
                {props.main}
            </main>
        </div>
    );
};
