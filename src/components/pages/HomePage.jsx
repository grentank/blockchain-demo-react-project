import {
  Box, Fade, Grid, LinearProgress, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [loading, setLoading] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(30);
    }, 500);
    setTimeout(() => {
      setLoading(70);
    }, 1500);
    setTimeout(() => {
      setLoading(100);
    }, 5000);
  }, []);
  useEffect(() => {
    if (loading === 100) {
      setTimeout(() => {
        setFade(false);
      }, 1000);
    }
  }, [loading]);
  return (

    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{
          fontSize: 34,
        }}
        >
          Welcome to a blockchain demonstration!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Fade in={fade}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" value={loading} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">
                {`${Math.round(loading)}%`}
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Grid>
    </Grid>

  );
}
