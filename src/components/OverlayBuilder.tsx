import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { OverlayDimension } from './OverlayDimension';
import { OverlayPreview } from './OverlayPreview';
import { SketchPicker, ColorResult } from 'react-color';
import { Typography } from '@material-ui/core';

export const OverlayBuilder: React.FunctionComponent<{}> = () => {
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [text, setText] = React.useState('');
    const [textColor, setTextColor] = React.useState('#fff');
    const [overlayColor, setOverlayColor] = React.useState('#000');

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
    
    const handleTextColorChange = (color: ColorResult) => {
        setTextColor(color.hex);
    }

    const handleOverlayColorChange = (color: ColorResult) => {
        setOverlayColor(color.hex);
    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Typography variant='h5'>
                        Size
                    </Typography>
                    <OverlayDimension name='Height' onDimensionSelect={handleDimensionSelect}/>
                    <OverlayDimension name='Width' onDimensionSelect={handleDimensionSelect}/>
                    <SketchPicker 
                        color={overlayColor}
                        onChangeComplete={handleOverlayColorChange}/>
                    <Typography variant='h5'>
                        Text
                    </Typography>
                    <TextField 
                        disabled={width === 0 || height === 0}
                        variant='outlined'
                        onChange={handleTextChange} />
                    <SketchPicker 
                        color={textColor}
                        onChangeComplete={handleTextColorChange}/>
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