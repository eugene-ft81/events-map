/*
https://github.com/visgl/deck.gl/blob/8.8-release/examples/website/icon/app.js
*/
import React from 'react';

import './tooltip.css';

const coordinates = ({coordinates}) => `[Lat: ${coordinates[0]} Lon: ${coordinates[1]}]`;

export default function tooltip(info) {
    const {object, x, y} = info;
    if (info.objects) return (
        <div className="tooltip interactive" style={{left: x, top: y}}>
          {info.objects.map(({id, geometry, properties},idx) => {
            return (
              <div key={id}>
                <h5>ID: {idx + 1}</h5>
                <div>{coordinates(geometry)}</div>
                <div>Topic: {properties.tag.topic}</div>
              </div>
            );
          })}
        </div>
      );
    if (!object) return null;
    return object.cluster ? (
        <div className="tooltip" style={{left: x, top: y}}>
          cluster of {object.point_count} event(s)
        </div>
    ) : (
        <div className="tooltip" style={{left: x, top: y}}>
          {coordinates(object.geometry)}, Topic: {object.properties.tag.topic}
        </div>
    );
}