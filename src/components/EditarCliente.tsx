import React, {useState, useEffect} from 'react';
import './AltaCliente.css';
import { IonModal, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader,IonItem,IonList,IonThumbnail,IonLabel,IonInput } from '@ionic/react';
import { personCircle,arrowForward  } from 'ionicons/icons';
const AltaCliente: React.FC<{
  isOpen: boolean;
  onDismiss: () => void;
  Nombre:string; 
  Email:string; 
  Telefono:string; 
  Direccion:string; 
  Ciudad:string;
  Estado:string;
  Pais:string;
  IdCliente:number;
}> = ({isOpen,  onDismiss, Nombre, Email, Telefono, Direccion, Ciudad, Estado, Pais, IdCliente}) => {
  
  
  const nombre=(Nombre);
  const email=(Email);
  const telefono=(Telefono);
  const direccion=(Direccion);
  const ciudad=(Ciudad);
  const estado=(Estado);
  const pais=(Pais);
  const idcliente=(IdCliente);

  const [nombre1, setNombre] = useState(Nombre);
  const [email1, setEmail] = useState(Email);
  const [telefono1, setTelefono] = useState(Telefono);
  const [direccion1, setDireccion] = useState(Direccion);
  const [ciudad1, setCiudad] = useState(Ciudad);
  const [estado1, setEstado] = useState(Estado);
  const [pais1, setPais] = useState(Pais);

 
  const handleSubmit = () => {
    console.log(nombre1)
    console.log(email1)
    // Send a POST request to the PHP backend to insert client data
    
    fetch('https://lotes.cocinasdalloway.com/components/clients/update.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre1, email1, telefono1, direccion1, ciudad1, estado1, pais1, idcliente }),
    })
    .then((response) => response.json())
    .then((data)=>{
      if (data.status===200) {
       
        alert(data.message);
      } else {
        alert('Error:' + data.message);
      }
})
    .catch((error) =>  alert('Error al eliminar cliente:'+ error));
    
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  return (
    
    <IonModal isOpen={isOpen}  onDidDismiss={onDismiss} >
    <IonHeader>
      <IonToolbar>
        <IonTitle>Registro de cliente</IonTitle>
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
          <IonInput label="Nombre del cliente" value={nombre} labelPlacement="floating"  maxlength={300}  onIonInput={(e) => setNombre(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Email" type="email" value={email}  labelPlacement="floating"  maxlength={200}  onIonInput={(e) => setEmail(e.detail.value!)}></IonInput>
          <IonIcon icon={arrowForward } />
          <IonInput label="Telefono" type="tel" value={telefono}  labelPlacement="floating"  maxlength={25}  onIonInput={(e) => setTelefono(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
            <IonInput label="Dirección" labelPlacement="floating" value={direccion}   onIonInput={(e) => setDireccion(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Ciudad" labelPlacement="floating" value={ciudad}   maxlength={250}  onIonInput={(e) => setCiudad(e.detail.value!)}></IonInput>
          <IonIcon icon={arrowForward } />
          <IonInput label="Estado" labelPlacement="floating" value={estado}  maxlength={250}  onIonInput={(e) => setEstado(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
            <IonInput label="Pais" labelPlacement="floating" value={pais}  maxlength={250}  onIonInput={(e) => setPais(e.detail.value!)}></IonInput>
          </IonItem>
        </IonList>
        <IonButton className="ion-text-right" onClick={onDismiss}>Cerrar</IonButton>
        <IonButton className="ion-text-right" onClick={handleSubmit}>Actualizar</IonButton>
      </IonCardContent>
      
    </IonCard>
      
      
    </IonContent>
  </IonModal>
  );
};

export default AltaCliente;
