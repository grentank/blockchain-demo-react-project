import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import sha256 from '../../../utils/sha256';
import hashIsValid from '../../../utils/hashIsValid';
import { modifyPrevBlockchain } from '../../../Redux/actions/prevBlockchainActions';

export default function PrevBlock({ id }) {
  const blockchain = useSelector((state) => state.prevBlockchain);
  const block = blockchain[id];
  const inputs = block.data;
  // const prevHash = id > 0 ? blockchain[id - 1].hash : '0'.repeat(64);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value, inputs);
    dispatch(modifyPrevBlockchain({ ...inputs, [name]: value }, id, blockchain));
    //
    //
    //
    //
    //
    // setInputs((prev) => {
    //   const newInputs = { ...prev, [name]: value };
    //   //   console.log('newInputs: ', newInputs);
    //   sha256(newInputs)
    //     .then((hashText) => {
    //       setHash(hashText);
    //       if (hashIsValid(hashText)) {
    //         setVerified(true);
    //       } else {
    //         setVerified(false);
    //       }
    //     });
    //   return newInputs;
    // });
  };

  // const mineNonce = async () => {
  //   // console.log('Initial input:', inputs);
  //   setMining(true);
  //   let newNonce;
  //   for (newNonce = 0; newNonce < 1e7; newNonce += 1) {
  //     const newInputs = { ...inputs, nonce: `${newNonce}` };
  //     const newHash = await sha256(newInputs);
  //     if (hashIsValid(newHash)) {
  //       // console.log('old inputs: ', inputs, 'newInputs: ', newInputs, 'oldHash: ', hash);
  //       setInputs(newInputs);
  //       setHash(newHash);
  //       setMining(false);
  //       setVerified(true);
  //       break;
  //     }
  //     if (newInputs.nonce === 1e7) {
  //       console.log('Failed to mine!');
  //       setMining(false);
  //       break;
  //     }
  //   }
  //   setMining(false);
  // };
  return (
    <Box
      component="form"
      sx={{
        background: block.meta.verified ? '#DCEDD6' : '#F8D9DA',
        padding: 5,
        margin: 3,
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
        <LoadingButton loading={block.meta.mining} variant="contained" onClick={() => {}}>
          Mine
        </LoadingButton>
      </Stack>
    </Box>
  );
}
