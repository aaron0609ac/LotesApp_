import React, {useEffect,useState,Suspense} from 'react';
import './DetalleLote.css';
import { IonModal, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonImg } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader,IonItem,IonList,IonThumbnail,IonLabel,IonSelect, IonSelectOption, IonGrid, IonRow, IonCol } from '@ionic/react';
import { arrowForward,playCircleSharp,trash  } from 'ionicons/icons';
import FileUpload from "./FileUpload";
import axios from 'axios';
import MediaPopup from './MediaPopup';
const DetalleLote: React.FC<{
  isOpen: boolean;
  onDismiss: () => void;
  IdLote: number;
  Nombre: string;
  Colonia: string;
  Costo: string;
  Esq1: string;
  Esq2: string;
  Esq3: string;
  Esq4: string;
  Estatus: string;
  IdCl: number;
}> = ({ isOpen, onDismiss,IdLote,Nombre,Colonia,Costo,Esq1,Esq2,Esq3,Esq4,Estatus,IdCl}) => {
  const [clients, setClients] = useState([
    { id: 0, name: '' },
    // Add more client objects here
  ]);
  const [IdCliente, setIdClients] = useState(0);
  const [Estatus1, setEstatus] = useState(Estatus);
  const [NLote, setNLote] = useState(IdLote);
  const [uploadedFiles, setUploadedFiles] = useState([{ id: 0, name: '' }]);
  const [files, setFiles] = useState([{ name: '', tipo:'' }]);
  useEffect(() => {
    
    if(isOpen){
    setEstatus(Estatus)
    setIdClients(IdCl)
    setNLote(IdLote)
    // Fetch client data from your PHP backend
    fetch('https://lotes.cocinasdalloway.com/components/clients/getAll2Select.php', {
      method: 'GET'})
      .then((response) => response.json())
      .then((data) => {

        setClients(data.data)
        })
      .catch((error) => alert('Error al obtener clientes:'+ error));
      ListFiles()
      }
  }, [isOpen,Estatus,IdCl,IdLote]);

  const handleSubmit = () => {
    const idlote=IdLote;
  // Send a POST request to the PHP backend to insert client data
  
  fetch('https://lotes.cocinasdalloway.com/components/data/updateStatus.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Estatus1, IdCliente, idlote}),
  })
  .then((response) => response.json())
  .then((data)=>{
    if (data.status===200) {
      alert(data.message);
      //loadInfo();
    } else {
      alert('Error:' + data.message);
    }
})
  .catch((error) =>  alert('Error al actualizar cliente:'+ error));
  
};
const handleClientChange = (e:any) => {
  // 'e.target.value' contains the selected client, not the 'clients' array
  setIdClients(e.target.value);
};
const handleUpload = (files: (string | Blob)[]) => {
  const formData = new FormData();
 
  formData.append("file", files[0]);
  axios.post("https://lotes.cocinasdalloway.com/components/data/AddMultimedia.php?id="+NLote, formData)
  .then((response) => {
    if(response.status==200){
    if(response.data.status==200){
    // Manejar la respuesta del servidor, que podría contener información sobre el archivo guardado en MySQL
    //setUploadedFiles([...uploadedFiles, response.data]);
    ListFiles();
    }else{
      alert('Error: '+response.data.message);
    }
    }else{
      alert('Error de conexion al servidor');
    }
  });

};

