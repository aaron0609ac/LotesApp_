import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonButton, IonIcon, IonInput, IonLabel, IonSearchbar, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { trash, pencil,mapOutline, analyticsSharp, location } from 'ionicons/icons';
import FraccionamientoAlta from './FraccionamientoAlta';
import EditarVendedor from './EditarVendedor';
import { Link } from 'react-router-dom';
import './Fraccionamientos.css';
const Fraccionamientos: React.FC = () => {
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
    fetch('https://lotes.cocinasdalloway.com/components/colonias/getAll.php?id='+localStorage.getItem('authToken'), {
      method: 'GET'})
      .then((response) => response.json())
      .then((data) => {
        setClients(data.data)
        })
      .catch((error) => alert('Error al obtener fraccionamientos:'+ error));

     
  }, []);
  const refreshList = async () => {
    // Fetch client data from your PHP backend
    await fetch('https://lotes.cocinasdalloway.com/components/colonias/getAll.php?id='+localStorage.getItem('authToken') , {
      method: 'GET'})
      .then((response) => response.json())
      .then((data) => {
        setClients(data.data)
        })
      .catch((error) => alert('Error al obtener fraccionamientos:'+ error));
  };
  const handleDelete = (IdColonia: number) => {
    // Send a DELETE request to your PHP backend to delete the client by ID
    fetch(`https://lotes.cocinasdalloway.com/components/colonias/delete.php?id=${IdColonia}`, {
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

    
      await fetch(`https://lotes.cocinasdalloway.com/components/colonias/getBy.php?q=${query}&id=${localStorage.getItem('authToken') }`,{
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
      .catch((error) =>  alert('Error al buscar fraccionamiento:'+ error));
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
                Alta Fraccionamiento
              </IonButton>
              <IonSearchbar
              value={searchTerm}
              onIonInput={handleSearch}
              placeholder="Buscar fraccionamiento">
                </IonSearchbar>
              <IonList>
              
                {clients.map((client: any) => (
                  <IonItem key={client.id}>
                    <IonLabel>{client.descripcion}</IonLabel>
                    <Link to={`./FraccionamientoDibujar/${client.id}`}>
                    <IonButton slot="end" color="warning">
                      <IonIcon icon={analyticsSharp} />
                    </IonButton>
                    </Link>
                    <Link to={`./FraccionamientoDetalle/${client.id}`}>
                    <IonButton slot="end" >
                      <IonIcon icon={pencil} />
                    </IonButton>
                    </Link>
                    <Link to={`./FraccionamientoCoordenadas/${client.id}`}>
                    <IonButton slot="end" color="success">
                      <IonIcon icon={mapOutline} />
                    </IonButton>
                    </Link>
                    <Link to={`./FraccionamientoMap/${client.id}`}>
                    <IonButton color="success" slot="end" >
                      <IonIcon icon={location} />
                    </IonButton>
                    </Link>
                    <IonButton slot="end" color="danger" onClick={() => handleDelete(client.id)}>
                      <IonIcon icon={trash} />
                    </IonButton>
                    
                  </IonItem>
                ))}
            </IonList>   
            <FraccionamientoAlta 
              isOpen={showModal} 
              onDismiss={closeModal} /> 
  </div>   
  
  );
};

export default Fraccionamientos;
