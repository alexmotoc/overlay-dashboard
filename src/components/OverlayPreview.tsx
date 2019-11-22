import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles({
    preview: {
        width: '75%',
        height: '30%',
        backgroundColor: grey[300]
    },
    overlay: {
      width: (props: OverlayPreviewProps) => `${props.width}%`,
      height: (props: OverlayPreviewProps) => `${props.height}%`,
      backgroundColor: (props: OverlayPreviewProps) => props.overlayColor,
      textAlign: 'center',
      overflow: 'hidden'
    },
    text: {
        display: 'block',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        color: (props: OverlayPreviewProps) => props.textColor
    }
});

type OverlayPreviewProps = {
    width: number;
    height: number;
    overlayColor: string;
    text: string;
    textColor: string;
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