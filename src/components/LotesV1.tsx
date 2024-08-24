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
  const [mapZoom, setMapZoom] = useState(15); 
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
  const [IdCl, setIdCl] = useState(0);
  const mapRef = useRef<HTMLElement>();
  let map: google.maps.Map;
 


  const createMap = async () => {
    if (!mapRef.current) return;
    const mapOptions: google.maps.MapOptions = {
      center:  mapCenter, // Set the initial center of the map
      zoom: mapZoom, // Set the initial zoom level
      mapTypeId: google.maps.MapTypeId.HYBRID, // Set the map type
    };
  
    map = new google.maps.Map(mapRef.current!, mapOptions);
  
  };
 

  const closeModal = () => {
    setShowPolygonModal(false);
    //createMap();
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://lotes.cocinasdalloway.com/components/data/data.php'); // Replace with your API URL
        const data = await response.json();
        //console.log(data)
        setPolygonArray(data);
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
      
  
           polygon.setMap(map);
           
          
         });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
    createMap();
    //console.log(polygonArray);
  }, []);
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
