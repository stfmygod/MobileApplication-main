import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { IonContent, IonPage, IonCard, IonIcon, IonFab, IonButton, IonInfiniteScroll, IonInfiniteScrollContent, IonImg } from '@ionic/react';
import { arrowForwardCircle, addCircle, addOutline, glasses, glassesOutline } from 'ionicons/icons';

import { ROUTES } from 'shared/js';
import { RootState } from 'store';
import { increaseSearchpage, setSearchFilter } from 'store/data/data';
import { useFormik } from 'formik';
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { iconClasses } from '@mui/material';
import { blue } from '@mui/material/colors';

export type SearchForm = {
  title: string;
  isAscending: boolean;
};

const Home: React.FC = () => {
  const {
    products: { products },
    data: { searchParams },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLoadMore = (event: CustomEvent<void>) => {
    dispatch(increaseSearchpage());
    try {
      (event.target as HTMLIonInfiniteScrollElement).complete();
    } catch (error) {}
  };

  const handleSubmit = (values: SearchForm) => {
    dispatch(setSearchFilter({ title: values?.title, isAscending: values?.isAscending }));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: searchParams.filterTitle || '',
      isAscending: searchParams.isAscending,
    },
    onSubmit: handleSubmit,
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="home">
          <div className="home__content">
            <h4 className="home__title">Search</h4>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <Button color="primary" variant="contained" fullWidth type="submit">
                Search
              </Button>
            </form>
          </div>
          {products?.map((pr, idx) => (
            <IonCard key={idx} onClick={() => history.push(`/${ROUTES.product}/${pr.id}`)} button routerDirection="forward">
              <h3>{pr.title}</h3>
              <span className="home-price">{pr.price}</span>
              <div className="home-icon">
                <IonIcon icon={glassesOutline} size="large" />
              </div>
            </IonCard>
          ))}

          <IonInfiniteScroll threshold="100px" onIonInfinite={(e: CustomEvent<void>) => handleLoadMore(e)}>
            <IonInfiniteScrollContent loadingText={'Loading more data'} />
          </IonInfiniteScroll>
        </div>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonButton className="floating-btn" onClick={() => history.push(`/${ROUTES.add}`)}>
            <IonIcon className="floating-btn-icon" icon={addCircle} size="large"/>
          </IonButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
