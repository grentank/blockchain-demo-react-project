import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, Paper, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import sha256 from '../../../utils/sha256';
import hashIsValid from '../../../utils/hashIsValid';

export default function NonceBlock() {
  const [inputs, setInputs] = useState({
    block: '1',
    nonce: '46820',
    data: '',
  });
  const [hash, setHash] = useState('00001e6b693480b0506c13f88f3628d43ada442bab441a8f5d597b19b819bd0a');
  const [mining, setMining] = useState(false);
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    // console.log('useEffect inputs: ', inputs);
    sha256(inputs)
      .then((hashText) => setHash(hashText));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      const newInputs = { ...prev, [name]: value };
      //   console.log('newInputs: ', newInputs);
      sha256(newInputs)
        .then((hashText) => {
          setHash(hashText);
          if (hashIsValid(hashText)) {
            setVerified(true);
          } else {
            setVerified(false);
          }
        });
      return newInputs;
    });
  };

  const mineNonce = async () => {
    // console.log('Initial input:', inputs);
    setMining(true);
    let newNonce;
    for (newNonce = 0; newNonce < 1e7; newNonce += 1) {
      const newInputs = { ...inputs, nonce: `${newNonce}` };
      const newHash = await sha256(newInputs);
      if (hashIsValid(newHash)) {
        // console.log('old inputs: ', inputs, 'newInputs: ', newInputs, 'oldHash: ', hash);
        setInputs(newInputs);
        setHash(newHash);
        setMining(false);
        setVerified(true);
        break;
      }
      if (newInputs.nonce === 1e7) {
        console.log('Failed to mine!');
        setMining(false);
        break;
      }
    }
    setMining(false);
  };
  return (
    <Paper elevation={4} sx={{ margin: 3 }}>
      <Box
        component="form"
        sx={{
          background: verified ? '#DCEDD6' : '#F8D9DA',
          padding: 5,
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
              label="Hash"
              variant="filled"
              multiline
              rows={1}
              value={hash}
            />
          </FormControl>
          <LoadingButton loading={mining} variant="contained" onClick={mineNonce}>
            Mine
          </LoadingButton>
        </Stack>
      </Box>
    </Paper>
  );
}
