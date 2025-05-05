"use client";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from '@/store/store';
import { ReactNode } from 'react';
 
interface WithStateProps {
  children: ReactNode;
}

const WithState: React.FC<WithStateProps> = ({ children }) => {

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
              {children}
            </PersistGate>
        </Provider>
      )
  }

export default WithState