import {
  Box, CircularProgress, Container, Fade, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Buffer } from 'buffer';
import { generateCoinbaseBlockchain } from '../Redux/actions/coinbaseBlockchainActions';
import { generatePrevBlockchain } from '../Redux/actions/prevBlockchainActions';
import { generateTokensBlockchain } from '../Redux/actions/tokensBlockchainActions';
import { generateTransactionsBlockchain } from '../Redux/actions/transactionsBlockchainActions';
import PublicRoutes from './routing/PublicRoutes';
import NavBar from './ui/navbar/NavBar';
import { generateSignedBlocks } from '../utils/generateSignedBlocks';

export default function App() {
  // useEffect(() => {
  //   generatePrevBlocksAsync(5);
  // }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    window.Buffer = Buffer;
    dispatch(generatePrevBlockchain(4));
    dispatch(generatePrevBlockchain(4, '_PEER_B'));
    dispatch(generatePrevBlockchain(4, '_PEER_C'));
    dispatch(generateTokensBlockchain(4));
    dispatch(generateCoinbaseBlockchain(4));
    dispatch(generateTransactionsBlockchain(4));
    // generateSignedBlocks(4);
    // generateTokensBlocksAsync(5);
  }, []);
  // useEffect(() => {
  //   fetch('/data')
  //     .then((res) => {
  //       console.log('RESPONSE:', res);
  //       return res.json();
  //     })
  //     .then(console.log);
  // }, []);
  return (
    <Container maxWidth="xl">
      <NavBar />
      <PublicRoutes />
    </Container>
  );
}
