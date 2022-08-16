import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import PrevBlock from '../ui/blocks/PrevBlock';

export default function PrevChainPage() {
  const blockchain = useSelector((state) => state.prevBlockchain);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{
          fontSize: 34,
        }}
        >
          Blockchain
        </Typography>
      </Grid>
      {blockchain?.map((el, index) => (
        <Grid item xs={3} key={el.block}>
          <PrevBlock id={index} key={el.block} />
        </Grid>
      ))}
    </Grid>
  );
}
