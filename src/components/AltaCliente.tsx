import React, {useState} from 'react';
import './AltaCliente.css';
import { IonModal, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader,IonItem,IonList,IonToast,IonText,IonInput } from '@ionic/react';
import { personCircle,arrowForward  } from 'ionicons/icons';
const AltaCliente: React.FC<{
  isOpen: boolean;
  onDismiss: () => void;
}> = ({isOpen,  onDismiss}) => {
  
   const IdUsuario=(localStorage.getItem('authToken'));
   const [isValidN, setIsValidN] = useState(true);
   const [isValidE, setIsValidE] = useState(true);
   const [isValidT, setIsValidT] = useState(true);
   const [isValidD, setIsValidD] = useState(true);
   const [isValidC, setIsValidC] = useState(true);
   const [isValidEs, setIsValidEs] = useState(true);
   const [isValidP, setIsValidP] = useState(true);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');
  
  const handleSubmit = () => {
    if (!isValidN || !isValidE || !isValidT || !isValidD || !isValidC || !isValidEs || !isValidP) {
      // Input is not valid, do not proceed
      
      return;
    }
    
    // Send a POST request to the PHP backend to insert client data
    fetch('https://lotes.cocinasdalloway.com/components/clients/create.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, email, telefono, direccion, ciudad, estado, pais, IdUsuario }),
    })
    .then((response) => response.json())
    .then((data)=>{
      if (data.status===200) {
       clearForm();
        alert(data.message);
      } else {
        alert('Error:' + data.message);
      }
})
    .catch((error) =>  alert('Error al eliminar cliente:'+ error));
  };
  const clearForm = () => {
    setNombre('');
    setEmail('');
    setTelefono('');
    setDireccion('');
    setCiudad('');
    setEstado('');
    setPais('');
  };
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
          <IonInput  value={nombre} label="Nombre del cliente" labelPlacement="floating"  maxlength={300}  onIonInput={(e) =>{ setNombre(e.detail.value!);
                                                                                                                const value = e.detail.value || '';
                                                                                                                setIsValidN(value.trim() !== '');}}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Email" type="email" labelPlacement="floating"  maxlength={200}  onIonInput={(e) => {setEmail(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                setIsValidE(value.trim() !== '');}}></IonInput>
          <IonIcon icon={arrowForward } />
          <IonInput label="Telefono" type="tel" labelPlacement="floating"  maxlength={25}  onIonInput={(e) => {setTelefono(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                setIsValidT(value.trim() !== '');}}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
            <IonInput label="Dirección" labelPlacement="floating"   onIonInput={(e) => {setDireccion(e.detail.value!)
                                                                                        const value = e.detail.value || '';
                                                                                        setIsValidD(value.trim() !== '');}}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Ciudad" labelPlacement="floating"  maxlength={250}  onIonInput={(e) => {setCiudad(e.detail.value!)
                                                                                                    const value = e.detail.value || '';
                                                                                                    setIsValidC(value.trim() !== '');}}></IonInput>
          <IonIcon icon={arrowForward } />
          <IonInput label="Estado" labelPlacement="floating"  maxlength={250}  onIonInput={(e) => {setEstado(e.detail.value!)
                                                                                                    const value = e.detail.value || '';
                                                                                                    setIsValidEs(value.trim() !== '');}}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
            <IonInput label="Pais" labelPlacement="floating" maxlength={250}  onIonInput={(e) => {setPais(e.detail.value!)
                                                                                                    const value = e.detail.value || '';
                                                                                                    setIsValidP(value.trim() !== '');}}></IonInput>
          </IonItem>
        </IonList>
        
        <IonButton className="ion-text-right" onClick={onDismiss}>Cerrar</IonButton>
        <IonButton className="ion-text-right" onClick={handleSubmit}>Crear</IonButton>
      </IonCardContent>
      
    </IonCard>
      
      
    </IonContent>
  </IonModal>
  );
};

export default AltaCliente;
