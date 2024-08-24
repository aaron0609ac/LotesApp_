// src/components/DrawingMap.js
import React, {useState, useRef, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { IonFab, IonFabButton ,IonIcon  } from '@ionic/react';
import { GoogleMap, DrawingManager, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { chevronBackCircle } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import ConfirmationDialog from './ConfirmationDialog';
interface ContainerProps {
  match?: string;
}
const FraccionamientoDibujar : React.FC<ContainerProps> = ({match}) => {
  const containerStyle = {
    width: '100%',
    height: '100%',
  };
 
  const [map, setMap] = useState('');
  const [mapManager, setMapManager] = useState(true);
  const [drawingManager, setDrawingManager] = useState(true);
  const [mapZoom, setMapZoom] = useState(2); 
  const [mapCenter, setMapCenter] = useState({ lat: 19.42847, lng: -99.12766}); 
  const mapRef = useRef<google.maps.Map | null>(null);
  const [coordinates, setCoordinates] = useState([]);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const Parameters=JSON.stringify(match);
    const Parameters1=JSON.parse(Parameters);
    const id = Parameters1.params.id;
    const fetchedInfo = id;
  const [Id, setParametro] = useState(id);

  const onUnmount = () => {
    setMap('');
  };
  
  const onDrawingLoad = () => {
    setDrawingManager(false);
  };
  
  const onPolygonComplete = (polygon:any) => {
    // Handle the completed polygon here (e.g., store coordinates)
    //console.log('Polygon coordinates:', polygon.getPath().getArray());
    const paths = polygon.getPath().getArray();
    const polygonCoordinates = paths.map((path:any) => ({ lat: path.lat(), lng: path.lng() }));
    setCoordinates(polygonCoordinates);
    //console.log(polygonCoordinates)
    //savePolygonToServer(polygonCoordinates);
    setIsConfirmationDialogOpen(true)
  };
  const savePolygonToServer = () => {
    axios.post(`https://lotes.cocinasdalloway.com/components/colonias/addCoordinatesDinamically.php?id=${fetchedInfo}`, { coordinates })
  .then((response)=>{
    const responseData = response.data;
    console.log(responseData)
    if (responseData.status===200) {
      alert(responseData.message);
      window.location.href = './page/Fraccionamientos';
    } else {
      alert('Error:' + responseData.message);
    }
})
    .catch((error) => {
      console.error('Error saving polygon:', error);
    });
  };
  // Animación de zoom in
  const zoomAnimation = setInterval(() => {
    if (mapRef.current) {
        const currentZoom = mapRef.current.getZoom();
        if (typeof currentZoom ==='number'){
        if (currentZoom <= 5) { // Cambia 15 al nivel de zoom deseado
          mapRef.current.setZoom(currentZoom + 2);
        
        } else {
          clearInterval(zoomAnimation);
          
        }
      }
    }
  }, 500);
  

  const handleConfirm = () => {
   
    // Perform the action when the user confirms
    // e.g., delete a record, submit a form, etc.
   // setMapManager(true);
    savePolygonToServer();
    setIsConfirmationDialogOpen(false);

  };

  const handleCancel = () => {
    // Handle cancel action (optional)
    
    setIsConfirmationDialogOpen(false);
    window.location.reload();
  };
  
 
  const onLoad = (map: google.maps.Map) => {
    
    mapRef.current = map;
  };
 
 
  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent>
      {mapManager && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={mapZoom}
            onLoad={onLoad}
          onUnmount={onUnmount}
          mapTypeId="hybrid"
          >   
       
        <DrawingManager
        onLoad={onDrawingLoad}
          onPolygonComplete={onPolygonComplete}
          options={{ drawingMode:google.maps.drawing.OverlayType.POLYGON, 
                    
                     polygonOptions: {
                      fillColor: '#7A9AFF', // Change the fill color of the polygon
                      fillOpacity: 0.5, // Change the fill opacity (transparency)
                      strokeWeight: 2, // Change the border (stroke) weight
                      strokeColor: '#7A9AFF', // Change the border color
                    },
                    drawingControl:true,
                    drawingControlOptions:{position:google.maps.ControlPosition.LEFT_CENTER}}}
        
        />
       
       
          </GoogleMap>
       )}
          <ConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      </IonContent>
      <IonFab vertical="bottom" horizontal="center" slot="fixed" style={{position: "absolute"}}>
      <Link to={`../Fraccionamientos`}>
        <IonFabButton>
          <IonIcon icon={chevronBackCircle} />
        </IonFabButton>
      </Link>
      </IonFab>
    </IonPage>
  );
};

export default FraccionamientoDibujar;
