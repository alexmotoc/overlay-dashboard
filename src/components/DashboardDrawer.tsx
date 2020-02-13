import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import { Theme } from '@material-ui/core';
import {createStyles, makeStyles } from '@material-ui/styles';

const drawerWidth: number = 240;

type Option = {
    name: string;
    link: string;
    icon: JSX.Element;
};

const options: Option[] = [
    {'name': 'Dashboard', 'link': '/dashboard', 'icon': <HomeIcon/>},
    {'name': 'Stream Settings', 'link': '/settings', 'icon': <SettingsIcon/>},
    {'name': 'Overlay Builder', 'link': '/overlay-builder', 'icon': <BuildIcon/>}
];

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
              width: 240,
              flexShrink: 0,
            },        
          },
        drawerPaper: {
            width: drawerWidth,
            backgroundColor: theme.palette.primary.main
        }
    })
);

export const DashboardDrawer: React.FunctionComponent<{}> = () => {
    const classes = useStyles();

    const drawer: React.ReactFragment= (
        <List>
            {options.map((option, _) => (
            <ListItem button component='a' key={option.name} href={option.link}>
                <ListItemIcon>
                    {option.icon}
                </ListItemIcon>
                <ListItemText primary={option.name} />
            </ListItem>
            ))}
        </List>
    );

    return (
        <nav className={classes.drawer}>
            <Drawer
            classes={{
            paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
        >
            {drawer}
        </Drawer>
        </nav>
    );
}