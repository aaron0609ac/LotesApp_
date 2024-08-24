import React, {useState,useEffect} from 'react';
import './AltaVendedor.css';
import { IonModal, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader,IonItem,IonList,IonSelect,IonSelectOption,IonInput } from '@ionic/react';
import { personCircle,arrowForward  } from 'ionicons/icons';
const AltaVendedor: React.FC<{
  isOpen: boolean;
  onDismiss: () => void;
}> = ({isOpen,  onDismiss}) => {
  
   const [isValidN, setIsValidN] = useState(true);
   const [isValidU, setIsValidU] = useState(true);
   const [isValidPass, setIsValidPass] = useState(true);
   const [isValidA, setIsValidA] = useState(true);
   const [isValidT, setIsValidT] = useState(true);

  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activo, setActivo] = useState('si');
  const [tipo, setTipo] = useState(2);
  const [IdAdministrador, setIdAdministrador] = useState('');
  ////setIdAdministrador(localStorage.getItem('authToken') ?? '');
  useEffect(() => {
    // Read the value from localStorage when the component mounts
    const storedData = localStorage.getItem('authToken');
    if (storedData) {
      setIdAdministrador(storedData);
    }
  }, []);
  
  const handleSubmit = () => {
    console.log(IdAdministrador)
    if (!isValidN || !isValidU || !isValidPass || !isValidA || !isValidT ) {
      // Input is not valid, do not proceed
      
      return;
    }
    // Send a POST request to the PHP backend to insert client data
    fetch('https://lotes.cocinasdalloway.com/components/sellers/create.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, username, password, activo, tipo, IdAdministrador }),
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
    .catch((error) =>  alert('Error al eliminar el vendedor:'+ error));
  };
  const clearForm = () => {
    setNombre('');
    setUsername('');
    setPassword('');
    setActivo('si');
    setTipo(2);
  };
  return (
    <IonModal isOpen={isOpen}  onDidDismiss={onDismiss} >
    <IonHeader>
      <IonToolbar>
        <IonTitle>Registro de vendedor</IonTitle>
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
          <IonInput  value={nombre} label="Nombre del vendedor" labelPlacement="floating"  maxlength={300}  onIonInput={(e) =>{ setNombre(e.detail.value!);
                                                                                                                const value = e.detail.value || '';
                                                                                                                setIsValidN(value.trim() !== '');}}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Email" type="email" labelPlacement="floating"  maxlength={200}  onIonInput={(e) => {setUsername(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                setIsValidU(value.trim() !== '');}}></IonInput>
          <IonIcon icon={arrowForward } />
          <IonInput label="Password" type="tel" labelPlacement="floating"  maxlength={25}  onIonInput={(e) => {setPassword(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                setIsValidPass(value.trim() !== '');}}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
              <IonSelect label="Estatus" value={activo} onIonChange={(e:any) =>{setActivo(e.detail.value!)
                                                                                        const value = e.detail.value || '';
                                                                                        setIsValidA(value.trim() !== '');}}>
                <IonSelectOption value="si">Activo</IonSelectOption>
                <IonSelectOption value="no">Inactivo</IonSelectOption>
            </IonSelect>
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

export default AltaVendedor;
