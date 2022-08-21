import { Grid, Typography } from '@mui/material';
import React from 'react';
import PrivatePublicBlock from '../ui/blocks/PrivatePublicBlock';

export default function KeysPage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{
          fontSize: 34,
        }}
        >
          Public and Private key pairs
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <PrivatePublicBlock />
      </Grid>
    </Grid>
  );
}
