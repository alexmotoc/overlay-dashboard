import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import HeightIcon from '@material-ui/icons/Height';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
    input: {
      width: 50,
    },
    rotate90: {
        transform: 'rotate(90deg)'
    },
});

type OverlaySliderProps = {
    className: string;
    type: string;
    name: string;
    min: number;
    max: number;
    value: number;
    onValueChange(attribute: string, value: number): void;
};

export const OverlaySlider: React.FunctionComponent<OverlaySliderProps> = (props: OverlaySliderProps) => {
    const classes = useStyles();

    const handleSliderChange = (_: React.ChangeEvent<{}>, newValue: number | number[]) => {
        props.onValueChange(props.name, Number(newValue));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onValueChange(props.name, Number(event.target.value));
    };

    const handleBlur = () => {
        if (props.value < 0) {
          props.onValueChange(props.name, 0);
        } else if (props.value > 100) {
          props.onValueChange(props.name, 100);
        }
    };

    return (
        <div className={props.className}>
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
                        value={props.value}
                        onChange={handleSliderChange}
                        min={props.min}
                        max={props.max}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={props.value}
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