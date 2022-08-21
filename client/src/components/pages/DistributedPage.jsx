import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import PrevBlock from '../ui/blocks/PrevBlock';

export default function DistributedPage() {
  const blockchainA = useSelector((state) => state.prevBlockchain);
  const blockchainB = useSelector((state) => state.prevBlockchainPeerB);
  const blockchainC = useSelector((state) => state.prevBlockchainPeerC);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{
          fontSize: 34,
        }}
        >
          Distributed blockchain
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{
          fontSize: 20,
        }}
        >
          Peer A
        </Typography>
      </Grid>
      {blockchainA?.map((el) => (
        <Grid item xs={3} key={el.id}>
          <PrevBlock id={el.id} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography sx={{
          fontSize: 20,
        }}
        >
          Peer B
        </Typography>
      </Grid>
      {blockchainB?.map((el) => (
        <Grid item xs={3} key={el.id}>
          <PrevBlock id={el.id} TYPE="_PEER_B" />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography sx={{
          fontSize: 20,
        }}
        >
          Peer C
        </Typography>
      </Grid>
      {blockchainC?.map((el) => (
        <Grid item xs={3} key={el.id}>
          <PrevBlock id={el.id} TYPE="_PEER_C" />
        </Grid>
      ))}
    </Grid>
  );
}
