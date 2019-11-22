import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    overlay: {
      width: (props: OverlayPreviewProps) => props.width,
      height: (props: OverlayPreviewProps) => props.height,
      backgroundColor: 'black',
      textAlign: 'center'
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
    text: string;
    textColor: string;
};

export const OverlayPreview: React.FunctionComponent<OverlayPreviewProps> = (props: OverlayPreviewProps) => {
    const classes = useStyles(props);
    
    return (
        <div className={classes.overlay}> 
            <span className={classes.text}>{props.text}</span>         
        </div>
    );
}