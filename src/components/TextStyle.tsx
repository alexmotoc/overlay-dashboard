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
import { white } from './OverlayBuilder';
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
    textAlignmentCallback(alignment: TextAlignment): void;
    textColorCallback(color: RGBColor): void;
    textFormatsCallback(formats: TextFormats[]): void;
};

export const TextStyle: React.FunctionComponent<TextStyleProps> = (props: TextStyleProps) => {
    const [alignment, setAlignment] = React.useState('center');
    const [color, setColor] = React.useState(white);
    const [formats, setFormats] = React.useState(() => ['']);

    const handleAlignmentChange = (event: React.MouseEvent<HTMLElement>, newAlignment: TextAlignment) => {
        setAlignment(newAlignment);
        props.textAlignmentCallback(newAlignment);
    };

    const handleColorChange = (color: RGBColor) => {
        setColor(color);
        props.textColorCallback(color);
    }

    const handleFormatChange = (event: React.MouseEvent<HTMLElement>, newFormats: TextFormats[]) => {
        setFormats(newFormats);
        props.textFormatsCallback(newFormats);
    };

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Paper elevation={0} className={classes.paper}>
                <StyledToggleButtonGroup
                size="small"
                value={alignment}
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
                value={formats}
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
                        color={color}
                        colorChangeCallback={handleColorChange}>
                    </ColorPicker>
                </StyledToggleButtonGroup>
            </Paper>
        </div>
    );
};