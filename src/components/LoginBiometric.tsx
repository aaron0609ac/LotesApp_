import React, { useEffect,useState } from 'react';
import { IonContent, IonInput, IonButton,setupIonicReact,IonApp,
  IonHeader, IonTitle, IonToolbar,IonRow,IonCol,IonIcon } from '@ionic/react';

import { personCircle, fingerPrintSharp } from "ionicons/icons";
import { FingerprintAIO } from "@awesome-cordova-plugins/fingerprint-aio";
import './LoginBiometric.css';
import { Link } from 'react-router-dom';
setupIonicReact();

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  
  
  
  
  const handleFingerprintAuth = () => {
    // Call FingerprintAIO plugin for authentication here
    FingerprintAIO.show(
      {
        description: 'Autenticacion con huella',
        fallbackButtonTitle: 'Use Backup Password',
      })
      .then(() => {
        // Authentication was successful
        window.location.href = './page/LotesRegistro';
        console.log('Fingerprint authentication successful');
      })
      .catch((error) => {
        // Authentication failed or was canceled
        alert('Fingerprint authentication failed:'+ error);
      });
  };

  const handleLogin = () => {
    // Send the login request to the backend
    const username=(localStorage.getItem('emailToken'));
    fetch('https://lotes.cocinasdalloway.com/components/login/Login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        // Handle the response from the PHP backend (e.g., authentication success or failure)
        if(typeof data.error !== 'undefined' && data.error !== null ){
          alert(data.error);
        }else{
          //console.log(data)
          // Store the token or user data in localStorage
          localStorage.setItem('authToken', data.id);
          localStorage.setItem('emailToken', data.username);
          localStorage.setItem('nameToken', data.nombre);
          window.location.href = './page/LotesRegistro';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    
    // Disable the back button handler
    const disableBackButtonHandler = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    // Add an event listener to the window's popstate event
    window.addEventListener('popstate', disableBackButtonHandler);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', disableBackButtonHandler);
    };
  }, []);

  const storedData1 = localStorage.getItem('nameToken');

  
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
            <IonIcon
              style={{ fontSize: "70px", color: "#0040ff" }}
              icon={personCircle}
            />
          </IonCol>
        </IonRow>
        <IonRow>
        <IonCol>
            <div className="login-form">
              <IonTitle><b>Hola, </b><br />{storedData1}</IonTitle>
              <br/>
              <IonInput
              fill="solid"
                type="password"
                onIonInput={(e) => setPassword(e.detail.value!)}
              />
              <IonButton expand="full" onClick={handleLogin}>
                Iniciar con contraseña
              </IonButton>
              <br/>
              <Link to={`./Login/`}>
              <p>Iniciar con otra cuenta</p>
              </Link>
              <br/>
              <IonIcon
              style={{ fontSize: "70px", color: "#0040ff" }}
              icon={fingerPrintSharp}
              onClick={handleFingerprintAuth}
            />
              
          <p>Toque el sensor para iniciar sesion</p>

            </div>
            </IonCol>
        </IonRow>
           
          </IonContent>
    </IonApp>
  );
};

export default Login;
