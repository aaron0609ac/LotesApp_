// src/components/ItemDetail.tsx
import React,{useRef,useState, useEffect} from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { IonFab, IonFabButton ,IonIcon  } from '@ionic/react';
import { chevronBackCircle } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import {} from '@capacitor/google-maps';
import axios from 'axios';
import './LoteMap.css';
import DetalleLote from './DetalleLote';
interface ContainerProps {
  match?: string;
}


const LoteMap: React.FC<ContainerProps> = ({match}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 19.42847, lng: -99.12766}); 
  const [mapZoom, setMapZoom] = useState(2); 
  const [centerMarker, setMarkerCenter] = useState({ lat: 19.42847, lng: -99.12766 });
  const [polygonArray, setPolygonArray] = useState([]);
  const [polygonArrayCol, setPolygonArrayCol] = useState([]);
  const [showPolygonModal, setShowPolygonModal] = useState(false);
  const [Id, setParametro] = useState(0);
  const [NombreLote, setNombreLote] = useState('');
  const [NombreColonia, setNombreColonia] = useState('');
  const [NombreCosto, setNombreCosto] = useState('');
  const [Esq1, setEsq1] = useState('');
  const [Esq2, setEsq2] = useState('');
  const [Esq3, setEsq3] = useState('');
  const [Esq4, setEsq4] = useState('');
  const [Estatus, setEstatus] = useState('');
  const [IdCl, setidCliente] = useState(0);
  const mapRef = useRef<HTMLElement| null>(null);
  let map: google.maps.Map;

  useEffect(() => {
    
    const Parameters=JSON.stringify(match);
    const Parameters1=JSON.parse(Parameters);
    const id = Parameters1.params.id;
    const fetchedInfo = id;
    //console.log(fetchedInfo);
    axios.get('https://lotes.cocinasdalloway.com/components/data/data.php?id='+localStorage.getItem('authToken'))
   .then((response) => {
     // Assuming the response data is an array of LatLng objects
     const polygonsData = response.data;
    //console.log(polygonsData)
     setPolygonArray(polygonsData);
     let idColonia = '';
     if(polygonArray){
      //console.log(response.data[0].coords[0].lat)
       // setMapCenter ({ lat: response.data[0].coords[0].lat, lng: response.data[0].coords[0].lng}); 
        let latSum = 0;
        let lngSum = 0;
        let CoorLenght = 4;
        const paths=response.data;
        //console.log(paths)
        paths.forEach((datas:any) => {
          if(parseInt(datas.id) === parseInt(fetchedInfo)){
            const paths1=datas.coords;
            CoorLenght=paths1.length;
            //console.log(paths1)
            paths1.forEach((datasC:any) => {
              latSum += datasC.lat;
              lngSum += datasC.lng;
             
                });
                idColonia=datas.idCol
                setPolygonArrayCol(paths1);
          }
        });
       
        const latAvg = latSum / CoorLenght;
        const lngAvg = lngSum / CoorLenght;
        //console.log(latSum+" - "+lngSum)
        //console.log(latAvg+" - "+lngAvg)
        //console.log(paths.length)
        setMarkerCenter({ lat: latAvg, lng: lngAvg });
        setMapCenter ({ lat: latAvg, lng: lngAvg }); 
        
    }
    //const idColonia = response.data[0].idCol;
    if(idColonia){
      //console.log(idColonia)
      axios.get('https://lotes.cocinasdalloway.com/components/data/dataIdCol.php?id='+idColonia)
      .then((response) => {
        // Assuming the response data is an array of LatLng objects
        const polygonsDataCol = response.data;
        //console.log(response.data);
        //setPolygonArrayCol(polygonsDataCol);
        //console.log(polygonsDataCol);
      })
      .catch((error) => {
        console.error('Error fetching polygon data:', error);
      });
    }
   })
   .catch((error) => {
     console.error('Error fetching polygon data:', error);
   });
    
    
  }, [match]);
  const loadData = () => {
    const Parameters=JSON.stringify(match);
    const Parameters1=JSON.parse(Parameters);
    const id = Parameters1.params.id;
    const fetchedInfo = id;
    axios.get('https://lotes.cocinasdalloway.com/components/data/data.php?id='+localStorage.getItem('authToken'))
   .then((response) => {
     // Assuming the response data is an array of LatLng objects
     const polygonsData = response.data;
     setPolygonArray(polygonsData);
    
   })
   .catch((error) => {
     console.error('Error fetching polygon data:', error);
   });
  };
  const loadInfo = () => {
    
   const handlePolygonClick = (polygon: google.maps.Polygon) => {
    // Get the custom ID property of the clicked polygon
    
    const polygonId = polygon.get('id');
     setParametro(polygonId);
    // Display the ID using an alert or any other UI element
   // alert(`Polygon clicked with ID: ${polygonId}`);
  
    // Fetch data from a URL
    fetch('https://lotes.cocinasdalloway.com/components/data/detalle.php?id='+polygonId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the data obtained from the URL
        //console.log(data);
        
        setNombreLote(data['Nombre']);
        setNombreColonia(data['Colonia']);
        setNombreCosto(data['Costo']);
        setEsq1(data['Esq1']);
        setEsq2(data['Esq2']);
        setEsq3(data['Esq3']);
        setEsq4(data['Esq4']);
        setEstatus(data['Estatus']);
        setidCliente(data['IdCliente']);
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  
   setShowPolygonModal(true);
   const cameraPositionLat = map.getCenter()?.lat();
    const cameraPositionLng = map.getCenter()?.lng();
    const zoomPosition = map.getZoom();
    if (typeof cameraPositionLat === 'number' && !isNaN(cameraPositionLat) && typeof cameraPositionLng === 'number' && !isNaN(cameraPositionLng) ){
      setMapCenter ({ lat: cameraPositionLat, lng: cameraPositionLng}); 
    }
    if (typeof zoomPosition === 'number' && !isNaN(zoomPosition)){
      setMapZoom(zoomPosition); 
    }
    };
    if (!mapRef.current) return;
    
    const mapOptions: google.maps.MapOptions = {
      center:  mapCenter, // Set the initial center of the map
      zoom: mapZoom, // Set the initial zoom level
      mapTypeId: google.maps.MapTypeId.HYBRID, // Set the map type
    };
    map = new google.maps.Map(mapRef.current!, mapOptions);
   // setMapCenter ({ lat: polygonArray[0]['coords'][0]['lat'], lng: polygonArray[0]['coords'][0]['lng']}); 

   
   
    const polygon1 = new google.maps.Polygon({
      paths: polygonArrayCol,
      strokeColor: "#7A9AFF", // Color of the polygon border
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor:"#7A9AFF", // Fill color of the polygon
      fillOpacity: 0.35,
    });
     polygon1.setMap(map);
    
   
    polygonArray.forEach(polygonData => {
   
      const polygon = new google.maps.Polygon({
        paths: polygonData['coords'],
        strokeColor: polygonData['color'], // Color of the polygon border
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor:polygonData['color'], // Fill color of the polygon
        fillOpacity: 0.35,
      });
  
       // Set a custom ID property for the polygon
       polygon.set('id', polygonData['id']);
  
       google.maps.event.addListener(polygon, 'click', () => {
        handlePolygonClick(polygon);
       
      });
       polygon.setMap(map);
       
     });
     
     const markerOptions = {
      position: centerMarker, 
    };
    
    // Create a marker with the specified options
    const marker = new google.maps.Marker(markerOptions);
    
    // Add the marker to the map
    marker.setMap(map);

    // Animación de zoom in
    const zoomAnimation = setInterval(() => {
      const currentZoom = map.getZoom();
      if (typeof currentZoom ==='number'){
      if (currentZoom <= 15) { // Cambia 15 al nivel de zoom desead
          map.setZoom(currentZoom + 2);
       
      } else {
        clearInterval(zoomAnimation);
        //console.log(polygonArrayCol)
        const area = calculatePolygonArea(polygonArrayCol)* (111.32 * 111.32);
        const floatValue = parseFloat((area).toString());
        const infoWindow = new google.maps.InfoWindow({
         content: `Área: ${floatValue.toFixed(4)} m2`,
       });
       
       infoWindow.setPosition(mapCenter);
       infoWindow.open(map);
      }
    }
    }, 500);
  };
  
  const calculatePolygonArea = (coordinates: string | any[]) => {
    let area = 0;
    const numPoints = coordinates.length;
    for (let i = 0; i < numPoints; i++) {
      const j = (i + 1) % numPoints;
      area += coordinates[i].lat * (coordinates[j].lng - coordinates[i].lng);
    }
    
    return Math.abs(area) * 111000; 
  };
  const closeModal = () => {
    loadData();
    setShowPolygonModal(false);
    
  };
  loadInfo();

  return (
    
    <IonPage>
      <IonContent>
      <capacitor-google-map ref={mapRef} style={{postion: "absolute", height:"100vh"}} ></capacitor-google-map>
      
      </IonContent>
      <IonFab vertical="bottom" horizontal="center" slot="fixed" style={{position: "absolute"}}>
      <Link to={`../LotesRegistro`}>
        <IonFabButton>
          <IonIcon icon={chevronBackCircle} />
        </IonFabButton>
      </Link>
      </IonFab>
       
      <DetalleLote isOpen={showPolygonModal} 
                    onDismiss={closeModal} 
                    IdLote={Id} 
                    Nombre={NombreLote} 
                    Colonia={NombreColonia} 
                    Costo={NombreCosto} 
                    Esq1={Esq1}
                    Esq2={Esq2}
                    Esq3={Esq3}
                    Esq4={Esq4}
                    Estatus={Estatus}
                    IdCl={IdCl}/>
    </IonPage>
    
  );
};

export default LoteMap;
