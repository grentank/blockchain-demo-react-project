import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Button,
  Fade, FormControl, Paper, Stack,
} from '@mui/material';
import { Buffer } from 'buffer';
import base64url from 'base64url';

export default function PrivatePublicBlock() {
  const [grow, setGrow] = useState(false);
  const [keys, setKeys] = useState({ privateKey: '', publicKey: '' });
  useEffect(() => {
    setGrow(true);
    window.Buffer = Buffer;
  }, []);

  const generateKeyPair = () => {
    window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
      },
      true,
      ['encrypt', 'decrypt'],
    ).then(async ({ privateKey: newPrivateKey, publicKey: newPublicKey }) => {
      const privateKey = Buffer.from(await window.crypto.subtle.exportKey('pkcs8', newPrivateKey)).toString('hex');
      const publicKey = Buffer.from(await window.crypto.subtle.exportKey('spki', newPublicKey)).toString('hex');
      const jwkPrivate = await window.crypto.subtle.exportKey('jwk', newPrivateKey);
      console.log('Base64 jwk:', jwkPrivate);
      for (const key in jwkPrivate) { // ПЕРЕВЕСТИ В ЧИСЛА BASE10 ЧИСТО ДЛЯ НАГЛЯДНОСТИ
        if (Object.hasOwnProperty.call(jwkPrivate, key) && key !== 'alg') {
          // console.log(key, base64url.toBuffer(jwkPrivate[key]).toString('hex', 0, 7));
          // console.log(key, base64url.toBuffer(jwkPrivate[key]).toString('hex'));
          console.log(key, BigInt(`0x${base64url.toBuffer(jwkPrivate[key]).toString('hex')}`).toString());
        }
        if (key === 'alg') {
          console.log(key, jwkPrivate[key]);
        }
      }
      setKeys({ privateKey, publicKey });
    });
  };

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
                maxRows={8}
                // rows={1}
                value={keys.privateKey}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="filled-disabled-public"
                label="Public key"
                variant="filled"
                multiline
                maxRows={4}
                // rows={5}
                value={keys.publicKey}
              />
            </FormControl>
            <Button variant="contained" onClick={generateKeyPair}>
              Generate
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Fade>
  );
}
