import { Grid, Typography } from '@mui/material';
import React from 'react';
import SignatureBlock from '../ui/blocks/SignatureBlock';

export default function SignaturePage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{
          fontSize: 34,
        }}
        >
          Signatures
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SignatureBlock />
      </Grid>
    </Grid>
  );
}
