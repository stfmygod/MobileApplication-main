import { Redirect, Route } from 'react-router-dom';
import { Switch } from 'react-router';

import { IonApp, IonRouterOutlet, IonTabBar, IonTabs, IonIcon, IonLabel, IonTabButton, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { arrowBack, home } from 'ionicons/icons';

import Login from './pages/Login';
import Home from './pages/Home';
import Header from 'components/Header';
import ProductDetail from 'pages/ProductDetail';
import PrivateRoute from 'auth';
import Add from 'pages/Add';
import DataBot from 'databot';

import { ROUTES } from 'shared/js';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

// default stylesheet
import './theme/style.scss';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>

      <IonContent has-header>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
              <Route exact path={`/:tab(${ROUTES.login})`}>
                <Login />
              </Route>
              <PrivateRoute exact path={`/:tab(${ROUTES.home})`}>
                <Home />
              </PrivateRoute>
              <PrivateRoute exact path={`/${ROUTES.product}/:id`}>
                <ProductDetail />
              </PrivateRoute>
              <PrivateRoute exact path={`/${ROUTES.add}/:id`}>
                <Add />
              </PrivateRoute>
              <Route exact path="/">
                <Redirect to={ROUTES.login} />
              </Route>
            </Switch>
          </IonRouterOutlet>
          <IonTabBar slot="top" color="black">
            <IonTabButton tab="home" href={`/${ROUTES.home}`}>
              <IonLabel>Home</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonContent>
      <Header />
    </IonReactRouter>
    <DataBot />
  </IonApp>
);

export default App;
