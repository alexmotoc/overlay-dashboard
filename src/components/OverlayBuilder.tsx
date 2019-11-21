import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { OverlayDimension } from './OverlayDimension';
import { OverlayPreview } from './OverlayPreview';

export const OverlayBuilder: React.FunctionComponent<{}> = () => {
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [text, setText] = React.useState('');

    const handleDimensionSelect = (dimension: string, value: number) => {
        if (dimension === "Width") {
            setWidth(value);
        } else {
            setHeight(value);
        }
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <React.Fragment>
            <OverlayDimension name="Height" onDimensionSelect={handleDimensionSelect}/>
            <OverlayDimension name="Width" onDimensionSelect={handleDimensionSelect}/>
            <TextField 
                label="Text"
                variant="outlined"
                onChange={handleTextChange} />
            <OverlayPreview 
                width={width} 
                height={height}
                text={text} />
        </React.Fragment>
    );
}