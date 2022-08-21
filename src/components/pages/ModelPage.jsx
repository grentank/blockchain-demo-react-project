import {
  Box, Grid, Stack, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import BlockchainModelBlock from '../ui/blocks/BlockchainModelBlock';

export default function ModelPage() {
  const blockchain = useSelector((state) => state.transactionsBlockchain);
  // const blockchainB = useSelector((state) => state.prevBlockchainPeerB);
  // const blockchainC = useSelector((state) => state.prevBlockchainPeerC);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{
          fontSize: 34,
        }}
        >
          Blockchain model with transactions
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
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        {blockchain?.map((el) => (
          <Box
          // item
          // xs={3}
            key={el.id}
            sx={{ width: 800 }}
          >
            <BlockchainModelBlock id={el.id} />
          </Box>
        ))}
      </Stack>
      {/* <Grid item xs={12}>
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
        ))} */}
    </Grid>
  );
}
