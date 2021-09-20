import React, { useEffect, useState } from 'react';
import {
    Badge,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Popover,
    Typography
} from '@material-ui/core';
import {
    FiberManualRecord as AlertIcon,
    Notifications as NotificationIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../ducks/Account.ducks';

const NavAlertBellStyles = makeStyles(theme => ({
    popover: {
        pointerEvents: 'none'
    },
    section: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '20rem'
    },
    section2: {
        padding: '5px'
    }
}));

export const NavAlertBell = props => {
    const dispatch = useDispatch();
    const classes = NavAlertBellStyles();
    const account = useSelector(state => state.login.account);
    const notifications = useSelector(state => state.account.notifications);
    const notificationCount = notifications.length;
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (account) {
            dispatch(fetchNotifications(account.id));
        }
    }, [account, dispatch]);

    const showNotifications = event => {
        setOpen(!open);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(!open);
        setAnchorEl(null);
    };

    return (
        <div>
            <span
                ref={anchorEl}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup='true'
                onMouseEnter={showNotifications}
                onMouseLeave={handleClose}
            >
                <IconButton
                    key='notificationBell'
                    color='inherit'
                    href='/updates'
                >
                    <Badge
                        key='notificationCount'
                        badgeContent={notificationCount}
                        color='secondary'
                    >
                        <NotificationIcon />
                    </Badge>
                </IconButton>
            </span>
            <Popover
                id='mouse-over-popover'
                className={classes.popover}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                onClose={handleClose}
                disableRestoreFocus
            >
                <List>
                    {notifications.length ? (
                        notifications.map(n => (
                            <ListItem divider>
                                <Grid item xs={1}>
                                    <AlertIcon color='secondary' />
                                </Grid>
                                <ListItemText
                                    primary={
                                        <Grid container xs>
                                            <Grid item xs={8}>
                                                <Typography>
                                                    <b>{n.title}</b>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography align='right'>
                                                    <b>
                                                        {moment(n.date).format(
                                                            'MM/DD/YYYY'
                                                        )}
                                                    </b>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    }
                                    secondary={
                                        <div className={classes.section}>
                                            <Typography noWrap>
                                                {n.body}
                                            </Typography>
                                        </div>
                                    }
                                ></ListItemText>
                            </ListItem>
                        ))
                    ) : (
                        <div className={classes.section2}>
                            <Typography>No New Announcements</Typography>
                        </div>
                    )}
                </List>
            </Popover>
        </div>
    );
};
