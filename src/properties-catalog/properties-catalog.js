import React from 'react';
import ReactDom from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';

import { App } from './components/app/app.jsx';

const rootNode = document.querySelector('#properties-catalog');
const root = ReactDom.createRoot(rootNode);
const cookiesDefaultOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
}

root.render(
    <React.StrictMode>
        <CookiesProvider defaultSetOptions={cookiesDefaultOptions}>
            <App />
        </CookiesProvider>
    </React.StrictMode>
); 