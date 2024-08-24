import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonLabel,setupIonicReact,IonApp,IonSplitPane,
  IonHeader, IonTitle, IonToolbar,IonRow,IonCol,IonIcon,IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { personCircle } from "ionicons/icons";

import './Login.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
setupIonicReact();

const Login: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = async () => {
    // Send the login request to the backend
    
      // First, send a preflight OPTIONS request
      const optionsResponse = await fetch('https://lotes.cocinasdalloway.com/components/login/Login.php', {
        method: 'OPTIONS',
      });
setResponse(response)
      if (optionsResponse.ok) {

   await fetch('https://lotes.cocinasdalloway.com/components/login/Login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      mode: 'no-cors',
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data)
        // Handle the response from the PHP backend (e.g., authentication success or failure)
        if(typeof data.error !== 'undefined' && data.error !== null ){
          //alert(data.error);
          setIsOpen(true);
          console.log(data.error);
        }else{
          console.log(data)
          window.location.href = './page/Lotes';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }else{
      setIsOpen(true);
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
            <IonIcon
              style={{ fontSize: "70px", color: "#0040ff" }}
              icon={personCircle}
            />
          </IonCol>
        </IonRow>
            <div className="login-form">
            <br/>
              <IonLabel position="floating">Email</IonLabel>
              <br/>
              <IonInput
                type="text"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
              />
              <br/>
              <IonLabel position="floating">Password</IonLabel>
              <br/>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
              <IonButton expand="full" onClick={handleLogin}>
                Login
              </IonButton>
            </div>
            <IonToast
          isOpen={isOpen}
          message={response}
          onDidDismiss={() => setIsOpen(false)}
          duration={5000}
        ></IonToast>
          </IonContent>
    </IonApp>
  );
};

export default Login;
