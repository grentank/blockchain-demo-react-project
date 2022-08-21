import {
  Box, Fade, FormControl, InputAdornment, Paper, Stack, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tag as TagIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { mineTransactionsBlockNonce, modifyTransactionsBlockchain, setMiningTransactionsBlock } from '../../../Redux/actions/transactionsBlockchainActions';

export default function BlockchainModelBlock({ id, TYPE }) {
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

  const blockchain = useSelector((state) => state.transactionsBlockchain);
  const block = blockchain[id];
  const inputs = block.data;
  // const prevHash = id > 0 ? blockchain[id - 1].hash : '0'.repeat(64);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(modifyTransactionsBlockchain({ ...inputs, [name]: value }, id, blockchain, TYPE));
  };

  const handleTokens = (e, idd) => {
    const { name, value } = e.target;
    dispatch(modifyTransactionsBlockchain({
      ...inputs,
      tokens: inputs.tokens
        .map((token, index) => (index === idd
          ? { ...token, data: { ...token.data, [name]: value } }
          : token)),
    }, id, blockchain, TYPE));
  };

  const handleCoinbase = (e) => {
    const { name, value } = e.target;
    dispatch(modifyTransactionsBlockchain({
      ...inputs,
      coinbase: { ...inputs.coinbase, [name]: value },
    }, id, blockchain, TYPE));
  };

  const mineNonce = () => {
    dispatch(setMiningTransactionsBlock(id, TYPE));
    dispatch(mineTransactionsBlockNonce(id, blockchain, TYPE));
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
            <FormControl
              fullWidth
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
                id="outlined-from"
                label="Coinbase"
                variant="outlined"
                name="amount"
                sx={{ width: '50%' }}
                value={inputs.coinbase.amount}
                onChange={handleCoinbase}
                InputProps={{
                  endAdornment: <InputAdornment position="end"><ArrowForwardIcon /></InputAdornment>,
                }}
              />
              <TextField
                id="filled-multiline-flexible"
                label="To"
                variant="outlined"
                name="to"
                sx={{ width: '50%' }}
                value={inputs.coinbase.to}
                onChange={handleCoinbase}
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
                  value={token.data.amount}
                  onChange={(e) => handleTokens(e, ind)}
                />
                <TextField
                  id="outlined-from"
                  label="Sender"
                  variant="outlined"
                  name="sender"
                  sx={{ width: '45%' }}
                  value={token.data.sender.publicKeyHex}
                  onChange={(e) => handleTokens(e, ind)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><ArrowForwardIcon /></InputAdornment>,
                  }}
                />
                <TextField
                  id="filled-multiline-flexible"
                  label="Receiver"
                  variant="outlined"
                  name="receiver"
                  sx={{ width: '30%' }}
                  value={token.data.receiver.publicKeyHex}
                  onChange={(e) => handleTokens(e, ind)}
                />
                <TextField
                  id="filled-multiline-flexible-sig"
                  label="Signature"
                  variant="outlined"
                  name="signature"
                  fullWidth
                  sx={{ color: token.meta.verified === false ? 'error.main' : 'black' }}
                  error={token.meta.verified === false}
                  value={token.signature}
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
