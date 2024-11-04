import './index.css';
import "bootstrap/dist/css/bootstrap.css"
import theme from './components/themes';

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import FiendsFavor from './pages/fiends_favor';
import DeathRoll from "./pages/deathRoll";
import Slots from './pages/slots';
import Layout from './pages/layout';
import NotFound from './pages/notFound';
import { CurrencyProvider } from './components/currencyContext';
import MoneyInput from './components/moneyInput';
import Cashout from './pages/cashout';
import Roulette from './pages/roulette';

const root = ReactDOM.createRoot(document.getElementById('root'));

const submitBet = (game, wager) => {
  console.log(game, wager)
}
root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Layout />
          <Routes>
            <Route index element={<MoneyInput />} />
            <Route path="/fiends-favor" element={<FiendsFavor submitBet={submitBet} />} />
            <Route path="/slots" element={<Slots submitBet={submitBet} />} />
            <Route path="/death-roll" element={<DeathRoll submitBet={submitBet} />} />
            <Route path="/cashout" element={<Cashout />} />
            <Route path="/roulette" element={<Roulette />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </CurrencyProvider>
  </React.StrictMode>
);
reportWebVitals();
