// src/components/ItemDetail.tsx
import React,{useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader,IonItem,IonList,IonSelect,IonSelectOption,IonInput,IonIcon  } from '@ionic/react';
import { personCircle,arrowForward, refresh  } from 'ionicons/icons';

interface ContainerProps {
  match?: string;
}


const LoteDetalle: React.FC<ContainerProps> = ({match}) => {
  const [colons, setColonias] = useState([
    { id: 0, nombre: '' },
    // Add more client objects here
  ]);
   
  const [nombre, setNombre] = useState('');
  const [estatus, setEstatus] = useState('');
  const [colonia, setColonia] = useState('');
  const [costo, setCosto] = useState('');
  const [E1Lt, setE1Lt] = useState('');
  const [E1Ln, setE1Ln] = useState('');
  const [E2Lt, setE2Lt] = useState('');
  const [E2Ln, setE2Ln] = useState('');
  const [E3Lt, setE3Lt] = useState('');
  const [E3Ln, setE3Ln] = useState('');
  const [E4Lt, setE4Lt] = useState('');
  const [E4Ln, setE4Ln] = useState('');
  const [activo, setActivo] = useState('');
  const [info, setInfo] = useState<string>('');
  
  const loadInfo = () => {
  
    const Parameters=JSON.stringify(match);
  const Parameters1=JSON.parse(Parameters);
  
    // Simulate loading data from an API based on the "id" URL parameter
    const id = Parameters1.params.id;
    // Replace this with your actual data fetching logic
    const fetchedInfo = id;
    //console.log(fetchedInfo);
    setInfo(fetchedInfo);
    //console.log(fetchedInfo);
    fetch('https://lotes.cocinasdalloway.com/components/data/getById.php?id='+fetchedInfo, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
        .then((response) => response.json())
        .then((data) => {
          // Set the data obtained from the URL
          
          setNombre(data.data[0].nombre);
          setEstatus(data.data[0].estatus);
          setColonia(data.data[0].colonia);
          setCosto(data.data[0].costo);
          setE1Lt(data.data[0].corner1Lat);
          setE1Ln(data.data[0].corner1Lon);
          setE2Lt(data.data[0].corner2Lat);
          setE2Ln(data.data[0].corner2Lon);
          setE3Lt(data.data[0].corner3Lat);
          setE3Ln(data.data[0].corner3Lon);
          setE4Lt(data.data[0].corner4Lat);
          setE4Ln(data.data[0].corner4Lon);
          setActivo(data.data[0].activo);
          
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
         // Fetch client data from your PHP backend
      fetch('https://lotes.cocinasdalloway.com/components/colonias/getAll.php?id='+localStorage.getItem('authToken'), {
        method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
          setColonias(data.data)
          })
        .catch((error) => alert('Error al obtener las colonias:'+ error));
  };

  useEffect(() => {
    loadInfo();
  }, [match]);

  const handleSubmit = () => {
    const idlote=info;
   // console.log(estatus)
  // Send a POST request to the PHP backend to insert client data
  
  fetch('https://lotes.cocinasdalloway.com/components/data/update.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, estatus, colonia, costo,E1Lt, E1Ln,E2Lt, E2Ln,E3Lt, E3Ln,E4Lt,E4Ln,activo,idlote}),
  })
  .then((response) => response.json())
  .then((data)=>{
    if (data.status===200) {
      alert(data.message);
      loadInfo();
    } else {
      alert('Error:' + data.message);
    }
})
  .catch((error) =>  alert('Error al actualizar cliente:'+ error));
  
};
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalles del lote</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
      <IonCard>
      <IonCardHeader>
      {/*
      <IonCardTitle>ID:{IdLote}</IonCardTitle>
      <IonCardSubtitle>Nombre del Lote:{Nombre}</IonCardSubtitle>
      */}
      </IonCardHeader>
      <IonCardContent>
      <IonList>
      <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput  value={nombre} label="Nombre del lote" labelPlacement="floating"  maxlength={300}  onIonInput={(e) =>{ setNombre(e.detail.value!);
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
           <IonIcon icon={arrowForward } />
              <IonSelect label="Estatus" value={estatus} onIonChange={(e:any) =>{setEstatus(e.detail.value!)
                                                                                        const value = e.detail.value || '';
                                                                                        }}>
                <IonSelectOption value="Pendiente">Pendiente</IonSelectOption>
                <IonSelectOption value="Vendido">Vendido</IonSelectOption>
            </IonSelect>                                                                                                 
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
              <IonSelect label="Fraccionamiento" value={colonia}  onIonChange={(e:any) =>{setColonia(e.detail.value!)
                                                                                        const value = e.detail.value || '';
                                                                                        }}>
                                                                                          
                {colons.map((client: any) => (
                <IonSelectOption key={client.id} value={client.id}>{client.descripcion}</IonSelectOption>
                ))}
            </IonSelect>  
          <IonIcon icon={arrowForward } />
          <IonInput label="Costo" value={costo} labelPlacement="floating"  maxlength={25}  onIonInput={(e) => {setCosto(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
          
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 1 Latitud" value={E1Lt} labelPlacement="floating"  maxlength={25}  onIonInput={(e) => {setE1Lt(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
                                                                                                                <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 1 Longitud" value={E1Ln} labelPlacement="floating"  maxlength={25}  onIonInput={(e) => {setE1Ln(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 2 Latitud" value={E2Lt} labelPlacement="floating"  maxlength={25}  onIonInput={(e) => {setE2Lt(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
                                                                                                                <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 2 Longitud" value={E2Ln} labelPlacement="floating"  maxlength={25}  onIonInput={(e) => {setE2Ln(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 3 Latitud" value={E3Lt} labelPlacement="floating"  maxlength={25}  onIonInput={(e) => {setE3Lt(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
                                                                                                                <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 3 Longitud" value={E3Ln} labelPlacement="floating"  maxlength={25}  onIonInput={(e) => {setE3Ln(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 4 Latitud" value={E4Lt} labelPlacement="floating"  maxlength={25}  onIonInput={(e) => {setE4Lt(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
                                                                                                                <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 4 Longitud" value={E4Ln} labelPlacement="floating"  maxlength={25}  onIonInput={(e) => {setE4Ln(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
          </IonItem>
          <IonItem>
          <IonSelect label="Estatus" value={activo} onIonChange={(e:any) =>{setActivo(e.detail.value!)
                                                                                        const value = e.detail.value || '';
                                                                                        }}>
                <IonSelectOption value="si">Activo</IonSelectOption>
                <IonSelectOption value="no">Inactivo</IonSelectOption>
            </IonSelect> 
          </IonItem>
        </IonList>
        <IonButton shape="round" color="success" className="ion-text-right" onClick={handleSubmit}>Actualizar</IonButton>
      </IonCardContent>
      <IonButton routerLink="../LotesRegistro" expand="full">Regresar</IonButton>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LoteDetalle;
