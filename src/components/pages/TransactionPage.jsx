import { Grid, Typography } from '@mui/material';
import React from 'react';
import TransactionBlock from '../ui/blocks/TransactionBlock';

export default function TransactionPage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{
          fontSize: 34,
        }}
        >
          Transaction
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TransactionBlock />
      </Grid>
    </Grid>
  );
}
