import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { ColorPicker } from './ColorPicker';
import { OverlayDimension } from './OverlayDimension';
import { OverlayPreview } from './OverlayPreview';
import { ColorResult } from 'react-color';
import { Typography } from '@material-ui/core';

export const OverlayBuilder: React.FunctionComponent<{}> = () => {
    const white: string = '#fff';
    const black: string = '#000';
    
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [text, setText] = React.useState('');
    const [textColor, setTextColor] = React.useState(white);
    const [overlayColor, setOverlayColor] = React.useState(black);

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

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Typography variant='h5'>
                        Size
                    </Typography>
                    <OverlayDimension name='Height' onDimensionSelect={handleDimensionSelect}/>
                    <OverlayDimension name='Width' onDimensionSelect={handleDimensionSelect}/>
                    <ColorPicker
                        name='Overlay'
                        colorChangeCallback={setOverlayColor}>
                    </ColorPicker>                  
                    <Typography variant='h5'>
                        Text
                    </Typography>
                    <TextField 
                        disabled={width === 0 || height === 0}
                        variant='outlined'
                        onChange={handleTextChange} />
                    <ColorPicker
                        name='Text'
                        colorChangeCallback={setTextColor}>
                    </ColorPicker> 
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