import * as React from 'react';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { ColorPicker } from './ColorPicker';
import { OverlaySlider } from './OverlaySlider';
import { OverlayPreview } from './OverlayPreview';
import { TextStyle, TextFormats } from './TextStyle';
import { RGBColor } from 'react-color';
import { Typography } from '@material-ui/core';
import { TextAlignment } from './TextStyle';

export const streamWidth: number = 1920;
export const streamHeight: number = 1080;

export const white: RGBColor = {r: 255, g: 255, b: 255, a: 1.0};
export const black: RGBColor = {r: 0, g: 0, b: 0, a: 1.0};

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
        marginTop: 15
    }
});

export const OverlayBuilder: React.FunctionComponent<{}> = () => {   
    const classes = useStyles();

    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [horizontal, setHorizontal] = React.useState(0);
    const [vertical, setVertical] = React.useState(0);
    const [text, setText] = React.useState('');
    const [textAlignment, setTextAlignment] = React.useState('center' as TextAlignment);
    const [textFormats, setTextFormats] = React.useState(['' as TextFormats]);
    const [textColor, setTextColor] = React.useState(white);
    const [overlayColor, setOverlayColor] = React.useState(black);
    const [isToastOpen, setIsToastOpen] = React.useState(false);

    const handleValueChange = (attribute: string, value: number) => {
        switch (attribute.toLowerCase()) {
            case 'width':
                setWidth(value);
                break;
            case 'height':
                setHeight(value);
                break;
            case 'horizontal':
                setHorizontal(value);
                break;
            case 'vertical':
                setVertical(value);
                break;
        }
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleSaveOverlay = () => {
        const data = {
            'size': {
                'width': width,
                'height': height
            },
            'position': {
                'horizontal': horizontal,
                'vertical': vertical
            },
            'text': {
                'content': text,
                'alignment': textAlignment,
                'format': textFormats,
                'colour': textColor
            },
            'colour': overlayColor
        }

        axios.post('http://127.0.0.1:8000/overlays/', {'template': JSON.stringify(data)}).then(response => {
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
                        <Typography variant='h5' className={classes.headerText}>
                            Size
                        </Typography>
                        <OverlaySlider 
                            className={classes.element}
                            type='size' 
                            name='Height' 
                            min={0}
                            max={100}
                            onValueChange={handleValueChange}/>
                        <OverlaySlider 
                            className={classes.element}
                            type='size' 
                            name='Width' 
                            min={0}
                            max={100}
                            onValueChange={handleValueChange}/>
                        <Typography variant='h5' className={classes.headerText}>
                            Position
                        </Typography> 
                        <OverlaySlider 
                            className={classes.element}
                            type='position' 
                            name='Horizontal' 
                            min={0}
                            max={streamWidth}
                            onValueChange={handleValueChange}/>
                        <OverlaySlider 
                            className={classes.element}
                            type='position' 
                            name='Vertical' 
                            min={0}
                            max={streamHeight}
                            onValueChange={handleValueChange}/>
                        <div>
                            <Typography variant='h5' className={classes.headerText}>
                                Colour
                            </Typography> 
                            <ColorPicker
                                name='Overlay'
                                color={overlayColor}
                                colorChangeCallback={setOverlayColor}>
                            </ColorPicker> 
                        </div>                       
                        <Typography variant='h5' className={classes.headerText}>
                            Text
                        </Typography>
                        <TextField 
                            className={classes.element}
                            disabled={width === 0 || height === 0}
                            variant='outlined'
                            onChange={handleTextChange} /> 
                        <TextStyle
                            className={`${classes.element} ${classes.textStyle}`}
                            textAlignmentCallback={setTextAlignment}
                            textColorCallback={setTextColor}
                            textFormatsCallback={setTextFormats}/>
                    </div>
                    <Fab className={classes.saveButton} color="primary" variant="extended" onClick={handleSaveOverlay}>
                        <SaveIcon className={classes.extendedIcon}/>
                        Save
                    </Fab>
                </Grid>
                <Grid item xs className={classes.previewArea}>
                    <OverlayPreview 
                        width={width} 
                        height={height}
                        horizontal={horizontal}
                        vertical={vertical}
                        overlayColor={overlayColor}
                        text={text}
                        textAlignment={textAlignment}
                        textColor={textColor}
                        textFormats={textFormats} />
                </Grid>
            </Grid>
            <Snackbar open={isToastOpen} autoHideDuration={1500} onClose={handleCloseToast}>
                <Alert onClose={handleCloseToast} severity="success">
                Overlay was saved successfully!!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}