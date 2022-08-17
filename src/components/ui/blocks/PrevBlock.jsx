import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Fade,
  FormControl, InputAdornment, Paper, Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import TagIcon from '@mui/icons-material/Tag';
import { minePrevBlockNonce, modifyPrevBlockchain, setMiningPrevBlock } from '../../../Redux/actions/prevBlockchainActions';

export default function PrevBlock({ id, TYPE }) {
  const [fade, setFade] = useState(false);

  useEffect(() => setFade(true), []);

  const typeSelector = (state) => {
    switch (TYPE) {
      case '_PEER_B':
        return state.prevBlockchainPeerB;
      case '_PEER_C':
        return state.prevBlockchainPeerC;
      default:
        return state.prevBlockchain;
    }
  };

  const blockchain = useSelector(typeSelector);
  const block = blockchain[id];
  const inputs = block.data;
  // const prevHash = id > 0 ? blockchain[id - 1].hash : '0'.repeat(64);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(modifyPrevBlockchain({ ...inputs, [name]: value }, id, blockchain, TYPE));
  };

  const mineNonce = () => {
    console.log('This is dispatch:', dispatch(setMiningPrevBlock(id, TYPE)));
    dispatch(minePrevBlockNonce(id, blockchain, TYPE));
  };

  return (
    <Fade in={fade}>
      <Paper elevation={4} sx={{ margin: 3 }}>
        <Box
          component="form"
          sx={{
            background: block.meta.verified ? '#DCEDD6' : '#F8D9DA',
            padding: 3,
          }}
          noValidate
          autoComplete="off"
        >
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <FormControl fullWidth sx={{ m: 1, background: '#ffffff' }}>
              <TextField
                id="filled-disable-block"
                label="Block"
                variant="outlined"
                name="block"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TagIcon />
                    </InputAdornment>
                  ),
                }}
                value={inputs.block}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, background: '#ffffff' }}>
              <TextField
                id="filled-disable-nonce"
                label="Nonce"
                variant="outlined"
                name="nonce"
                value={inputs.nonce}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, background: '#ffffff' }}>
              <TextField
                id="filled-multiline-flexible"
                label="Data"
                variant="outlined"
                multiline
                name="data"
                rows={4}
                value={inputs.data}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="filled-disabled"
                label="Prev"
                variant="filled"
                name="prev"
                rows={1}
                value={inputs.prev}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="filled-disabled"
                label="Hash"
                variant="filled"
                name="hash"
                rows={1}
                value={block.hash}
              />
            </FormControl>
            <LoadingButton loading={block.meta.mining} variant="contained" onClick={mineNonce}>
              Mine
            </LoadingButton>
          </Stack>
        </Box>
      </Paper>
    </Fade>
  );
}
