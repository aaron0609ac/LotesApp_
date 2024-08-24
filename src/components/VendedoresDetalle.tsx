// src/components/ItemDetail.tsx
import React,{useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader,IonItem,IonList,IonSelect,IonSelectOption,IonInput,IonIcon  } from '@ionic/react';
import { arrowForward  } from 'ionicons/icons';

interface ContainerProps {
  match?: string;
}


const LoteDetalle: React.FC<ContainerProps> = ({match}) => {
  const [nombrev, setNombre] = useState('');
  const [emailv, setEmail] = useState('');
  const [passwordv, setPassword] = useState('');
  const [activov, setActivo] = useState('');
  const [tipo1, setTipo] = useState('');
  const [idadministrador, setIdAdministrador] = useState('');
  const [info, setInfo] = useState<string>('');
  const loadInfo = () => {
  
    const Parameters=JSON.stringify(match);
  const Parameters1=JSON.parse(Parameters);
  
    // Simulate loading data from an API based on the "id" URL parameter
    const id = Parameters1.params.idVe;
    // Replace this with your actual data fetching logic
    const fetchedInfo = id;
    //console.log(fetchedInfo);
    setInfo(fetchedInfo);
    console.log(fetchedInfo);
    fetch('https://lotes.cocinasdalloway.com/components/sellers/getById.php?id='+fetchedInfo, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
        .then((response) => response.json())
        .then((data) => {
          // Set the data obtained from the URL
          console.log(data)
          setNombre(data.data[0].nombre);
          setEmail(data.data[0].username);
          setPassword(data.data[0].password);
          setActivo(data.data[0].activo);
          setTipo(data.data[0].tipo1);
          setIdAdministrador(data.data[0].IdAdministrador);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
  };

  useEffect(() => {
    loadInfo();
  }, [match]);

  const handleSubmit = () => {
    const idvendedor=info;
  // Send a POST request to the PHP backend to insert client data
  
  fetch('https://lotes.cocinasdalloway.com/components/sellers/update.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombrev, emailv, passwordv, activov,tipo1, idadministrador, idvendedor}),
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
          <IonTitle>Detalles del vendedor </IonTitle>
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
          <IonInput label="Email" type="email" value={emailv}  labelPlacement="floating"  maxlength={200}  onIonInput={(e) => setEmail(e.detail.value!)}></IonInput>
          <IonIcon icon={arrowForward } />
          <IonInput label="Password" value={passwordv}  labelPlacement="floating"  maxlength={30}  onIonInput={(e) => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonSelect label="Estatus" value={activov} onIonChange={(e:any) =>{setActivo(e.detail.value!)}}>
                <IonSelectOption value="si">Activo</IonSelectOption>
                <IonSelectOption value="no">Inactivo</IonSelectOption>
            </IonSelect> 
            </IonItem>
          
        </IonList>
        <IonButton className="ion-text-right" shape="round" color="success" onClick={handleSubmit}>Actualizar</IonButton>
      </IonCardContent>
      <IonButton routerLink="../Vendedores" expand="full">Regresar</IonButton>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LoteDetalle;
