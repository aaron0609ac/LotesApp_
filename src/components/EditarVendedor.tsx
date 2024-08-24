import React, {useState, useEffect} from 'react';
import './EditarVendedor.css';
import { IonModal, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader,IonItem,IonList,IonSelect,IonSelectOption,IonInput } from '@ionic/react';
import { personCircle,arrowForward  } from 'ionicons/icons';
const AltaCliente: React.FC<{
  isOpen: boolean;
  onDismiss: () => void;
  Nombre:string; 
  Email:string; 
  Password:string; 
  Activo:string; 
  Tipo:string;
  IdAdministrador:string;
  IdVendedor:number; 
}> = ({isOpen,  onDismiss, Nombre, Email, Password, Activo, Tipo, IdAdministrador, IdVendedor}) => {
  
  
  const nombre=(Nombre);
  const email=(Email);
  const password=(Password);
  const activo=(Activo);
  const tipo1=(Tipo);
  const idadministrador=(IdAdministrador);
  const idvendedor=(IdVendedor);

  const [nombre1, setNombreM] = useState(Nombre);
  const [email1, setEmail] = useState(Email);
  const [password1, setPassword] = useState(Password);
  const [activo1, setActivo] = useState(Activo);
 
  const handleSubmit = () => {

    const nombrev = Nombre!==nombre1 && nombre1!=='' ? nombre1 : Nombre;
    const emailv = Email!==email1 && email1!=='' ? email1 : Email;
    const passwordv = Nombre!==password1 && password1!=='' ? password1 : Password;
    const activov = Activo!==activo1 && activo1!=='' ? activo1 : Activo;
    // Send a POST request to the PHP backend to insert client data
    console.log(nombrev)
    console.log(emailv)
    console.log(passwordv)
    console.log(activov)
    console.log(tipo1)
    console.log(idadministrador)
    console.log(idvendedor)
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
        
      } else {
        alert('Error:' + data.message);
      }
})
    .catch((error) =>  alert('Error al eliminar cliente:'+ error));
    
  };
 
  return (
    
    <IonModal isOpen={isOpen}  onDidDismiss={onDismiss} >
    <IonHeader>
      <IonToolbar>
        <IonTitle>Editar de vendedor</IonTitle>
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
          <IonInput label="Nombre del cliente" value={Nombre} labelPlacement="floating"  maxlength={300}  onIonInput={(e) => setNombreM(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Email" type="email" value={email}  labelPlacement="floating"  maxlength={200}  onIonInput={(e) => setEmail(e.detail.value!)}></IonInput>
          <IonIcon icon={arrowForward } />
          <IonInput label="Password" value={password}  labelPlacement="floating"  maxlength={30}  onIonInput={(e) => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonSelect label="Estatus" value={'si'} onIonChange={(e:any) =>{setActivo(e.detail.value!)}}>
                <IonSelectOption value="si">Activo</IonSelectOption>
                <IonSelectOption value="no">Inactivo</IonSelectOption>
            </IonSelect> 
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
