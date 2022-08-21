import {
  Box,
  Fade, FormControl, InputAdornment, Paper, Stack, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TagIcon from '@mui/icons-material/Tag';
import { LoadingButton } from '@mui/lab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import HdrAutoIcon from '@mui/icons-material/HdrAuto';
import { mineTokensBlockNonce, modifyTokensBlockchain, setMiningTokensBlock } from '../../../Redux/actions/tokensBlockchainActions';

export default function TokensBlock({ id, TYPE }) {
  const [fade, setFade] = useState(false);

  useEffect(() => setFade(true), []);

  //   const typeSelector = (state) => {
  //     switch (TYPE) {
  //       case '_PEER_B':
  //         return state.prevBlockchainPeerB;
  //       case '_PEER_C':
  //         return state.prevBlockchainPeerC;
  //       default:
  //         return state.prevBlockchain;
  //     }
  //   };

  const blockchain = useSelector((state) => state.tokensBlockchain);
  const block = blockchain[id];
  const inputs = block.data;
  // const prevHash = id > 0 ? blockchain[id - 1].hash : '0'.repeat(64);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(modifyTokensBlockchain({ ...inputs, [name]: value }, id, blockchain, TYPE));
  };

  const handleTokens = (e, idd) => {
    const { name, value } = e.target;
    dispatch(modifyTokensBlockchain({
      ...inputs,
      tokens: inputs.tokens
        .map((token, index) => (index === idd ? { ...token, [name]: value } : token)),
    }, id, blockchain, TYPE));
  };

  const mineNonce = () => {
    dispatch(setMiningTokensBlock(id, TYPE));
    dispatch(mineTokensBlockNonce(id, blockchain, TYPE));
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
            {inputs.tokens.map((token, ind) => (
              <FormControl
                key={ind}
                sx={{
                  m: 1,
                  background: '#ffffff',
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                <TextField
                  id="outlined-start-adornment"
                  label="Amount"
                  variant="outlined"
                  name="amount"
                  sx={{ width: '25%' }}
                  value={token.amount}
                  onChange={(e) => handleTokens(e, ind)}
                //   InputProps={{
                // startAdornment: <InputAdornment position="start"><HdrAutoIcon /></InputAdornment>
                //   }}
                />
                <TextField
                  id="outlined-from"
                  label="From"
                  variant="outlined"
                  name="value"
                  sx={{ width: '45%' }}
                  value={token.from}
                  onChange={(e) => handleTokens(e, ind)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><ArrowForwardIcon /></InputAdornment>,
                  }}
                />
                <TextField
                  id="filled-multiline-flexible"
                  label="To"
                  variant="outlined"
                  name="to"
                  sx={{ width: '30%' }}
                  value={token.to}
                  onChange={(e) => handleTokens(e, ind)}
                />
              </FormControl>
            ))}
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
