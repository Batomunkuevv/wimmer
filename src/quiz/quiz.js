import React from 'react';
import ReactDom from 'react-dom/client';

import { App } from './components/app/app.jsx';

const rootNode = document.querySelector('#quiz');
const root = ReactDom.createRoot(rootNode);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
); 