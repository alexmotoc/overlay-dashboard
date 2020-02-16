import * as React from 'react';
import * as _ from "lodash";
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import Switch from '@material-ui/core/Switch';
import { Alert } from './OverlayBuilder';
import { Template, Overlay } from './OverlayAttributes';
import { OverlayPreview } from './OverlayPreview';
import { makeStyles } from '@material-ui/core/styles';
import { previewWidth, previewHeight } from './OverlayPreview';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

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
        marginTop: 50,
        marginLeft: 50
    },
    saveContainer: {
        display: 'flex',
        marginTop: 25,
        justifyContent: 'center'
    },
    saveIcon: {
        marginRight: 10
    },
    deleteButton: {
        marginLeft: 15,
        color: red[500]
    }
});

export const Settings: React.FunctionComponent<{}> = () => {
    const classes = useStyles();

    const [templateChecked, setTemplateChecked] = React.useState<number[]>([]);
    const [templates, setTemplates] = React.useState<Template[]>([]);
    const [activeTemplates, setActiveTemplates] = React.useState<Template[]>([]);
    const [isToastOpen, setIsToastOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        const loadTemplates = async () => {
            const result = await axios(
                'http://127.0.0.1:8000/overlays/',
            );
            console.log(result.data);
            setTemplates(result.data);
        };
        
        loadTemplates();
    }, []);

    const handleTemplateToggle = (value: number) => () => {
      const currentIndex = templateChecked.indexOf(value);
      const newChecked = [...templateChecked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      const active: Template[] = templates.filter((_, idx) => newChecked.includes(idx));
      setActiveTemplates(active);
      setTemplateChecked(newChecked);
    };

    const handleTemplateDelete = (index: number) => {
        const template: Template = templates[index];
        setTemplates(templates.slice(0, index).concat(templates.slice(index + 1)));
        setActiveTemplates(activeTemplates.filter(el => !_.isEqual(el, template)));

        axios.delete(template.url).then(response => {
            setIsToastOpen(true);
        });
    };

    const handleCloseToast = () => {
        setIsToastOpen(false);
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs className={classes.leftGrid}>
                    <Typography variant='h3' align='center'>
                        Stream Preview
                    </Typography>
                    <div className={classes.preview}>
                        {activeTemplates.map((template, _) => {
                            const overlays: Overlay[] = JSON.parse(template.overlays);

                            return (overlays.map((overlay, idx) => (
                                <OverlayPreview key={idx} {...overlay} />
                            )));
                        })}
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
                    <div className={classes.saveContainer}>
                        <Fab color="primary" variant="extended">
                            <SaveIcon className={classes.saveIcon}/>
                            Save
                        </Fab>
                    </div>             
                </Grid>
                <Grid item xs className={classes.rightGrid}>
                    <Typography variant='h3' align='center'>
                        Templates
                    </Typography>
                    <List className={classes.templateList}>
                        {templates.map((template, idx) => {
                            const labelId: string = `checkbox-template-label-${idx}`;
                            const splitUrl: string[] = template.url.split('/');
                            const templateId: string = splitUrl[splitUrl.length - 2];

                            return (
                                <ListItem key={idx} button onClick={handleTemplateToggle(idx)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={templateChecked.indexOf(idx) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={template.name}/>
                                    <ListItemSecondaryAction>
                                        <IconButton href={`/overlay-builder?id=${templateId}`} edge="end" aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton className={classes.deleteButton} edge="end" aria-label="delete" onClick={() => handleTemplateDelete(idx)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                    <div className={classes.saveContainer}>
                        <IconButton href="/overlay-builder" color="primary" aria-label="add">
                            <AddIcon />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <Snackbar open={isToastOpen} autoHideDuration={1500} onClose={handleCloseToast}>
                <Alert onClose={handleCloseToast} severity="success">
                Template was deleted successfully!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}