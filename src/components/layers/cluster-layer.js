import IconClusterLayer from './icon-cluster-layer';

export default function clusterLayer(data,onHover) {
    const iconAtlasUrl = 'data/location-icon-atlas.png';
    const iconMappingUrl = 'data/location-icon-mapping.json';
    const getPosition = item => [
        item.geometry?.coordinates[0], 
        item.geometry?.coordinates[1]
    ];
    const layerProps = {
        data,
        pickable: true,
        getPosition,
        iconAtlas: iconAtlasUrl,
        iconMapping: iconMappingUrl,
        onHover
      };
    return new IconClusterLayer({...layerProps, id: 'cluster', sizeScale: 40});
}