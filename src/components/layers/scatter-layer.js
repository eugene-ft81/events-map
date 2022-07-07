import { ScatterplotLayer } from 'deck.gl';

import GL from '@luma.gl/constants';

const RADIUS = 3;
const COLORS = {
    red: [255, 99, 71],
    yellow: [255, 191, 0],
    green: [0, 255, 0],    
    black: [0,0,255],
    grey: [220,220,220]
};
const getFillColor = item => {
    if(item.properties.tag.topic[0] === 'disaster') return COLORS.green;
    if(item.properties.tag.topic[0] === 'refugee') return COLORS.red;
    if(item.properties.tag.topic[0] === 'conflict') return COLORS.yellow;
    return COLORS.grey;
};
const getPosition = item => [
    item.geometry?.coordinates[0], 
    item.geometry?.coordinates[1]
];
export default function scatterplotLayer(data) {
    return new ScatterplotLayer({
        id:'scatterplot',
        parameters: {
            blend: true,
            blendFunc: [GL.SRC_ALPHA, GL.CONSTANT_ALPHA]
        },
        data,
        getPosition,
        autoHighlight: true,
        pickable: true,
        opacity: 0.5,
        radiusScale: 100,
        radiusMinPixels: 2,
        radiusMaxPixels: 100,   
        getRadius: item => RADIUS,
        getFillColor
    });
};