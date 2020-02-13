import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import { ColorPicker } from './ColorPicker';
import { OverlaySlider } from './OverlaySlider';
import { TextAlignment, TextStyle, TextFormats } from './TextStyle';
import { Typography } from '@material-ui/core';
import { streamHeight, streamWidth } from './OverlayBuilder';
import red from '@material-ui/core/colors/red';
import { makeStyles } from '@material-ui/core/styles';
import { RGBColor } from 'react-color';

export type Size = {
    width: number;
    height: number;
};

export type Position = {
    horizontal: number;
    vertical: number;
};

export type Text = {
    content: string;
    alignment: TextAlignment;
    colour: RGBColor;
    format: TextFormats[];
};

export type Overlay = {
    name?: string;
    size: Size;
    position: Position;
    colour: RGBColor;
    text: Text;
};

export type Template = {
    name?: string;
    overlays: Overlay[];
}

type OverlayAttributesProps = {
    overlay: Overlay;
    onChange(overlay: Overlay): void;
    onDeleteOverlay(): void;
    showDelete: boolean;
};

export const white: RGBColor = {r: 255, g: 255, b: 255, a: 1.0};
export const black: RGBColor = {r: 0, g: 0, b: 0, a: 1.0};

export const defaultOverlay: Overlay = {
    name: 'Overlay',
    size: {
        width: 0,
        height: 0
    },
    position: {
        horizontal: 0,
        vertical: 0
    },
    colour: black,
    text: {
        content: '',
        alignment: 'center' as TextAlignment,
        format: ['' as TextFormats],
        colour: white
    }
};

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
    }
});

export const OverlayAttributes: React.FunctionComponent<OverlayAttributesProps> = (props: OverlayAttributesProps) => { 
    const classes = useStyles();
    const overlay: Overlay = props.overlay;

    const [overlayName, setOverlayName] = React.useState(overlay.name);
    const [width, setWidth] = React.useState(overlay.size.width);
    const [height, setHeight] = React.useState(overlay.size.height);
    const [horizontal, setHorizontal] = React.useState(overlay.position.horizontal);
    const [vertical, setVertical] = React.useState(overlay.position.vertical);
    const [text, setText] = React.useState(overlay.text.content);
    const [textAlignment, setTextAlignment] = React.useState(overlay.text.alignment);
    const [textFormats, setTextFormats] = React.useState(overlay.text.format);
    const [textColor, setTextColor] = React.useState(overlay.text.colour);
    const [overlayColor, setOverlayColor] = React.useState(overlay.colour);

    const getCurrentOverlay = () => {
        return {
            name: overlayName,
            size: {
                width: width,
                height: height
            },
            position: {
                horizontal: horizontal,
                vertical: vertical
            },
            colour: overlayColor,
            text: {
                content: text,
                alignment: textAlignment,
                format: textFormats,
                colour: textColor
            }
        };
    };

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
        props.onChange(getCurrentOverlay());
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
        const currentOverlay: Overlay = getCurrentOverlay();
        currentOverlay.text.content = event.target.value;
        props.onChange(currentOverlay);
    };

    const handleOverlayNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOverlayName(event.target.value);
        const currentOverlay: Overlay = getCurrentOverlay();
        currentOverlay.name = event.target.value;
        props.onChange(currentOverlay);
    };

    const handleColorChange = (color: RGBColor) => {
        setOverlayColor(color);
        const currentOverlay: Overlay = getCurrentOverlay();
        currentOverlay.colour = color;
        props.onChange(currentOverlay);
    };

    const handleTextAlignmentChange = (newAlignment: TextAlignment) => {
        setTextAlignment(newAlignment);
        const currentOverlay: Overlay = getCurrentOverlay();
        currentOverlay.text.alignment = newAlignment;
        props.onChange(currentOverlay);
    };

    const handleTextColorChange = (color: RGBColor) => {
        setTextColor(color);
        const currentOverlay: Overlay = getCurrentOverlay();
        currentOverlay.text.colour = color;
        props.onChange(currentOverlay);
    };

    const handleTextFormatsChange = (newFormats: TextFormats[]) => {
        setTextFormats(newFormats);
        const currentOverlay: Overlay = getCurrentOverlay();
        currentOverlay.text.format = newFormats;
        props.onChange(currentOverlay);
    };

    return (
        <React.Fragment>
            <div className={`${classes.element} ${classes.overlayNameContainer}`}>
                {props.showDelete && <IconButton className={classes.deleteItem} aria-label="delete" onClick={props.onDeleteOverlay}>
                    <DeleteIcon />
                </IconButton>}
                <TextField 
                    value={overlayName}
                    InputProps={{
                        disableUnderline: true,
                        classes: {
                        input: classes.overlayName,
                        },
                    }}
                    onChange={handleOverlayNameChange}/>
            </div>
            <Typography variant='h5' className={classes.headerText}>
                Size
            </Typography>
            <OverlaySlider 
                className={classes.element}
                type='size' 
                name='Height' 
                min={0}
                max={100}
                value={height}
                onValueChange={handleValueChange}/>
            <OverlaySlider 
                className={classes.element}
                type='size' 
                name='Width' 
                min={0}
                max={100}
                value={width}
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
                value={horizontal}
                onValueChange={handleValueChange}/>
            <OverlaySlider 
                className={classes.element}
                type='position' 
                name='Vertical' 
                min={0}
                max={streamHeight}
                value={vertical}
                onValueChange={handleValueChange}/>
            <div>
                <Typography variant='h5' className={classes.headerText}>
                    Colour
                </Typography> 
                <ColorPicker
                    name='Overlay'
                    color={overlayColor}
                    colorChangeCallback={handleColorChange}>
                </ColorPicker> 
            </div>                       
            <Typography variant='h5' className={classes.headerText}>
                Text
            </Typography>
            <TextField 
                className={classes.element}
                disabled={width === 0 || height === 0}
                variant='outlined'
                value={text}
                onChange={handleTextChange} /> 
            <TextStyle
                className={`${classes.element} ${classes.textStyle}`}
                textAlignmentCallback={handleTextAlignmentChange}
                textColorCallback={handleTextColorChange}
                textFormatsCallback={handleTextFormatsChange}/>
        </React.Fragment>
    )
}