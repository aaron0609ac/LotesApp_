import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonButton, IonIcon, IonInput, IonLabel, IonSearchbar, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { trash, pencil, location, shareOutline} from 'ionicons/icons';
import LoteAlta from './LoteAlta';
import { Link } from 'react-router-dom';
import './LotesRegistro.css';
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;
const LotesRegistro: React.FC = () => {
  const [clients, setClients] = useState([
    { id: 0, nombre: '' },
    // Add more client objects here
  ]);
 
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  
  //setIdAdministrador(localStorage.getItem('authToken') ?? '');

  useEffect(() => {
    // Fetch client data from your PHP backend
    fetch('https://lotes.cocinasdalloway.com/components/data/getAll.php?id='+localStorage.getItem('authToken'), {
      method: 'GET'})
      .then((response) => response.json())
      .then((data) => {
        setClients(data.data)
        })
      .catch((error) => alert('Error al obtener clientes:'+ error));

     
  }, []);
  const refreshList = async () => {
    // Fetch client data from your PHP backend
    await fetch('https://lotes.cocinasdalloway.com/components/data/getAll.php?id='+localStorage.getItem('authToken') , {
      method: 'GET'})
      .then((response) => response.json())
      .then((data) => {
        setClients(data.data)
        })
      .catch((error) => alert('Error al obtener clientes:'+ error));
  };
  const handleDelete = (IdLote: number) => {
    // Send a DELETE request to your PHP backend to delete the client by ID
    fetch(`https://lotes.cocinasdalloway.com/components/data/delete.php?id=${IdLote}`, {
      method: 'UPDATE',
    })
      .then((response) => response.json())
      .then((data)=>{
        if (data.status===200) {
          // Remove the deleted client from the list
          //const updatedClients = clients.filter((client) => client.id !== clientId);
          //setClients(updatedClients);
          refreshList();
          alert(data.message);
        } else {
          alert('Error:' + data.message);
        }
  })
      .catch((error) =>  alert('Error al eliminar cliente:'+ error));
  };
  const showModalCreate = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    refreshList();
  };
  
  const closeModal1 = () => {
    setShowModal1(false);
    refreshList();
  };
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = async (e:any) => {
    const query = e.detail.value;
    setSearchTerm(query);

    
      await fetch(`https://lotes.cocinasdalloway.com/components/data/getBy.php?q=${query}&id=${localStorage.getItem('authToken') }`,{
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      }).then((response) => response.json())
      .then((data)=>{
        if (data.status===200) {
          setClients(data.data)
        } else {
          alert('Error:' + data.message);
        }
  })
      .catch((error) =>  alert('Error al lote cliente:'+ error));
  };
  
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
   refreshList()
   setTimeout(() => {
    // Any calls to load data go here
    event.detail.complete();
  }, 2000);
  }
  async function shareLink(LoteID:any, Nombre:any, Descripcion:any) {
    try {
      await Share.share({
        title: 'Share Link',
        text: 'Revisa la ubicacion del lote: '+Nombre+" - "+Descripcion,
        url: 'https://lotes.cocinasdalloway.com/ClientArea/index.php?Id='+LoteID, // Replace with your link
      });
    } catch (error) {
      console.error('Error sharing link:', error);
    }
  }
  return (
    <div className="container">
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

              <IonButton expand="full"  onClick={() => (showModalCreate())}>
                Alta de lote
              </IonButton>
              <IonSearchbar
              value={searchTerm}
              onIonInput={handleSearch}
              placeholder="Buscar lote">
                </IonSearchbar>
              <IonList>
              
                {clients.map((client: any) => (
                  <IonItem key={client.id}>
                    <IonLabel>{client.nombre} - {client.descripcion}</IonLabel>
                    <IonButton onClick={() =>shareLink(client.id,client.nombre,client.descripcion)}> <IonIcon icon={shareOutline} /></IonButton>
                    <Link to={`./LoteDetalle/${client.id}`}>
                    <IonButton slot="end" >
                      <IonIcon icon={pencil} />
                    </IonButton>
                    </Link>
                    <Link to={`./LoteMap/${client.id}`}>
                    <IonButton color="success" slot="end" >
                      <IonIcon icon={location} />
                    </IonButton>
                    </Link>
                    <IonButton color="danger" slot="end"  onClick={() => handleDelete(client.id)}>
                      <IonIcon icon={trash} />
                    </IonButton>
                    
                  </IonItem>
                ))}
            </IonList>   
            <LoteAlta 
              isOpen={showModal} 
              onDismiss={closeModal} /> 
         
  </div>   
  
  );
};

export default LotesRegistro;
