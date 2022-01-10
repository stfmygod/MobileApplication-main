import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';

import MyMap from 'components/MyMap';
import { Button } from '@material-ui/core';
import { IonContent, IonImg, IonPage } from '@ionic/react';

import { Product } from 'store/product/products';
import { RootState } from 'store';
import { ROUTES } from 'shared/js';

type ProductDetailProps = {
  id: string;
};

const ProductDetail: React.FC = () => {
  const [item, setItem] = useState<Product>();
  const { id } = useParams<ProductDetailProps>();
  const {
    products: { products },
  } = useSelector((state: RootState) => state);
  const history = useHistory();

  useEffect(() => {
    const item = products?.find((it) => it.id === id);

    setItem(item);
  }, [id]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="product-detail">
          <h3 className="product-detail__title">{item?.title}</h3>
          <div className="product-detail__description">{item?.description}</div>
          <div className="product-detail__description">{item?.price}</div>
          <div className="product-detail__description">{item?.launchDate}</div>
          <div className="product-detail__description">{item?.isAvailable ? 'Is seen at cinema' : 'Seen at home'}</div>
          <Button color="primary" variant="contained" fullWidth onClick={() => history.push(`/${ROUTES.add}/${item?.id}`)}>
            Edit
          </Button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductDetail;
