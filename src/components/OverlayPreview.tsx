import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    overlay: {
      width: (props: OverlayPreviewProps) => props.width,
      height: (props: OverlayPreviewProps) => props.height,
      backgroundColor: 'black'
    }
});

type OverlayPreviewProps = {
    width: number;
    height: number;
};

export const OverlayPreview: React.FunctionComponent<OverlayPreviewProps> = (props: OverlayPreviewProps) => {
    const classes = useStyles(props);
    
    return (
        <div className={classes.overlay}>            
        </div>
    );
}