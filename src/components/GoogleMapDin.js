// src/components/GoogleMap.js
import React, { useEffect, useRef } from 'react';
import {DrawingManager} from '@capacitor/google-maps';

const GoogleMapDin = () => {
  const mapRef = useRef(null);
  let map;
  let drawingManager;
  let polygon;

  useEffect(() => {
    if (window.google) {
      map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 }, // Initial map center
        zoom: 10, // Adjust the initial zoom level
      });

      drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
        },
      });

      drawingManager.setMap(map);

      window.google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
        if (event.type === window.google.maps.drawing.OverlayType.POLYGON) {
          if (polygon) {
            polygon.setMap(null);
          }
          polygon = event.overlay;
        }
      });
    }
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ height: '400px' }}></div>
    </div>
  );
};

export default GoogleMapDin;
