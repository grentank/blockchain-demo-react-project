import { Grid, Typography } from '@mui/material';
import React from 'react';
import NonceBlock from '../ui/blocks/NonceBlock';

export default function BlockPage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{
          fontSize: 34,
        }}
        >
          Block
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <NonceBlock />
      </Grid>
    </Grid>
  );
}
