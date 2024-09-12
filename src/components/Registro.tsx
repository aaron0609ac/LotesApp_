import React, { useState } from 'react';
import { IonContent, IonInput, IonButton,setupIonicReact,IonApp,
  IonHeader, IonTitle, IonToolbar,IonRow,IonCol,IonIcon,IonToast, IonLoading } from '@ionic/react';

import { personCircle } from "ionicons/icons";
import './Registro.css';
import { Link } from 'react-router-dom';
setupIonicReact();

const Registro: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
 

  const handleCreate = async() => {
    if (loading) {
      // Prevent multiple clicks while a request is in progress
      return;
    }
    const data = { nombre, username, password };
    try{
      setLoading(true); // Start loading
    // Send the login request to the backend
    const response = await fetch('https://lotes.cocinasdalloway.com/components/users/create.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      // Handle successful login
      const result = await response.json();
      //console.log(result.message);
      setIsOpen1(true);
      //window.location.href = './page/Login';
      setNombre('');
      setPassword('');
      setUsername('');
    } else {
      // Handle login error
      const result = await response.json();
      const result1=JSON.stringify(result);
      setIsOpen(true);
      alert(result.message);
    }

  } catch (error) {
    console.error('Error:', error);
    // Handle login error

  } finally {
    setLoading(false); // Stop loading whether successful or not
  }
  
  };

 
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
          <IonContent className="login-form">
        <IonRow>
        
        <IonCol>
            <div className="login-form1">
            <IonIcon
              style={{ fontSize: "70px", color: "#0040ff" }}
              icon={personCircle}
            />
           
              <IonInput className="ion-margin-top ion-padding-top"
              label="Nombre"
                 fill="solid"
                type="text"
                label-placement="floating"
                value={nombre}
                onIonInput={(e) => setNombre(e.detail.value!)}
              />
             
              <IonInput className="ion-margin-top ion-padding-top"
              label="Email"
                 fill="solid"
                type="text"
                label-placement="floating"
                value={username}
                onIonInput={(e) => setUsername(e.detail.value!)}
              />
             
              <IonInput className="ion-margin-top ion-padding-top"
              label="Password"
               fill="solid"
               label-placement="floating"
                type="password"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value!)}
              />
              <br/>
              <IonButton   shape="round" expand="full" onClick={handleCreate}>
                Crear usuario
              </IonButton>
              <IonLoading isOpen={loading} message="Creando..." /> 
              <Link to={`../Login/`}><p>Regresar</p></Link>
            </div>
            </IonCol>
        </IonRow>
            <IonToast
          isOpen={isOpen}
          message="Error, no se pudo crear usuario"
          onDidDismiss={() => setIsOpen(false)}
          duration={3000}
          color={'danger'}
        ></IonToast>
        <IonToast
          isOpen={isOpen1}
          message="Usuario creado con exito, inicia sesion para validar tu cuenta"
          onDidDismiss={() => setIsOpen1(false)}
          duration={3000}
          color={'success'}
        ></IonToast>
          </IonContent>
    </IonApp>
  );
};

export default Registro;
