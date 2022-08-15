import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { generatePrevBlocks } from '../../utils/generatePrevBlocks';
import PrevBlock from '../ui/blocks/PrevBlock';

export default function PrevChainPage() {
  const [blockchain, setBlockchain] = useState(generatePrevBlocks(4));
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
      {blockchain?.map((el) => (
        <Grid item xs={3}>
          <PrevBlock prevHash={el} block={el} key={el.block} />
        </Grid>
      ))}
    </Grid>
  );
}
