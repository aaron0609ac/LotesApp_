import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonButton, IonIcon, IonInput, IonLabel, IonSearchbar,IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { trash, pencil } from 'ionicons/icons';
import AltaCliente from './AltaCliente';
import EditarCliente from './EditarCliente';
import './Clientes.css';
import { Link } from 'react-router-dom';
const Clientes: React.FC = () => {
  const [clients, setClients] = useState([
    { id: 0, nombre: '' },
    // Add more client objects here
  ]);
 
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    // Fetch client data from your PHP backend
    fetch('https://lotes.cocinasdalloway.com/components/clients/getAll.php?id='+localStorage.getItem('authToken'), {
      method: 'GET'})
      .then((response) => response.json())
      .then((data) => {
        setClients(data.data)
        })
      .catch((error) => alert('Error al obtener clientes:'+ error));

     
  }, []);
  const refreshList = async () => {
    // Fetch client data from your PHP backend
    await fetch('https://lotes.cocinasdalloway.com/components/clients/getAll.php?id='+localStorage.getItem('authToken'), {
      method: 'GET'})
      .then((response) => response.json())
      .then((data) => {
        setClients(data.data)
        })
      .catch((error) => alert('Error al obtener clientes:'+ error));
  };
  const handleDelete = (clientId: number) => {
    // Send a DELETE request to your PHP backend to delete the client by ID
    fetch(`https://lotes.cocinasdalloway.com/components/clients/delete.php?id=${clientId}`, {
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
 
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = async (e:any) => {
    const query = e.detail.value;
    setSearchTerm(query);

    
      await fetch(`https://lotes.cocinasdalloway.com/components/clients/getBy.php?q=${query}`,{
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
      .catch((error) =>  alert('Error al eliminar cliente:'+ error));
  };
  
  // refreshList();
   const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    refreshList();
    setTimeout(() => {
     // Any calls to load data go here
     event.detail.complete();
   }, 2000);
   }
  return (
    <div className="container">
       <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
              <IonButton expand="full"  onClick={() => (showModalCreate())}>
                Alta Cliente
              </IonButton>
              <IonSearchbar
              value={searchTerm}
              onIonInput={handleSearch}
              placeholder="Buscar cliente">
                </IonSearchbar>
              <IonList>
              
                {clients.map((client: any) => (
                  <IonItem key={client.id}>
                    <IonLabel>{client.nombre} - {client.email}</IonLabel>
                    <Link to={`./ClientesDetalle/${client.id}`}>
                    <IonButton slot="end" >
                      <IonIcon icon={pencil} />
                    </IonButton>
                    </Link>
                    <IonButton slot="end" color="danger" onClick={() => handleDelete(client.id)}>
                      <IonIcon icon={trash} />
                    </IonButton>
                  </IonItem>
                ))}
            </IonList>   
            <AltaCliente 
              isOpen={showModal} 
              onDismiss={closeModal} /> 
           
  </div>   
  
  );
};

export default Clientes;
