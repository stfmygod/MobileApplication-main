import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { isEmpty } from 'lodash-es';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { IonContent, IonPage } from '@ionic/react';

import { FormControlLabel, Checkbox, TextField, Button } from '@material-ui/core';
import { DatePicker } from '@mui/lab';

import { RootState } from 'store';
import { addUpdateProduct, Product } from 'store/product/products';
import { addEditProduct } from 'shared/api';

type AddProps = {
  id: string;
};

const Add: React.FC = () => {
  const [initialValues, setInitialValues] = useState<Product | null>();
  const { id } = useParams<AddProps>();
  const {
    products: { products },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const item = products?.find((it) => it.id === id);

    // if (!isEmpty(item)) {
    //   setInitialValues(item);
    // }
      setInitialValues(item);

  }, [id]);

  const handleSubmit = (values: any) => {
    const productToSubmit = {
      ...values,
      launchDate: values?.launchDate.format('L'),
      id: !isEmpty(initialValues) ? initialValues?.id || null : null,
    };

    addEditProduct(productToSubmit).then((res) => {
      if (!res || res?.status > 300) {
        dispatch(addUpdateProduct({ ...productToSubmit, needsUpdate: true }));
        return;
      }

      dispatch(addUpdateProduct({ ...res.product, needsUpdate: false }));
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      launchDate: moment(initialValues?.launchDate) || moment(),
      price: initialValues?.price || 0,
      isAvailable: initialValues?.isAvailable || false,
    },
    onSubmit: handleSubmit,
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="add-product">
          <div className="add-product__content">
            <h4 className="add-product__title">{isEmpty(initialValues) ? 'Add product' : 'Edit product'}</h4>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Name"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Rating"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
              <DatePicker
                label="Seen at"
                value={formik.values.launchDate}
                onChange={(newValue) => {
                  formik.setFieldValue('launchDate', newValue);
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
              <FormControlLabel
                control={<Checkbox />}
                onChange={formik.handleChange}
                label="Is seen at cinema"
                id="isAvailable"
                name="isAvailable"
                style={{ paddingLeft: '20px', paddingTop: '10px' }}
                checked={formik.values.isAvailable}
              />
              <Button color="primary" variant="contained" fullWidth type="submit">
                Save
              </Button>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Add;
