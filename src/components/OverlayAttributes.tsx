import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import { ColorPicker } from './ColorPicker';
import { OverlaySlider } from './OverlaySlider';
import { TextAlignment, TextStyle, TextFormat } from './TextStyle';
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
    format: TextFormat[];
};

export type Overlay = {
    name?: string;
    size: Size;
    position: Position;
    colour: RGBColor;
    text: Text;
};

export type Template = {
    url: string;
    name: string;
    overlays: string;
}

type OverlayAttributesProps = {
    overlay: Overlay;
    onChange(attribute: string, value: string | number | RGBColor | TextAlignment | TextFormat[]): void;
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
        format: [],
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

    const handleValueChange = (attribute: string, value: number) => {
        const prefix: string = attribute.toLowerCase() === 'width' || attribute.toLowerCase() === 'height' ? 'size' : 'position';
        props.onChange(`${prefix}.${attribute.toLowerCase()}`, value);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange('text.content', event.target.value);
    };

    const handleOverlayNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange('name', event.target.value);
    };

    const handleColorChange = (color: RGBColor) => {
        props.onChange('colour', color);
    };

    const handleTextStyleChange = (attribute: string, value: TextAlignment | RGBColor | TextFormat[]) => {
        props.onChange(`text.${attribute}`, value);
    }

    return (
        <React.Fragment>
            <div className={`${classes.element} ${classes.overlayNameContainer}`}>
                {props.showDelete && <IconButton className={classes.deleteItem} aria-label="delete" onClick={props.onDeleteOverlay}>
                    <DeleteIcon />
                </IconButton>}
                <TextField 
                    value={overlay.name}
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
                value={overlay.size.height}
                onValueChange={handleValueChange}/>
            <OverlaySlider 
                className={classes.element}
                type='size' 
                name='Width' 
                min={0}
                max={100}
                value={overlay.size.width}
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
                value={overlay.position.horizontal}
                onValueChange={handleValueChange}/>
            <OverlaySlider 
                className={classes.element}
                type='position' 
                name='Vertical' 
                min={0}
                max={streamHeight}
                value={overlay.position.vertical}
                onValueChange={handleValueChange}/>
            <div>
                <Typography variant='h5' className={classes.headerText}>
                    Colour
                </Typography> 
                <ColorPicker
                    name='Overlay'
                    color={overlay.colour}
                    colorChangeCallback={handleColorChange}>
                </ColorPicker> 
            </div>                       
            <Typography variant='h5' className={classes.headerText}>
                Text
            </Typography>
            <TextField 
                className={classes.element}
                disabled={overlay.size.width === 0 || overlay.size.height === 0}
                variant='outlined'
                value={overlay.text.content}
                onChange={handleTextChange} /> 
            <TextStyle
                className={`${classes.element} ${classes.textStyle}`}
                alignment={overlay.text.alignment}
                color={overlay.text.colour}
                format={overlay.text.format}
                onChange={handleTextStyleChange}/>
        </React.Fragment>
    )
}