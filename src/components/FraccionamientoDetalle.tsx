// src/components/ItemDetail.tsx
import React,{useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader,IonItem,IonList,IonSelect,IonSelectOption,IonInput,IonIcon  } from '@ionic/react';
import { personCircle,arrowForward, refresh  } from 'ionicons/icons';

interface ContainerProps {
  match?: string;
}


const LoteDetalle: React.FC<ContainerProps> = ({match}) => {
  const [nombrev, setNombre] = useState('');
  const [activov, setActivo] = useState('');
  const [idcolonia, setIdAdministrador] = useState('');
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
    console.log(fetchedInfo);
    fetch('https://lotes.cocinasdalloway.com/components/colonias/getById.php?id='+fetchedInfo, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
        .then((response) => response.json())
        .then((data) => {
          // Set the data obtained from the URL
          console.log(data)
          setNombre(data.data[0].descripcion);
          setActivo(data.data[0].activo);
          setIdAdministrador(data.data[0].id);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
  };

  useEffect(() => {
    loadInfo();
  }, [match]);

  const handleSubmit = () => {
   
  // Send a POST request to the PHP backend to insert client data
  
  fetch('https://lotes.cocinasdalloway.com/components/colonias/update.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombrev,  activov, idcolonia}),
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
          <IonTitle>Detalle del fraccionamiento </IonTitle>
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
          <IonInput label="Nombre del cliente" value={nombrev} labelPlacement="floating"  maxlength={300}  onIonInput={(e) => setNombre(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonSelect label="Estatus" value={activov} onIonChange={(e:any) =>{setActivo(e.detail.value!)}}>
                <IonSelectOption value="si">Activo</IonSelectOption>
                <IonSelectOption value="no">Inactivo</IonSelectOption>
            </IonSelect> 
            </IonItem>
          
        </IonList>
        <IonButton shape="round" color="success" className="ion-text-right" onClick={handleSubmit}>Actualizar</IonButton>
      </IonCardContent>
      <IonButton routerLink="../Fraccionamientos" expand="full">Regresar</IonButton>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LoteDetalle;
