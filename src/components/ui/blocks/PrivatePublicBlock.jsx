import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Fade, FormControl, Paper, Stack,
} from '@mui/material';
import { Buffer } from 'buffer';
import sha256 from '../../../utils/sha256';

export default function PrivatePublicBlock() {
  /// ////////////////////////////////////////////////
  /// //////// Добавить кнопку генерации пары ключей. Может быть, если вводить что-то в инпут,
  /// //////// то игнорировать и всё равно каждый раз генерить новую пару
  /// ////////////////////////////////////////////////
  const [grow, setGrow] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const handleChange = async (e) => {
    setPrivateKey(e.target.value);
    try {
      const myPublicKey = await window.crypto.subtle.importKey(
        'pkcs8',
        Uint8Array.from(parseInt(e.target.value)),
        { // these are the algorithm options
          name: 'RSA-OAEP',
          hash: { name: 'SHA-256' }, // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
        },
        true,
        ['decrypt'],
      );
      const str2 = Buffer.from(myPublicKey).toString('hex');
      console.log(str2);
    } catch (err) {
      console.log(err);
    }
    // sha256(e.target.value)
    //   .then((hashText) => setPublicKey(hashText));
  };
  useEffect(() => {
    setGrow(true);

    window.Buffer = Buffer;
    window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
      },
      true,
      ['encrypt', 'decrypt'],
    ).then(async (keys) => {
      console.log(keys);
      const myPrivateKey = await window.crypto.subtle.exportKey('pkcs8', keys.privateKey);
      const str = Buffer.from(myPrivateKey).toString('hex');
      console.log(str);
      const myPublicKey = await window.crypto.subtle.exportKey('spki', keys.publicKey);
      const str2 = Buffer.from(myPublicKey).toString('hex');
      console.log(str2);
    });
  }, []);
  return (
    <Fade in={grow}>
      <Paper elevation={4} sx={{ margin: 3 }}>
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
                id="filled-multiline-flexible-private"
                label="Private key"
                variant="outlined"
                multiline
                rows={1}
                value={privateKey}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="filled-disabled-public"
                label="Public key"
                variant="filled"
                multiline
                rows={5}
                value={publicKey}
              />
            </FormControl>
          </Stack>
        </Box>
      </Paper>
    </Fade>
  );
}
