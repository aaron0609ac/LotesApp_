import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonButton, IonIcon, IonInput, IonLabel, IonSearchbar, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { trash, pencil } from 'ionicons/icons';
import AltaVendedor from './AltaVendedor';
import EditarVendedor from './EditarVendedor';
import { Link } from 'react-router-dom';
import './Vendedores.css';
const Vendedores: React.FC = () => {
  const [clients, setClients] = useState([
    { id: 0, nombre: '' },
    // Add more client objects here
  ]);
  const [IdVendedor, setIdVendedor] = useState(0);
  const [Nombre, setNombre] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Activo, setActivo] = useState('');
  const [Tipo, setTipo] = useState('2');
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [IdAdministrador, setIdAdministrador] = useState('');
  
  //setIdAdministrador(localStorage.getItem('authToken') ?? '');

  useEffect(() => {
    // Fetch client data from your PHP backend
    fetch('https://lotes.cocinasdalloway.com/components/sellers/getAll.php?id='+localStorage.getItem('authToken'), {
      method: 'GET'})
      .then((response) => response.json())
      .then((data) => {
        setClients(data.data)
        })
      .catch((error) => alert('Error al obtener clientes:'+ error));

     
  }, []);
  const refreshList = async () => {
    // Fetch client data from your PHP backend
    await fetch('https://lotes.cocinasdalloway.com/components/sellers/getAll.php?id='+localStorage.getItem('authToken') , {
      method: 'GET'})
      .then((response) => response.json())
      .then((data) => {
        setClients(data.data)
        })
      .catch((error) => alert('Error al obtener clientes:'+ error));
  };
  const handleDelete = (IdVendedor: number) => {
    // Send a DELETE request to your PHP backend to delete the client by ID
    fetch(`https://lotes.cocinasdalloway.com/components/sellers/delete.php?id=${IdVendedor}`, {
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

    
      await fetch(`https://lotes.cocinasdalloway.com/components/sellers/getBy.php?q=${query}&id=${localStorage.getItem('authToken') }`,{
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
  
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
   refreshList()
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
                Alta Vendedor
              </IonButton>
              <IonSearchbar
              value={searchTerm}
              onIonInput={handleSearch}
              placeholder="Buscar vendedor">
                </IonSearchbar>
              <IonList>
              
                {clients.map((client: any) => (
                  <IonItem key={client.id}>
                    <IonLabel>{client.nombre} - {client.username}</IonLabel>
                    <Link to={`./VendedoresDetalle/${client.id}`}>
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
            <AltaVendedor 
              isOpen={showModal} 
              onDismiss={closeModal} /> 
            <EditarVendedor 
              isOpen={showModal1} 
              onDismiss={closeModal1}
                    Nombre={Nombre} 
                    Email={Email} 
                    Password={Password} 
                    Activo={Activo}
                    Tipo={Tipo}
                    IdAdministrador={IdAdministrador}
                    IdVendedor={IdVendedor}/> 
    
    
  </div>   
  
  );
};

export default Vendedores;
