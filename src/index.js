import { createRoot } from "react-dom/client";
import App from './components/app/app.js';
import './index.css'

// store
import { Provider } from 'react-redux';
import { store } from './services/reducers/index';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={ store }>
    <App />
  </Provider>
);