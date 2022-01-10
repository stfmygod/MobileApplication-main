import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { IonContent, IonPage } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router';
import { login } from 'shared/api';
import { setToken } from 'auth';
import { ROUTES } from 'shared/js';
import { RootState } from 'store';
import { setAuthState } from 'store/user/user';

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { user } = useSelector((state: RootState) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isAuthenticated) {
      history.push(`/${ROUTES.home}`);
    }
  }, [user.isAuthenticated]);

  const handleSubmit = (values: LoginForm) => {
    login(values).then((res) => {
      if (!res || res.statusCode >= 300) {
        return;
      }
      const { accessToken } = res;

      dispatch(setAuthState({ email: values?.username, isAuthenticated: true }));
      setToken(accessToken);
    });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="login">
          <div className="login__content">
            <h4 className="login__title">Login</h4>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                autoComplete="off"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="off"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
