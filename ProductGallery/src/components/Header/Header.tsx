import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { wifiOutline, person, wifi, wifiSharp, stopCircle, stopCircleSharp, pauseSharp } from 'ionicons/icons';
import { setToken } from 'auth';
import { useHistory } from 'react-router';
import { ROUTES } from 'shared/js';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setAuthState } from 'store/user/user';

const Header: React.FC = () => {
  const {
    user,
    data: {
      network: { status },
    },
  } = useSelector((state: RootState) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAuthState({ email: '', isAuthenticated: false }));
    setToken('');
    history.push(`/${ROUTES.login}`);
  };

  return (
    <div className="header">
      {user.isAuthenticated && (
        <>
          <span className="header__name">{`App Ionic`}</span>
          <IonIcon icon={status ? wifi : pauseSharp} size="large" />
          <IonButton onClick={handleLogout}>
            <IonIcon icon={person} />
          </IonButton>
        </>
      )}
    </div>
  );
};

export default Header;
