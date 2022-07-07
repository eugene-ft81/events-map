import React, {useState, useEffect} from 'react';

import {Map as Mapbox, NavigationControl,FullscreenControl,Marker} from "react-map-gl";

import { DeckGL } from 'deck.gl';

import { orange } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";

import scatterplotLayer from '../layers/scatter-layer';
import clusterLayer from '../layers/cluster-layer';
import tooltip from '../tooltip/tooltip'; 
import './map.css';

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
//const EVENTS_URL = 'data/nyc_events.json';
//const EVENTS_URL = 'data/nyc_dup_events.json';
const EVENTS_URL = 'data/events.json';
const mapboxMapStyle = 'mapbox://styles/mapbox/light-v9';
const fullscreenControlStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px",
    zIndex: 9999
};
const navStyle = {
    position: "absolute",
    top: 36,
    left: 0,
    padding: "10px",
    zIndex: 9999
};
export default function Map({ viewState, onViewStateChange }) {
    const [hoverInfo, setHoverInfo] = useState({});
    const hideTooltip = () => setHoverInfo({});
    const expandTooltip = info => {
        if(info.object?.cluster === false) return;
        if(info.picked)
            setHoverInfo(info);
        else
            setHoverInfo({});
    };
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(EVENTS_URL).then(res=>res.json())
        .then(events => setData(events.items));
    },[]);
    const onClusterLayerHover = !hoverInfo.objects && setHoverInfo;
    const layers = [
        scatterplotLayer(data),
        clusterLayer(data,onClusterLayerHover)
    ];
    return (
        <div id='map-container'>
            <Mapbox
                mapboxAccessToken={TOKEN}
                mapStyle={mapboxMapStyle}
                {...viewState}
                onMove={e => onViewStateChange(e.viewState)}
            >
                <div style={fullscreenControlStyle}>
                    <FullscreenControl />
                </div>
                <div style={navStyle}>
                    <NavigationControl 
                        onViewportChange={onViewStateChange}
                    />
                </div>
                <Marker 
                    latitude={viewState.latitude} longitude={viewState.longitude} 
                    offsetLeft={-20} offsetTop={-10}>
                    <Icon style={{ color: orange[500] }}>+</Icon>
                </Marker>
                <DeckGL
                    layers={layers}
                    {...viewState}
                    initialViewState={viewState}                
                    onViewStateChange={hideTooltip}
                    getTooltip={expandTooltip} 
                    onClick={expandTooltip}
                >
                    {tooltip(hoverInfo)}
                </DeckGL>
            </Mapbox>
        </div>
    );
}
