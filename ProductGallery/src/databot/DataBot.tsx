import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ConnectionStatus, Network } from '@capacitor/network';
import { setNetworkStatus } from 'store/data/data';
import { RootState } from 'store';
import { addEditProduct, getProducts } from 'shared/api';
import { addProducts, addUpdateProduct, setProducts } from 'store/product/products';

const DataBot: React.FC = () => {
  const {
    data: {
      searchParams,
      network: { status },
    },
    user: { isAuthenticated },
    products: { products },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleNetworkStatusChange = (connectionStatus: ConnectionStatus) => {
    dispatch(setNetworkStatus(connectionStatus.connected));
  };

  const getCurrentNetworkStatus = async () => await Network.getStatus();

  useEffect(() => {
    // this useEffect takes care of network status change
    getCurrentNetworkStatus().then((status) => handleNetworkStatusChange(status));

    const handler = Network.addListener('networkStatusChange', handleNetworkStatusChange);

    return () => {
      handler.remove();
    };
  }, []);

  useEffect(() => {
    if (status) {
      products.forEach((prd) => {
        if (prd.needsUpdate) {
          addEditProduct(prd).then((res) => {
            if (!res || res?.status > 300) {
              return;
            }

            dispatch(addUpdateProduct({ ...res.produdct, needsUpdate: false }));
          });
        }
      });
    }
  }, [status]);

  useEffect(() => {
    // this useEffect takes care of getProducts api call
    if (isAuthenticated) {
      const filters = {
        title: searchParams.filterTitle,
        isAscending: searchParams.isAscending,
        pageNumber: searchParams.page,
      };

      getProducts(filters).then((res) => {
        if (!res || res?.status > 300) {
          return;
        }

        if (searchParams.page === 0) {
          dispatch(setProducts(res.products));
        } else {
          dispatch(addProducts(res.products));
        }
      });
    }
  }, [searchParams, isAuthenticated]);

  return <></>;
};

export default DataBot;
