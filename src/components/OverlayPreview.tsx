import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { RGBColor } from 'react-color';
import { streamWidth, streamHeight } from './OverlayBuilder';
import { TextAlignment, TextFormats } from './TextStyle';

export const previewWidth: number = 640;
export const previewHeight: number = 360;

const useStyles = makeStyles({
    preview: {
        display: 'inline-block',
        width: previewWidth,
        height: previewHeight,
        marginTop: 50,
        position: 'relative',
        backgroundColor: grey[300],
        overflow: 'hidden'
    },
    overlay: {
        width: (props: OverlayPreviewProps) => `${props.width}%`,
        height: (props: OverlayPreviewProps) => `${props.height}%`,
        position: 'absolute',
        left: (props: OverlayPreviewProps) => props.horizontal * previewWidth / streamWidth,
        top: (props: OverlayPreviewProps) => props.vertical * previewHeight / streamHeight,
        backgroundColor: (props: OverlayPreviewProps) => 
            `rgba(${props.overlayColor.r}, ${props.overlayColor.g}, ${props.overlayColor.b}, ${props.overlayColor.a})`,
        textAlign: (props: OverlayPreviewProps) => props.textAlignment,
        overflow: 'hidden'
    },
    text: {
        display: 'block',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        color: (props: OverlayPreviewProps) => 
            `rgba(${props.textColor.r}, ${props.textColor.g}, ${props.textColor.b}, ${props.textColor.a})`,
        fontWeight: (props: OverlayPreviewProps) => props.textFormats.includes('bold') ? 'bold' : 'normal',
        fontStyle: (props: OverlayPreviewProps) => props.textFormats.includes('italic') ? 'italic': 'normal',
        textDecoration: (props: OverlayPreviewProps) => props.textFormats.includes('underlined') ? 'underline' : 'none'
    }
});

type OverlayPreviewProps = {
    width: number;
    height: number;
    horizontal: number;
    vertical: number;
    overlayColor: RGBColor;
    text: string;
    textAlignment: TextAlignment;
    textColor: RGBColor;
    textFormats: TextFormats[];
};

export const OverlayPreview: React.FunctionComponent<OverlayPreviewProps> = (props: OverlayPreviewProps) => {
    const classes = useStyles(props);

    return (
        <React.Fragment>
            <Typography variant='h3' align='center'>
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