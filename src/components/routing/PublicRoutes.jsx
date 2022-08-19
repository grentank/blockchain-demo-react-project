import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlockPage from '../pages/BlockPage';
import CoinbasePage from '../pages/CoinbasePage';
import DistributedPage from '../pages/DistributedPage';
import HashPage from '../pages/HashPage';
import HomePage from '../pages/HomePage';
import KeysPage from '../pages/KeysPage';
import NoPage404 from '../pages/NoPage404';
import PrevChainPage from '../pages/PrevChainPage';
import SignaturePage from '../pages/SignaturePage';
import TokensPage from '../pages/TokensPage';

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hash" element={<HashPage />} />
      <Route path="/block" element={<BlockPage />} />
      <Route path="/blockchain" element={<PrevChainPage />} />
      <Route path="/distributed" element={<DistributedPage />} />
      <Route path="/tokens" element={<TokensPage />} />
      <Route path="/coinbase" element={<CoinbasePage />} />
      <Route path="/keys" element={<KeysPage />} />
      <Route path="/signatures" element={<SignaturePage />} />
      <Route path="*" element={<NoPage404 />} />
    </Routes>
  );
}
