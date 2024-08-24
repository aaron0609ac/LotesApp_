import React from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonButton
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { heartOutline, heartSharp, mailOutline, mailSharp,
   paperPlaneOutline, paperPlaneSharp, trashOutline, 
   trashSharp, warningOutline, warningSharp, mapOutline, locationOutline,
  navigateCircleOutline, peopleOutline, trendingUpOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}
const appPages: AppPage[] = [
  
  {
    title: 'Registro de lotes',
    url: '/page/LotesRegistro',
    iosIcon: locationOutline,
    mdIcon: locationOutline
  },
  {
    title: 'Registro de fraccionamientos',
    url: '/page/Fraccionamientos',
    iosIcon: navigateCircleOutline,
    mdIcon: navigateCircleOutline
  },
  {
    title: 'Clientes',
    url: '/page/Clientes',
    iosIcon: peopleOutline,
    mdIcon: peopleOutline
  },
  {
    title: 'Vendedores',
    url: '/page/Vendedores',
    iosIcon: trendingUpOutline,
    mdIcon: trendingUpOutline
  }
];
/*
{
    title: 'Lotes',
    url: '/page/Lotes',
    iosIcon: mapOutline,
    mdIcon: mapOutline
  },
{
    title: 'Login',
    url: '/page/Login',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
*/

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  const handleLogout = () => {
   
    //localStorage.removeItem('authToken');
    //history.push("./Login",{ noMenu: true });
    // Redirect the user to the login page
    window.location.href = './LoginBiometric';
    
  };

  const NombreUsuario=localStorage.getItem('nameToken');
  const EmailUsuario=localStorage.getItem('emailToken');
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{NombreUsuario}</IonListHeader>
          <IonNote>{EmailUsuario}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        <IonButton shape="round" expand="full" onClick={handleLogout}>
                Logout
              </IonButton>
        </IonList>

        
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
