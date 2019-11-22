import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { OverlayDimension } from './OverlayDimension';
import { OverlayPreview } from './OverlayPreview';
import { SketchPicker, ColorResult } from 'react-color';
import { Typography } from '@material-ui/core';
import PaletteIcon from '@material-ui/icons/Palette';

export const OverlayBuilder: React.FunctionComponent<{}> = () => {
    const white: string = '#fff';
    const black: string = '#000';
    
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [text, setText] = React.useState('');
    const [textColor, setTextColor] = React.useState(white);
    const [isTextColorOpen, setIsTextColorOpen] = React.useState(false);
    const [overlayColor, setOverlayColor] = React.useState(black);
    const [isOverlayColorOpen, setIsOverlayColorOpen] = React.useState(false);

    const handleDimensionSelect = (dimension: string, value: number) => {
        if (dimension === "Width") {
            setWidth(value);
        } else {
            setHeight(value);
        }
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleTextColorPickerClick = () => {
        setIsTextColorOpen(true);
    };

    const handleCancelTextColor = () => {
        // Hide dialog and reset colour of text to default option
        setIsTextColorOpen(false);
        setTextColor(white);
    };

    const handleConfirmTextColor = () => {
        setIsTextColorOpen(false);
    };
    
    const handleTextColorChange = (color: ColorResult) => {
        setTextColor(color.hex);
    };

    const handleOverlayColorPickerClick = () => {
        setIsOverlayColorOpen(true);
    };

    const handleCancelOverlayColor = () => {
        // Hide dialog and reset colour of overlay to default option
        setIsOverlayColorOpen(false);
        setOverlayColor(black);
    };

    const handleConfirmOverlayColor = () => {
        setIsOverlayColorOpen(false);
    };

    const handleOverlayColorChange = (color: ColorResult) => {
        setOverlayColor(color.hex);
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Typography variant='h5'>
                        Size
                    </Typography>
                    <OverlayDimension name='Height' onDimensionSelect={handleDimensionSelect}/>
                    <OverlayDimension name='Width' onDimensionSelect={handleDimensionSelect}/>
                    <Button
                        onClick={handleOverlayColorPickerClick}>
                        <PaletteIcon color='primary' />
                    </Button>
                    <Dialog
                        open={isOverlayColorOpen} >
                        <DialogTitle>Overlay Colour</DialogTitle>
                        <DialogContent dividers>
                            <SketchPicker 
                                color={overlayColor}
                                onChangeComplete={handleOverlayColorChange}/>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCancelOverlayColor} color="primary">
                            Cancel
                            </Button>
                            <Button onClick={handleConfirmOverlayColor} color="primary">
                            OK
                            </Button>
                        </DialogActions>
                    </Dialog>                   
                    <Typography variant='h5'>
                        Text
                    </Typography>
                    <TextField 
                        disabled={width === 0 || height === 0}
                        variant='outlined'
                        onChange={handleTextChange} />
                    <Button
                        onClick={handleTextColorPickerClick}>
                        <PaletteIcon color='primary' />
                    </Button>
                    <Dialog
                        open={isTextColorOpen} >
                        <DialogTitle>Text Colour</DialogTitle>
                        <DialogContent dividers>
                            <SketchPicker 
                                color={textColor}
                                onChangeComplete={handleTextColorChange}/>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCancelTextColor} color="primary">
                            Cancel
                            </Button>
                            <Button onClick={handleConfirmTextColor} color="primary">
                            OK
                            </Button>
                        </DialogActions>
                    </Dialog>  
                </Grid>
                <Grid item xs>
                    <OverlayPreview 
                        width={width} 
                        height={height}
                        overlayColor={overlayColor}
                        text={text}
                        textColor={textColor} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}