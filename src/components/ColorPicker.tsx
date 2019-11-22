import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PaletteIcon from '@material-ui/icons/Palette';
import { SketchPicker, ColorResult } from 'react-color';

type ColorPickerProps = {
    name: string;
    colorChangeCallback(color: string): void;
};

export const ColorPicker: React.FunctionComponent<ColorPickerProps> = (props: ColorPickerProps) => {
    const [color, setColor] = React.useState('');
    const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false);

    const handleColorPickerClick = () => {
        setIsColorPickerOpen(true);
    };
    
    const handleCancel = () => {
        setIsColorPickerOpen(false);
    };

    const handleConfirmColor = () => {
        setIsColorPickerOpen(false);
        props.colorChangeCallback(color);
    };

    const handleColorChange = (color: ColorResult) => {
        setColor(color.hex);
        props.colorChangeCallback(color.hex);
    };

    return (
        <React.Fragment>
            <Button
                onClick={handleColorPickerClick}>
                <PaletteIcon color='primary' />
            </Button>
            <Dialog
                open={isColorPickerOpen} >
                <DialogTitle>{props.name} Colour</DialogTitle>
                <DialogContent dividers>
                    <SketchPicker 
                        color={color}
                        onChangeComplete={handleColorChange}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={handleConfirmColor} color="primary">
                    OK
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    );
};
