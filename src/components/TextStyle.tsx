import * as React from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { ColorPicker } from './ColorPicker';
import { RGBColor } from 'react-color';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        display: 'inline-block'
    },
    paper: {
        display: 'flex',
        border: `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
    },
    divider: {
        alignSelf: 'stretch',
        height: 'auto',
        margin: theme.spacing(1, 0.5),
    },
  }),
);

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export type TextAlignment = 'left' | 'center' | 'right';
export type TextFormats = 'bold' | 'italic' | 'underlined';

type TextStyleProps = {
    className: string;
    alignment: TextAlignment;
    color: RGBColor;
    format: TextFormats[];
    onChange(attribute: string, value: TextAlignment | RGBColor | TextFormats[]): void;
};

export const TextStyle: React.FunctionComponent<TextStyleProps> = (props: TextStyleProps) => {
    const classes = useStyles();

    const handleAlignmentChange = (event: React.MouseEvent<HTMLElement>, newAlignment: TextAlignment) => {
        props.onChange('alignment', newAlignment);
    };

    const handleColorChange = (color: RGBColor) => {
        props.onChange('colour', color);
    }

    const handleFormatChange = (event: React.MouseEvent<HTMLElement>, newFormats: TextFormats[]) => {
        props.onChange('format', newFormats);
    };

    return (
        <div className={`${classes.container} ${props.className}`}>
            <Paper elevation={0} className={classes.paper}>
                <StyledToggleButtonGroup
                size="small"
                value={props.alignment}
                exclusive
                onChange={handleAlignmentChange}
                aria-label="text alignment"
                >
                    <ToggleButton value="left" aria-label="left aligned">
                        <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                        <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                        <FormatAlignRightIcon />
                    </ToggleButton>                
                </StyledToggleButtonGroup>
                <Divider orientation="vertical" className={classes.divider} />
                <StyledToggleButtonGroup
                size="small"
                value={props.format}
                onChange={handleFormatChange}
                arial-label="text formatting"
                >
                    <ToggleButton value="bold" aria-label="bold">
                        <FormatBoldIcon />
                    </ToggleButton>
                    <ToggleButton value="italic" aria-label="italic">
                        <FormatItalicIcon />
                    </ToggleButton>
                    <ToggleButton value="underlined" aria-label="underlined">
                        <FormatUnderlinedIcon />
                    </ToggleButton>
                    <ColorPicker
                        name='Text'
                        color={props.color}
                        colorChangeCallback={handleColorChange}>
                    </ColorPicker>
                </StyledToggleButtonGroup>
            </Paper>
        </div>
    );
};