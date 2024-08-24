import  React,{useRef,useState, useEffect} from 'react';
import './Lotes.css';
import axios from 'axios';
import DetalleLote from './DetalleLote';
import {} from '@capacitor/google-maps';
interface ContainerProps {
  name: string;
}

const Lotes: React.FC<ContainerProps> = ({ name }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 21.2164, lng: -99.4748}); 
  const [mapZoom, setMapZoom] = useState(14); 
  const [showPolygonModal, setShowPolygonModal] = useState(false);
  const [polygonArray, setPolygonArray] = useState([]);
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
  const mapRef = useRef<HTMLElement>();
  let map: google.maps.Map;
  const [shouldFetchData,setshouldFetchData] = useState(true); 
  const loadData1 = () => {
    axios.get('https://lotes.cocinasdalloway.com/components/data/data.php?id='+localStorage.getItem('authToken'))
   .then((response) => {
     // Assuming the response data is an array of LatLng objects
    // console.log(response.data)
   
     const polygonsData = response.data;
     return polygonsData;
     
   })
   .catch((error) => {
     console.error('Error fetching polygon data:', error);
   });
 }

  const loadData = () => {
     axios.get('https://lotes.cocinasdalloway.com/components/data/data.php?id='+localStorage.getItem('authToken'))
    .then((response) => {
      // Assuming the response data is an array of LatLng objects
     // console.log(response.data)
    
      const polygonsData = response.data;
      setPolygonArray(polygonsData);
      console.log(polygonArray)
      //createMap();
      
    })
    .catch((error) => {
      console.error('Error fetching polygon data:', error);
    });
  }

  useEffect(() => {

      axios.get('https://lotes.cocinasdalloway.com/components/data/data.php?id='+localStorage.getItem('authToken'))
      .then((response) => {
        // Assuming the response data is an array of LatLng objects
       // console.log(response.data)
      
        const polygonsData = response.data;
        setPolygonArray(polygonsData);
        console.log(polygonArray)
        
      })
      .catch((error) => {
        console.error('Error fetching polygon data:', error);
      });
     

  
  }, []);

  const createMap = async () => {
    if (!mapRef.current) return;
    const mapOptions: google.maps.MapOptions = {
      center:  mapCenter, // Set the initial center of the map
      zoom: mapZoom, // Set the initial zoom level
      mapTypeId: google.maps.MapTypeId.HYBRID, // Set the map type
    };
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
    map = new google.maps.Map(mapRef.current!, mapOptions);
   
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
     /*
     map.addListener('dragend', () => {
      const cameraPositionLat = map.getCenter()?.lat();
      const cameraPositionLng = map.getCenter()?.lng();
      const zoomPosition = map.getZoom();
      if (typeof cameraPositionLat === 'number' && !isNaN(cameraPositionLat) && typeof cameraPositionLng === 'number' && !isNaN(cameraPositionLng) ){
        setMapCenter ({ lat: cameraPositionLat, lng: cameraPositionLng}); 
      }
      if (typeof zoomPosition === 'number' && !isNaN(zoomPosition)){
        setMapZoom(zoomPosition); 
      }
    });
    */
   });
   
  
  }
 

  const closeModal = () => {
    loadData();
    setShowPolygonModal(false);
    
  };
  createMap();
   
  return (
    <div className="container"> 
      <capacitor-google-map ref={mapRef} ></capacitor-google-map>

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
    </div>
    
  );
};

export default Lotes;
