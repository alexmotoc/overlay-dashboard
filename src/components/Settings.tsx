import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { previewWidth, previewHeight } from './OverlayPreview';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles({
    optionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionToggle: {
        marginLeft: 15
    },
    leftGrid: {
        marginLeft: 50
    },
    rightGrid: {
        marginRight: 50
    },
    effectsContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 50
    },
    preview: {
        display: 'inline-block',
        width: previewWidth,
        height: previewHeight,
        marginTop: 50,
        position: 'relative',
        backgroundColor: grey[300],
        overflow: 'hidden'
    },
    templateList: {
        marginTop: 50
    }
});

export const Settings: React.FunctionComponent<{}> = () => {
    const classes = useStyles();
    const [templateChecked, setTemplateChecked] = React.useState([0]);

    const handleTemplateToggle = (value: number) => () => {
      const currentIndex = templateChecked.indexOf(value);
      const newChecked = [...templateChecked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setTemplateChecked(newChecked);
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs className={classes.leftGrid}>
                    <Typography variant='h3' align='center'>
                        Stream Preview
                    </Typography>
                    <div className={classes.preview}>
                        {/* {overlays.map((overlay, idx) => (
                            <OverlayPreview key={idx} {...overlay} />
                        ))} */}
                    </div>
                    <div className={classes.effectsContainer}>
                        <Typography variant='h5'>
                            Effects and Enhancements
                        </Typography>
                        <div className={classes.optionContainer}>
                            <Typography>Contrast Adjustment</Typography>
                            <Switch className={classes.optionToggle}/>
                        </div>
                    </div>               
                </Grid>
                <Grid item xs className={classes.rightGrid}>
                    <Typography variant='h3' align='center'>
                        Templates
                    </Typography>
                    <List className={classes.templateList}>
                        {[1, 2, 3].map(value => {
                            const labelId: string = `checkbox-template-label-${value}`;

                            return (
                                <ListItem key={value} button onClick={handleTemplateToggle(value)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={templateChecked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={`Template ${value}`}/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}