import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { RGBColor } from 'react-color';

const useStyles = makeStyles({
    preview: {
        width: 640,
        height: 360,
        backgroundColor: grey[300]
    },
    overlay: {
      width: (props: OverlayPreviewProps) => `${props.width}%`,
      height: (props: OverlayPreviewProps) => `${props.height}%`,
      backgroundColor: (props: OverlayPreviewProps) => `rgb(${props.overlayColor.r}, ${props.overlayColor.g}, ${props.overlayColor.b})`,
      opacity: (props: OverlayPreviewProps) => props.overlayColor.a,
      textAlign: 'center',
      overflow: 'hidden'
    },
    text: {
        display: 'block',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        color: (props: OverlayPreviewProps) => `rgb(${props.textColor.r}, ${props.textColor.g}, ${props.textColor.b})`,
        opacity: (props: OverlayPreviewProps) => props.textColor.a
    }
});

type OverlayPreviewProps = {
    width: number;
    height: number;
    overlayColor: RGBColor;
    text: string;
    textColor: RGBColor;
};

export const OverlayPreview: React.FunctionComponent<OverlayPreviewProps> = (props: OverlayPreviewProps) => {
    const classes = useStyles(props);

    return (
        <React.Fragment>
            <Typography variant='h3'>
                Overlay Preview
            </Typography>
            <div className={classes.preview}>
                <div className={classes.overlay}> 
                    <span className={classes.text}>{props.text}</span>         
                </div>            
            </div>
        </React.Fragment>
    );
}