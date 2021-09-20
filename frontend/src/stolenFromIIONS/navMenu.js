import React, { useMemo, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip
} from '@material-ui/core';
import { mainTabs, secondaryTabs } from './NavOptions';

function ListItemLink(props) {
    const { icon, to, menuState, line1 } = props;

    const CustomLink = useMemo(
        () =>
            forwardRef((linkProps, ref) => (
                <Link ref={ref} to={to} {...linkProps} />
            )),
        [to]
    );

    return (
        <ListItem button component={CustomLink}>
            <Tooltip
                disableFocusListener={menuState}
                disableHoverListener={menuState}
                disableTouchListener={menuState}
                title={line1}
                placement='right-start'
            >
                <ListItemIcon style={{ color: 'white' }}>{icon}</ListItemIcon>
            </Tooltip>
            <ListItemText primary={line1} />
        </ListItem>
    );
}

const createMenu = (tabArray, roles, menuState, key) => {
    // return [];
    // if (!Array.isArray(roles)) {
    // 	return [];
    // }

    return (
        <List>
            {tabArray
                // .filter(t => t.roles.some(role => roles.includes(role)))
                .map((t, index) => (
                    <ListItemLink
                        key={`nav${index}-${t.line1}`}
                        menuState={menuState}
                        {...t}
                    />
                ))}
        </List>
    );
};

export const mainMenu = (roles, menuState) =>
    createMenu(mainTabs, roles, menuState, 'main');

export const secondaryMenu = (roles, menuState) =>
    createMenu(secondaryTabs, roles, menuState, 'secondary');
