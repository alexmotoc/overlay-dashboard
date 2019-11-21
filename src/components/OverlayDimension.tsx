import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import HeightIcon from '@material-ui/icons/Height';

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

type OverlayDimensionProps = {
    name: string;
};

export const OverlayDimension: React.FunctionComponent<OverlayDimensionProps> = (props: OverlayDimensionProps) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleSliderChange = (_: React.ChangeEvent<{}>, newValue: number | number[]) => {
        setValue(Number(newValue));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
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
            {props.name} (%)
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    {props.name === 'Height' ? (
                        <HeightIcon />
                    ) : (
                        <HeightIcon className={classes.rotate90} />
                    )
                    }
                </Grid>
                <Grid item xs>
                    <Slider
                        value={value}
                        onChange={handleSliderChange}
                        min={0}
                        max={100}
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
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}