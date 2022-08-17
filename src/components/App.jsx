import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generatePrevBlockchain } from '../Redux/actions/prevBlockchainActions';
import { generatePrevBlocksAsync } from '../utils/generatePrevBlocks';
import PublicRoutes from './routing/PublicRoutes';
import NavBar from './ui/navbar/NavBar';

export default function App() {
  // useEffect(() => {
  //   generatePrevBlocksAsync(5);
  // }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(generatePrevBlockchain(4));
    dispatch(generatePrevBlockchain(4, '_PEER_B'));
    dispatch(generatePrevBlockchain(4, '_PEER_C'));
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