const ListFiles =() =>{
    if(NLote!=0){
      fetch("https://lotes.cocinasdalloway.com/components/data/dataMedia.php?id="+NLote, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((data)=>{
        if (data.status===200) {
          console.log(data.data);
          setFiles(data.data)
        } else {
          alert('Error:' + data.message);
        }
    })
      .catch((error) =>  alert('Error al listar los archivos:'+ error));
      
    }
    }
    const [popupOpen, setPopupOpen] = useState(false);
    const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
    const [mediaSrc, setMediaSrc] = useState('');
  
    const openPopup = (type: 'image' | 'video', src: string) => {
      setMediaType(type);
      setMediaSrc(src);
      setPopupOpen(true);
    }
    const Valida = (src: string) => {
      if(src=='image'){
        return true;
      }else{
        return false;
      }
    }
    const handleDeleteImage = async (nombre:string) => {
      
        // Send a request to your server to delete the image.
        fetch('https://lotes.cocinasdalloway.com/components/data/deleteFile.php', {
          method: 'POST',
          body: JSON.stringify({ imageId: nombre, IdLote : NLote}),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json())
        .then((data)=>{
          if (data.status===200) {
            alert(data.message);
            ListFiles()
          } else {
            alert('Error:' + data.message);
          }
      }).catch((error) =>  alert('Error al eliminar el archivo:'+ error));
       
     
    }
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss} >
      <Suspense fallback={<div>Loading...</div>}></Suspense>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Detalle del Lote</IonTitle>
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
          <IonItem>
          <IonIcon icon={arrowForward } />
            <IonLabel><p>Nombre del Lote: </p>{Nombre}</IonLabel>
            <IonIcon icon={arrowForward } />
            <IonLabel><p>Colonia:</p> {Colonia}</IonLabel>
          </IonItem>

          

          <IonItem>
          <IonIcon icon={arrowForward } />
            <IonLabel><p>Costo:</p> {Costo}</IonLabel>
           <IonIcon icon={arrowForward } />
            <IonLabel><p>Estatus:</p> 
              <IonSelect label="Estatus" value={Estatus1} onIonChange={(e:any) =>{setEstatus(e.detail.value!)}}>
                <IonSelectOption value="Pendiente">Pendiente</IonSelectOption>
                <IonSelectOption value="Vendido">Vendido</IonSelectOption>
            </IonSelect>
            </IonLabel>
          </IonItem>
          <IonItem>
          <IonLabel><p>Cliente:</p> 
          <IonSelect
          label="Cliente"
          interface="action-sheet"
          placeholder="Seleccione cliente"
          value={IdCliente}
          onIonChange={handleClientChange}
        >
          <IonSelectOption value="">Ninguno</IonSelectOption>
          {clients.map((client: any) => (
          <IonSelectOption key={client.id} value={client.id}>{client.name}</IonSelectOption>
          ))}
          
        </IonSelect>
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <IonLabel><p>Ubicacion:<br /> Izq.Sup: {Esq1} - Der.Sup: {Esq2}<br /> Der.Inf: {Esq3} - Izq.Inf: {Esq4} </p></IonLabel>
          </IonItem>
          
          <IonItem lines="none">
          <div className="dropzone">
            <FileUpload onUpload={handleUpload}  />
            
          </div>
          </IonItem>
          <IonItem lines="none">
          <IonGrid>
          {files && files.length > 0 ? (
            <IonRow className="ion-text-center center-content ion-text-center">
              {files.map((file,index) => (
                     <IonCol key={index} size="auto" className="ion-text-center center-content">
                      { Valida(file.tipo) ? (
                        <IonImg className="center-image" style={{width:'100px', height:'100px'}} 
                        onClick={() => openPopup(file.tipo === 'video' ? 'video' : 'image', `https://lotes.cocinasdalloway.com/Images/${NLote}/${file.name}`)}  
                        src={`https://lotes.cocinasdalloway.com/Images/${NLote}/${file.name}`} />
                       ) : (
                        <IonIcon icon={playCircleSharp} color="danger" style={{width:'100px', height:'100px'}} 
                        onClick={() => openPopup(file.tipo === 'video' ? 'video' : 'image', `https://lotes.cocinasdalloway.com/Images/${NLote}/${file.name}`)}   />
                       )}
                       <IonIcon
                          icon={trash}
                          style={{ fontSize: '25px', color: 'red', position: 'absolute', top: '10px', right: '10px' }}
                          onClick={() =>handleDeleteImage(file.name)}
                        />
                       </IonCol> 
                    
                ))}
              </IonRow>
          ) : (
            <div>No se han cargado archivos aun.</div>
          )}
          </IonGrid>
          </IonItem>
        </IonList>
        <IonButton className="ion-text-right" onClick={onDismiss}>Cerrar</IonButton>
        <IonButton shape="round" color="success" className="ion-text-right" onClick={handleSubmit}>Guardar Cambios</IonButton>
        <MediaPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} mediaType={mediaType} mediaSrc={mediaSrc} />
      </IonCardContent>
      
    </IonCard>
      
    
    </IonContent>
  </IonModal>
  );
};

export default DetalleLote;
