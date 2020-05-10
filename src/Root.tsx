import React from 'react';
import App from './App';
import { CookiesProvider } from 'react-cookie';

/**
 * @deprecated
 * Pretty sure this component is not used
 */
export default function Root() {
  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
}

