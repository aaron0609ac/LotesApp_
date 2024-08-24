import React, {useState, useEffect} from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './components/Login';
import ExitHandler from './ExitHandler';
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
import VendedoresDetalle from './components/VendedoresDetalle';
import ClientesDetalle from './components/ClientesDetalle';
import LoteDetalle from './components/LoteDetalle';
import FraccionamientoDetalle from './components/FraccionamientoDetalle';
import FraccionamientoCoordenadas from './components/FraccionamientoCoordenadas';
import LoteMap from './components/LoteMap';
import FraccionamientoMap from './components/FraccionamientoMap';
import FraccionamientoDibujar from './components/FraccionamientoDibujar';
setupIonicReact();
const App: React.FC = () => {
  const shouldShowMenu = window.location.pathname !== '/page/Login';
  const shouldShowMenu1 = window.location.pathname !== '/';
  const shouldShowMenu2 = window.location.pathname !== '/page/LoginBiometric';
  const shouldShowMenu4 = window.location.pathname !== '/LoginBiometric';
  const shouldShowMenu3 = window.location.pathname !== '/page/Registro/';

  const [userLoggedIn, setUserLoggedIn] = useState(true); // Cambia a `false` cuando el usuario cierra sesión
  const [idleTimeout, setIdleTimeout] = useState(0);
  const [redirectToLogin, setRedirectToLogin] = useState(false); // Estado para redirigir al usuario
  
  /* 
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Set a timeout for 2 minutes (120,000 milliseconds)
    timeout = setTimeout(() => {
      setRedirectToLogin(false);
    }, 120000); // 2 minutes

    // Clear the timeout when the user interacts with the app
    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setRedirectToLogin(false);
      }, 120000); // 2 minutes
    };

    window.addEventListener('mousedown', resetTimeout);
    window.addEventListener('keydown', resetTimeout);

    return () => {
      window.removeEventListener('mousedown', resetTimeout);
      window.removeEventListener('keydown', resetTimeout);
    };
  }, []);
  */

  return (
    
    <IonApp>
      <IonReactRouter>
      
        <IonSplitPane contentId="main" >
        {shouldShowMenu && shouldShowMenu1 && shouldShowMenu2 && shouldShowMenu3 && shouldShowMenu4 &&( <Menu />)}
          <IonRouterOutlet id="main">
        
         
            <Route path="./components/Login" component={Login} exact />
            <Route path="/" exact={true}>
              <Redirect to="/page/Login" />
            </Route>
            <Route path="/LoginBiometric" exact={true}>
              <Redirect to="/page/LoginBiometric" />
            </Route>
            <Route path="/Registro" exact={true}>
              <Redirect to="/page/Registro" />
            </Route>
            <Route path="/page/:name" exact={true}>
              <Page />
            </Route>
            <Route path="/page/VendedoresDetalle/:idVe" component={VendedoresDetalle} />
            <Route path="/page/ClientesDetalle/:idCl" component={ClientesDetalle} />
            <Route path="/page/LoteDetalle/:id" component={LoteDetalle} />
            <Route path="/page/FraccionamientoDetalle/:id" component={FraccionamientoDetalle} />
            <Route path="/page/FraccionamientoCoordenadas/:id" component={FraccionamientoCoordenadas} />
            <Route path="/page/LoteMap/:id" component={LoteMap} />
            <Route path="/page/FraccionamientoMap/:id" component={FraccionamientoMap} />
            <Route path="/page/FraccionamientoDibujar/:id" component={FraccionamientoDibujar} />
          </IonRouterOutlet>
        </IonSplitPane>
        {redirectToLogin ? (
              //<Redirect to="/page/Lotes" />
                   // Redirige al usuario a la página de inicio de sesión
                   <Redirect to="/page/LoginBiometric" />) : null }
           
      </IonReactRouter>
      
    </IonApp>
    
  );
};

export default App;
