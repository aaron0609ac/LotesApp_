// src/components/ItemDetail.tsx
import React,{useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader,IonItem,IonList,IonSelect,IonSelectOption,IonInput,IonIcon  } from '@ionic/react';
import { personCircle,arrowForward, refresh  } from 'ionicons/icons';
interface ContainerProps {
  match?: string;
}
const ClientesDetalle: React.FC<ContainerProps> = ({match}) => {
  const [info, setInfo] = useState<string>('');
  const [nombre1, setNombre1] = useState('');
  const [email1, setEmail] = useState('');
  const [telefono1, setTelefono] = useState('');
  const [direccion1, setDireccion] = useState('');
  const [ciudad1, setCiudad] = useState('');
  const [estado1, setEstado] = useState('');
  const [pais1, setPais] = useState('');

  const loadInfo = () => {
  
    const Parameters=JSON.stringify(match);
  const Parameters1=JSON.parse(Parameters);
    // Simulate loading data from an API based on the "id" URL parameter
    const id = Parameters1.params.idCl;
    // Replace this with your actual data fetching logic
    const fetchedInfo = id;
    console.log(fetchedInfo);
    setInfo(fetchedInfo);
    fetch('https://lotes.cocinasdalloway.com/components/clients/getById.php?id='+fetchedInfo, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
         }
       })
           .then((response) => response.json())
           .then((data) => {
             // Set the data obtained from the URL
             setNombre1(data.data[0].nombre);
             setEmail(data.data[0].email);
             setTelefono(data.data[0].telefono);
             setDireccion(data.data[0].direccion);
             setCiudad(data.data[0].ciudad);
             setEstado(data.data[0].estado);
             setPais(data.data[0].pais);
           })
           .catch((error) => {
             console.error('Error fetching data:', error);
           });
  };

  useEffect(() => {
    loadInfo();
  }, [match]);
  const handleSubmit = () => {
    const clientId=info;
    fetch('https://lotes.cocinasdalloway.com/components/clients/update.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre1, email1, telefono1, direccion1, ciudad1, estado1, pais1, clientId }),
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
    <IonPage >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalles del cliente</IonTitle>
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
          <IonInput label="Nombre del cliente" value={nombre1} labelPlacement="floating"  maxlength={300}  onIonInput={(e) => setNombre1(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Email" type="email" value={email1}  labelPlacement="floating"  maxlength={200}  onIonInput={(e) => setEmail(e.detail.value!)}></IonInput>
          <IonIcon icon={arrowForward } />
          <IonInput label="Telefono" type="tel" value={telefono1}  labelPlacement="floating"  maxlength={25}  onIonInput={(e) => setTelefono(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
            <IonInput label="Dirección" labelPlacement="floating" value={direccion1}   onIonInput={(e) => setDireccion(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Ciudad" labelPlacement="floating" value={ciudad1}   maxlength={250}  onIonInput={(e) => setCiudad(e.detail.value!)}></IonInput>
          <IonIcon icon={arrowForward } />
          <IonInput label="Estado" labelPlacement="floating" value={estado1}  maxlength={250}  onIonInput={(e) => setEstado(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
            <IonInput label="Pais" labelPlacement="floating" value={pais1}  maxlength={250}  onIonInput={(e) => setPais(e.detail.value!)}></IonInput>
          </IonItem>
        </IonList>
        <IonButton shape="round" color="success" className="ion-text-right" onClick={handleSubmit}>Actualizar</IonButton>
      </IonCardContent>
      
    </IonCard>
        <IonButton routerLink="../Clientes" expand="full">Regresar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ClientesDetalle;
