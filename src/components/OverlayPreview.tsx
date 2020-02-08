import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { streamWidth, streamHeight } from './OverlayBuilder';
import { Overlay } from './OverlayAttributes';

export const previewWidth: number = 640;
export const previewHeight: number = 360;

const useStyles = makeStyles({
    overlay: {
        width: (props: OverlayPreviewProps) => `${props.size.width}%`,
        height: (props: OverlayPreviewProps) => `${props.size.height}%`,
        position: 'absolute',
        left: (props: OverlayPreviewProps) => props.position.horizontal * previewWidth / streamWidth,
        top: (props: OverlayPreviewProps) => props.position.vertical * previewHeight / streamHeight,
        backgroundColor: (props: OverlayPreviewProps) => 
            `rgba(${props.colour.r}, ${props.colour.g}, ${props.colour.b}, ${props.colour.a})`,
        textAlign: (props: OverlayPreviewProps) => props.text.alignment,
        overflow: 'hidden'
    },
    text: {
        display: 'block',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        color: (props: OverlayPreviewProps) => 
            `rgba(${props.text.colour.r}, ${props.text.colour.g}, ${props.text.colour.b}, ${props.text.colour.a})`,
        fontWeight: (props: OverlayPreviewProps) => props.text.format.includes('bold') ? 'bold' : 'normal',
        fontStyle: (props: OverlayPreviewProps) => props.text.format.includes('italic') ? 'italic': 'normal',
        textDecoration: (props: OverlayPreviewProps) => props.text.format.includes('underlined') ? 'underline' : 'none'
    }
});

type OverlayPreviewProps = Overlay;

export const OverlayPreview: React.FunctionComponent<OverlayPreviewProps> = (props: OverlayPreviewProps) => {
    const classes = useStyles(props);

    return (
        <div className={classes.overlay}> 
            <span className={classes.text}>{props.text.content}</span>         
        </div>            
    );
}