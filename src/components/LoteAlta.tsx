import React, {useState,useEffect} from 'react';
import './LoteAlta.css';
import { IonModal, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader,IonItem,IonList,IonSelect,IonSelectOption,IonInput } from '@ionic/react';
import { arrowForward  } from 'ionicons/icons';
const LoteAlta: React.FC<{
  isOpen: boolean;
  onDismiss: () => void;
}> = ({isOpen,  onDismiss}) => {
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
  ////setIdAdministrador(localStorage.getItem('authToken') ?? '');
  const IdUsuario = localStorage.getItem('authToken');
  useEffect(() => {
    // Read the value from localStorage when the component mounts
    const storedData = localStorage.getItem('authToken');
   
      // Fetch client data from your PHP backend
      fetch('https://lotes.cocinasdalloway.com/components/colonias/getAll.php?id='+localStorage.getItem('authToken'), {
        method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
          setColonias(data.data)
          })
        .catch((error) => alert('Error al obtener las colonias:'+ error));
  }, []);
  
  const handleSubmit = () => {
    
    // Send a POST request to the PHP backend to insert client data
    fetch('https://lotes.cocinasdalloway.com/components/data/create.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, estatus, colonia, costo, E1Lt, E1Ln, E2Lt, E2Ln, E3Lt, E3Ln, E4Lt, E4Ln, IdUsuario, activo}),
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
    .catch((error) =>  alert('Error al crear el lote:'+ error));
  };
  const clearForm = () => {
    setNombre('');
    setEstatus('');
    setColonia('');
    setCosto('');
    setE1Lt('');
    setE1Ln('');
    setE2Lt('');
    setE2Ln('');
    setE3Lt('');
    setE3Ln('');
    setE4Lt('');
    setE4Ln('');
  
  };
  return (
    <IonModal isOpen={isOpen}  onDidDismiss={onDismiss} >
    <IonHeader>
      <IonToolbar>
        <IonTitle>Alta de lote</IonTitle>
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
          <IonInput label="Esquina 1 Latitud" value={E1Lt} labelPlacement="stacked"  maxlength={25}  onIonInput={(e) => {setE1Lt(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
                                                                                                                <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 1 Longitud" value={E1Ln} labelPlacement="stacked"  maxlength={25}  onIonInput={(e) => {setE1Ln(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 2 Latitud" value={E2Lt} labelPlacement="stacked"  maxlength={25}  onIonInput={(e) => {setE2Lt(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
                                                                                                                <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 2 Longitud" value={E2Ln} labelPlacement="stacked"  maxlength={25}  onIonInput={(e) => {setE2Ln(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 3 Latitud" value={E3Lt} labelPlacement="stacked"  maxlength={25}  onIonInput={(e) => {setE3Lt(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
                                                                                                                <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 3 Longitud" value={E3Ln} labelPlacement="stacked"  maxlength={25}  onIonInput={(e) => {setE3Ln(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
          </IonItem>
          <IonItem >
          <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 4 Latitud" value={E4Lt} labelPlacement="stacked"  maxlength={25}  onIonInput={(e) => {setE4Lt(e.detail.value!)
                                                                                                                const value = e.detail.value || '';
                                                                                                                }}></IonInput>
                                                                                                                <IonIcon icon={arrowForward } />
          <IonInput label="Esquina 4 Longitud" value={E4Ln} labelPlacement="stacked"  maxlength={25}  onIonInput={(e) => {setE4Ln(e.detail.value!)
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
        
        <IonButton className="ion-text-right" onClick={onDismiss}>Cerrar</IonButton>
        <IonButton className="ion-text-right" onClick={handleSubmit}>Crear</IonButton>
      </IonCardContent>
      
    </IonCard>
      
      
    </IonContent>
  </IonModal>
  );
};

export default LoteAlta;
