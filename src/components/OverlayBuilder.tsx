import * as React from 'react';
import { OverlayDimension } from './OverlayDimension';
import { OverlayPreview } from './OverlayPreview';

export const OverlayBuilder: React.FunctionComponent<{}> = () => {
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);

    const handleDimensionSelect = (dimension: string, value: number) => {
        if (dimension === "Width") {
            setWidth(value);
        } else {
            setHeight(value);
        }
    };

    return (
        <React.Fragment>
            <OverlayDimension name="Height" onDimensionSelect={handleDimensionSelect}/>
            <OverlayDimension name="Width" onDimensionSelect={handleDimensionSelect}/>
            <OverlayPreview width={width} height={height}/>
        </React.Fragment>
    );
}