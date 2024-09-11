import React, { useEffect,useState } from 'react';
import { IonContent, IonInput, IonButton, IonLabel,setupIonicReact,IonApp,
  IonHeader, IonTitle, IonToolbar,IonRow,IonCol,IonIcon,IonToast, IonLoading,IonCard  } from '@ionic/react';

import { personCircle } from "ionicons/icons";
import './Login.css';
import { Link } from 'react-router-dom';
setupIonicReact();

const Login: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
 

  const handleLogin = async() => {
    if (loading) {
      // Prevent multiple clicks while a request is in progress
      return;
    }
    const data = { username, password };
    try{
      setLoading(true); // Start loading
    // Send the login request to the backend
    const response = await fetch('https://lotes.cocinasdalloway.com/components/login/Login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      // Handle successful login
      const result = await response.json();
      console.log(result.message);
      setIsOpen1(true);
      localStorage.setItem('authToken', result.id);
      localStorage.setItem('emailToken', result.username );
      localStorage.setItem('nameToken', result.nombre);
      window.location.href = './page/LotesRegistro';
    } else {
      // Handle login error
      const result = await response.json();
      const result1=JSON.stringify(result);
      setIsOpen(true);
      console.error('Login failed');
    }

  } catch (error) {
    console.error('Error:', error);
    // Handle login error

  } finally {
    setLoading(false); // Stop loading whether successful or not
  }
    /*
      .then((response) => response.json())
      .then((data) => {
        
        // Handle the response from the PHP backend (e.g., authentication success or failure)
        if(typeof data.error !== 'undefined' && data.error !== null ){
          //alert(data.error);
          setIsOpen(true);
          //console.log(data.error);
        }else{
          //console.log(data)
          // Store the token or user data in localStorage
          setIsOpen1(true);
          localStorage.setItem('authToken', data.id);
          localStorage.setItem('emailToken', data.username );
          localStorage.setItem('nameToken', data.nombre);
          window.location.href = './page/Lotes';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      */
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

  return (
    <IonApp >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

          <IonContent className="ion-padding">
          <div className="centered-card ">
          <IonCard color="light" className="centered-text vertically-centered-card" style={{width:"100%", height:"65%"}}>
          <div className="image-container">
          <img src="./assets/login.jpg" alt="LotesApp" />
        </div>
        <IonRow>
        <IonCol>
             {/* 
            <IonIcon
              style={{ fontSize: "70px", color: "#0040ff" }}
              icon={personCircle}
            />*/}
              
              <IonInput className="ion-margin-top ion-padding-top"
              fill="solid"
              label="Email"
              label-placement="floating"
                 
                type="text"
                value={username}
                onIonInput={(e) => setUsername(e.detail.value!)}
              />
              
              <IonInput className="ion-margin-top ion-padding-top"
              label="Password"
               fill="solid"
                type="password"
                label-placement="floating"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value!)}
              />
              <IonButton className="ion-margin-top ion-padding-top" shape="round" expand="full" onClick={handleLogin}>
                Login
              </IonButton>
              <IonLoading className="ion-margin-top ion-padding-top" isOpen={loading} message="Iniciando..." /> 
              <Link className="ion-margin-top ion-padding-top" to={`../Registro/`}><p>Crear una cuenta</p></Link>
            
            </IonCol>
        </IonRow>
        </IonCard>
        </div>
            <IonToast
          isOpen={isOpen}
          message="Usuario y/o contraseña incorrecta"
          onDidDismiss={() => setIsOpen(false)}
          duration={3000}
          color={'danger'}
        ></IonToast>
        <IonToast
          isOpen={isOpen1}
          message="Redirigiendo...."
          onDidDismiss={() => setIsOpen1(false)}
          duration={3000}
          color={'success'}
        ></IonToast>
        
          </IonContent>
    </IonApp>
  );
};

export default Login;
