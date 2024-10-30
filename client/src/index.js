import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import FiendsFavor from './pages/fiends_favor';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css"
import { createTheme, ThemeProvider } from '@mui/material';
import DeathRoll from "./pages/deathRoll";
import Slots from './pages/slots';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout';
import NotFound from './pages/notFound';
const root = ReactDOM.createRoot(document.getElementById('root'));


const theme = createTheme({
  palette: {
    navbar: {
      main: "#27292b",
      contrastText: "#dadee3"
    },
    gold: {
      main: "#ffc733",
      contrastText: "#4287f5"
    },
    silver: {
      main: "#e0e0e4",
      contrastText: "#4287f5"
    },
    copper: {
      main: "#9b7c3a",
      contrastText: "#4287f5"

    },
    soul: {
      main: "#3b3b3d",
      contrastText: "#4287f5"
    }
  }
})

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route index element={<FiendsFavor />} />
          <Route path="/fiends-favor" element={<FiendsFavor />} />
          <Route path="/slots" element={<Slots />} />
          <Route path="/death-roll" element={<DeathRoll />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
