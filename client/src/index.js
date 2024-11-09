import './index.css';
import "bootstrap/dist/css/bootstrap.css"
import theme from './components/themes';

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { Box, Container, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import FiendsFavor from './pages/fiends_favor';
import DeathRoll from "./pages/deathRoll";
import Layout from './pages/layout';
import NotFound from './pages/notFound';
import { CurrencyProvider } from './components/currencyContext';
import MoneyInput from './components/moneyInput';
import Cashout from './pages/cashout';
import Roulette from './pages/roulette';
import Game from './pages/game';
import CoinCalculator from './pages/test';
import DeathRollTest from './components/deathRollTest';
import AppExample from './components/test';

const root = ReactDOM.createRoot(document.getElementById('root'));
const pages = { "Deposit": "", "Fiend's Favor": "fiends-favor", 'Death Roll': 'death-roll', "Roulette": "roulette", };

const submitBet = (game, wager) => {
  console.log(game, wager)
}

root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Layout pages={pages} />
          <Routes>
            <Route index element={<MoneyInput />} />
            <Route path="/fiends-favor" element={<Game game={"fiendsFavor"} />} />
            <Route path="/death-roll" element={<Game game={"deathRoll"} submitBet={submitBet} />} />
            <Route path="/cashout" element={<Cashout />} />
            <Route path="/roulette" element={<Game game={"roulette"} />} />
            <Route path="/dr" element={<DeathRollTest />} />
            <Route path="app" element={<AppExample />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </CurrencyProvider>
  </React.StrictMode>
);
reportWebVitals();
