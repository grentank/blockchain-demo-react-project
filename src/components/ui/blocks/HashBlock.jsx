import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, Stack } from '@mui/material';
import sha256 from '../../../utils/sha256';
// import findHashZeroes from '../../../utils/hashZeroes';

export default function HashBlock() {
  // const a0 = '0123456789abcdefghijklmnopqrstuvwxyz';
  // for (let i = 0; i < 1e5; i += 1) {
  //   const hashed = await sha256(i);
  //   if (hashed[0] === '0' && hashed[1] === '0' && hashed[2] === '0' && hashed[3] === '0') {
  //     console.log('This is i:', i);
  //     return i;
  //   }
  // }

  // useEffect(() => {
  //   // findHashZeroes();
  // }, []);
  const [value, setValue] = useState('');
  const [hash, setHash] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
    sha256(e.target.value)
      .then((hashText) => setHash(hashText));
  };
  return (
    <Box
      component="form"
      sx={{
        background: '#E9ECEF',
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
            id="filled-multiline-flexible"
            label="Data"
            variant="outlined"
            multiline
            rows={4}
            value={value}
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
      </Stack>
    </Box>
  );
}
