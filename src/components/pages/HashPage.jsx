import { Grid, Typography } from '@mui/material';
import React from 'react';
import HashBlock from '../ui/blocks/HashBlock';

export default function HashPage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{
          fontSize: 34,
        }}
        >
          SHA-256 function
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <HashBlock />
      </Grid>
    </Grid>
  );
}
