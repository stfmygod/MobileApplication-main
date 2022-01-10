import ReactDOM from 'react-dom';

// PWA Elements for Camera to work in web
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Date Adapter for DatePicker
import AdapterDateMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// React Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// persistor
import { store, persistor } from './store';

// App root component
import App from './App';

const container = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={() => {}} persistor={persistor}>
      <LocalizationProvider dateAdapter={AdapterDateMoment}>
        <App />
      </LocalizationProvider>
    </PersistGate>
  </Provider>,
  container
);

defineCustomElements(window);
