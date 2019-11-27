import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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

export const OverlayBuilder: React.FunctionComponent<{}> = () => {   
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [horizontal, setHorizontal] = React.useState(0);
    const [vertical, setVertical] = React.useState(0);
    const [text, setText] = React.useState('');
    const [textAlignment, setTextAlignment] = React.useState('center' as TextAlignment);
    const [textFormats, setTextFormats] = React.useState(['' as TextFormats]);
    const [textColor, setTextColor] = React.useState(white);
    const [overlayColor, setOverlayColor] = React.useState(black);

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

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Typography variant='h5'>
                        Size
                    </Typography>
                    <OverlaySlider 
                        type='size' 
                        name='Height' 
                        min={0}
                        max={100}
                        onValueChange={handleValueChange}/>
                    <OverlaySlider 
                        type='size' 
                        name='Width' 
                        min={0}
                        max={100}
                        onValueChange={handleValueChange}/>
                    <Typography variant='h5'>
                        Position
                    </Typography> 
                    <OverlaySlider 
                        type='position' 
                        name='Horizontal' 
                        min={0}
                        max={streamWidth}
                        onValueChange={handleValueChange}/>
                    <OverlaySlider 
                        type='position' 
                        name='Vertical' 
                        min={0}
                        max={streamHeight}
                        onValueChange={handleValueChange}/>
                    <ColorPicker
                        name='Overlay'
                        color={overlayColor}
                        colorChangeCallback={setOverlayColor}>
                    </ColorPicker>                        
                    <Typography variant='h5'>
                        Text
                    </Typography>
                    <TextField 
                        disabled={width === 0 || height === 0}
                        variant='outlined'
                        onChange={handleTextChange} /> 
                    <TextStyle
                        textAlignmentCallback={setTextAlignment}
                        textColorCallback={setTextColor}
                        textFormatsCallback={setTextFormats}/>
                </Grid>
                <Grid item xs>
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
        </React.Fragment>
    );
}