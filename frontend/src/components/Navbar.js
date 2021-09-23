import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Badge,
    CssBaseline,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@material-ui/core';
import {
    Person as PersonIcon,
    ShoppingCart as ShoppingCartIcon
} from '@material-ui/icons';
import { CustomLink } from '../components';
import { Logout } from '../actions/userActions';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        color: '#5BCA81',
        backgroundColor: '#30323B'
    },
    hide: {
        display: 'none'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 2),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        color: '#5BCA81'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    grow: {
        flexGrow: 1
    }
}));

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5'
    }
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
        {...props}
    />
));

export const Navbar = props => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { userInfo } = useSelector(state => state.user);
    const { cartItems } = useSelector(state => state.cart);
    const [anchorEl, setAnchorEl] = useState(null);
    const cartCount = cartItems
        .map(x => x.quantity)
        .reduce((acc, cv) => acc + cv, 0);

    const logoutHandler = () => {
        dispatch(Logout());
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar>
                    <CustomLink to='/'>Homepage</CustomLink>
                    <div className={classes.grow} />
                    <CustomLink to='/cart'>
                        <IconButton key='shoppingCart' color='inherit'>
                            <Badge
                                key='shoppingCartCount'
                                badgeContent={cartCount}
                                style={{ color: '#5BCA81' }}
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </CustomLink>
                    {userInfo ? (
                        <div>
                            <IconButton
                                aria-controls='customized-menu'
                                aria-haspopup='true'
                                variant='contained'
                                onClick={e => setAnchorEl(e.currentTarget)}
                            >
                                <PersonIcon style={{ color: '#5BCA81' }} />
                                <Typography
                                    style={{ color: '#5BCA81' }}
                                    variant='body1'
                                >
                                    Hello, {userInfo.first_name}
                                </Typography>
                            </IconButton>
                            <StyledMenu
                                id='customized-menu'
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={() => setAnchorEl(null)}>
                                    <CustomLink
                                        to='/profile'
                                        color='#30323B'
                                        size='body1'
                                    >
                                        Profile
                                    </CustomLink>
                                </MenuItem>
                                <MenuItem
                                    style={{ color: '#30323B' }}
                                    onClick={() => {
                                        setAnchorEl(null);
                                        logoutHandler();
                                    }}
                                >
                                    <CustomLink
                                        to='/'
                                        color='#30323B'
                                        size='body1'
                                    >
                                        Logout
                                    </CustomLink>
                                </MenuItem>
                            </StyledMenu>
                        </div>
                    ) : (
                        <CustomLink to='/login' size='body1'>
                            <IconButton key='loginPerson' color='inherit'>
                                <PersonIcon />
                                <Typography
                                    style={{ color: '#5BCA81' }}
                                    variant='body1'
                                >
                                    Log In
                                </Typography>
                            </IconButton>
                        </CustomLink>
                    )}
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.drawerHeader} />
                {props.main}
            </main>
        </div>
    );
};
