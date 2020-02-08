import * as React from 'react';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import { makeStyles } from '@material-ui/core/styles';
import { OverlayPreview } from './OverlayPreview';
import { defaultOverlay, Overlay, OverlayAttributes } from './OverlayAttributes';
import { previewWidth, previewHeight } from './OverlayPreview';

export const streamWidth: number = 1920;
export const streamHeight: number = 1080;

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
const useStyles = makeStyles({
    form: {
        marginLeft: 50
    },
    formDisplay: {
        display: 'flex',
        flexDirection: 'column'
    },
    previewArea: {
        textAlign: 'center',
        marginRight: 50
    },
    headerText: {
        marginTop: 25,
        fontWeight: 'bold'
    },
    element: {
        marginTop: 15,
        width: '80%'
    },
    textStyle: {
        display: 'flex'
    },
    extendedIcon: {
        marginRight: 10,
    },
    saveButton: {
        marginLeft: 20
    },
    saveContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 15
    },
    overlayName: {
        fontSize: '3em'
    },
    overlayTabs: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: 500
    },
    overlayNameContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    deleteItem: {
        marginRight: 10,
        color: red[500]
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
});

export const OverlayBuilder: React.FunctionComponent<{}> = () => {   
    const classes = useStyles();

    const [isToastOpen, setIsToastOpen] = React.useState<boolean>(false);
    const [overlays, setOverlays] = React.useState<Overlay[]>([defaultOverlay]);
    const [index, setIndex] = React.useState<number>(0);
    const [templateName, setTemplateName] = React.useState<string>('');

    const handleIndexChange = (_: React.ChangeEvent<{}>, newIndex: number) => {
        setIndex(newIndex);
    };

    const handleAddOverlay = () => {
        let newOverlay: Overlay = {...defaultOverlay};
        newOverlay.name = 'Overlay' + overlays.length;
        setOverlays(overlays.concat(newOverlay));
    };

    const handleDeleteOverlay = () => {
        setOverlays(overlays.slice(0, index).concat(overlays.slice(index + 1)));
        setIndex(0);
    };

    const handleOverlayAttributeChange = (overlay: Overlay) => {
        overlays[index] = overlay;
        setOverlays([...overlays]);
    };

    const handleTemplateNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTemplateName(event.target.value);
    };

    const handleSaveOverlay = () => {
        axios.post('http://127.0.0.1:8000/overlays/', {'name': templateName, 'template': JSON.stringify(overlays)}).then(response => {
            setIsToastOpen(true);
        });
    }

    const handleCloseToast = () => {
        setIsToastOpen(false);
    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs className={classes.form}>
                    <div className={classes.formDisplay}>
                        <div className={classes.overlayTabs}>
                            <Tabs
                                value={index}
                                onChange={handleIndexChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="off"
                                >
                                {overlays.map((overlay, idx) => (
                                    <Tab label={overlay.name} />
                                ))}
                            </Tabs>
                            <IconButton aria-label="add" color="primary" onClick={handleAddOverlay}>
                                <AddIcon />
                            </IconButton>
                        </div>
                    </div>
                    {overlays.map((overlay, idx) => (
                        idx === index &&
                        <OverlayAttributes
                            overlay={overlay}
                            onChange={handleOverlayAttributeChange}
                            onDeleteOverlay={handleDeleteOverlay}
                            showDelete={overlays.length > 1}
                        />
                    ))}
                    <div className={classes.saveContainer}>
                        <TextField onChange={handleTemplateNameChange} value={templateName} label="Template Name" variant="outlined"/>
                        <Fab className={classes.saveButton} color="primary" variant="extended" onClick={handleSaveOverlay}>
                            <SaveIcon className={classes.extendedIcon}/>
                            Save
                        </Fab>
                    </div>                
                </Grid>
                <Grid item xs className={classes.previewArea}>
                    <Typography variant='h3' align='center'>
                        Template Preview
                    </Typography>
                    <div className={classes.preview}>
                        {overlays.map((overlay, idx) => (
                            <OverlayPreview {...overlay} />
                        ))}
                    </div>
                </Grid>
            </Grid>
            <Snackbar open={isToastOpen} autoHideDuration={1500} onClose={handleCloseToast}>
                <Alert onClose={handleCloseToast} severity="success">
                Overlay was saved successfully!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}