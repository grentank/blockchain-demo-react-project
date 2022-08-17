import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlockPage from '../pages/BlockPage';
import DistributedPage from '../pages/DistributedPage';
import HashPage from '../pages/HashPage';
import HomePage from '../pages/HomePage';
import NoPage404 from '../pages/NoPage404';
import PrevChainPage from '../pages/PrevChainPage';

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hash" element={<HashPage />} />
      <Route path="/block" element={<BlockPage />} />
      <Route path="/blockchain" element={<PrevChainPage />} />
      <Route path="/distributed" element={<DistributedPage />} />
      <Route path="*" element={<NoPage404 />} />
    </Routes>
  );
}
