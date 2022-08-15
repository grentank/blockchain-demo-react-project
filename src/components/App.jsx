import { Container } from '@mui/material';
import React from 'react';
import PublicRoutes from './routing/PublicRoutes';
import NavBar from './ui/navbar/NavBar';

export default function App() {
  return (
    <Container maxWidth="xl">
      <NavBar />
      <PublicRoutes />
    </Container>
  );
}
