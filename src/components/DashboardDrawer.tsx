import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildIcon from '@material-ui/icons/Build';
import { Theme } from '@material-ui/core';
import {createStyles, makeStyles } from '@material-ui/styles';

const drawerWidth: number = 240;

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
            {['Overlay Builder'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon><BuildIcon/></ListItemIcon>
                <ListItemText primary={text} />
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