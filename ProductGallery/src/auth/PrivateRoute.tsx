import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getToken } from './helpers';
import { ROUTES } from 'shared/js';

type Props = {
  children: React.ReactNode;
  exact: boolean;
  [x: string]: any;
};

const PrivateRoute: React.FC<Props> = (props) => {
  const history = useHistory();

  useEffect(() => {
    getToken().then((res) => {
      const { value: token } = res;

      if (!token) {
        history.push(ROUTES.login);
      }
    });
  }, []);

  return <Route {...props}>{props.children}</Route>;
};

export default PrivateRoute;
