import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import HeightIcon from '@material-ui/icons/Height';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
    root: {
      width: 250,
    },
    input: {
      width: 42,
    },
    rotate90: {
        transform: 'rotate(90deg)'
    },
});

type OverlaySliderProps = {
    type: string;
    name: string;
    min: number;
    max: number;
    onValueChange(attribute: string, value: number): void;
};

export const OverlaySlider: React.FunctionComponent<OverlaySliderProps> = (props: OverlaySliderProps) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleSliderChange = (_: React.ChangeEvent<{}>, newValue: number | number[]) => {
        setValue(Number(newValue));
        props.onValueChange(props.name, Number(newValue));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
        props.onValueChange(props.name, Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
          setValue(0);
        } else if (value > 100) {
          setValue(100);
        }
    };

    return (
        <div className={classes.root}>
            <Typography id="input-slider" gutterBottom>
            {props.name} {props.type === 'size' ? '(%)' : '(px)'} 
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    {props.type === 'size' ? (
                        props.name === 'Height' ? (
                            <HeightIcon />
                        ) : (
                            <HeightIcon className={classes.rotate90} />
                        )
                    ) : (
                        <LocationOnIcon />
                    )}
                </Grid>
                <Grid item xs>
                    <Slider
                        value={value}
                        onChange={handleSliderChange}
                        min={props.min}
                        max={props.max}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                        step: 5,
                        min: props.min,
                        max: props.max,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}