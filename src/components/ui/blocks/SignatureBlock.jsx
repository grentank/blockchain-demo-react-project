import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Button,
  Fade, FormControl, Paper, Stack,
} from '@mui/material';
import { Buffer } from 'buffer';

export default function SignatureBlock() {
  const [growSend, setGrowSend] = useState(false);
  const [growReceive, setGrowReceive] = useState(false);
  const [keypair, setKeypair] = useState({ });
  const [hexKeypair, setHexKeypair] = useState({ privateKey: '', publicKey: '' });
  const [message, setMessage] = useState({ text: '', signature: '', _sig: '' });
  const [valid, setValid] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState('');

  const validColor = (state) => {
    switch (state) {
      case true:
        return '#DCEDD6';
      case false:
        return '#F8D9DA';
      case null:
        return '#E9ECEF';
      default:
        return '#E9ECEF';
    }
  };
  const messageChange = (e) => {
    setMessage((prev) => ({ ...prev, text: e.target.value }));
    setReceivedMessage(e.target.value);
  };
  const receivedHandler = (e) => setReceivedMessage(e.target.value);
  const signHandler = () => {
    window.crypto.subtle.sign(
      {
        name: 'RSA-PSS',
        saltLength: 128,
      },
      keypair.privateKey,
      Buffer.from(message.text),
    ).then((sig) => {
      setMessage((prev) => ({ ...prev, signature: Buffer.from(sig).toString('hex'), _sig: sig }));
    });
    setGrowReceive(true);
  };
  const verifyHandler = () => {
    window.crypto.subtle.verify(
      {
        name: 'RSA-PSS',
        saltLength: 128,
      },
      keypair.publicKey,
      message._sig,
      Buffer.from(receivedMessage),
    ).then(setValid);
  };
  useEffect(() => {
    window.Buffer = Buffer;
    window.crypto.subtle.generateKey(
      {
        name: 'RSA-PSS',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: { name: 'SHA-256' },
      },
      true,
      ['sign', 'verify'],
    ).then(async (keys) => {
      setKeypair(keys);
      const privateKey = Buffer.from(await window.crypto.subtle.exportKey('pkcs8', keys.privateKey)).toString('hex');
      const publicKey = Buffer.from(await window.crypto.subtle.exportKey('spki', keys.publicKey)).toString('hex');
      setHexKeypair({ privateKey, publicKey });
      setGrowSend(true);
    });
  }, []);
  return (
    <>
      <Fade in={growSend}>
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
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={message.text}
                  onChange={messageChange}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  label="Private key"
                  variant="filled"
                  value={hexKeypair.privateKey}
                />
              </FormControl>
              <Button variant="contained" onClick={signHandler}>
                Sign and send
              </Button>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  label="Signature"
                  variant="filled"
                  value={message.signature}
                />
              </FormControl>
            </Stack>
          </Box>
        </Paper>
      </Fade>
      <Fade in={growReceive}>
        <Paper elevation={4} sx={{ margin: 3, marginTop: 5 }}>
          <Box
            component="form"
            sx={{
              background: validColor(valid),
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
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={receivedMessage}
                  onChange={receivedHandler}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  label="Public key"
                  variant="filled"
                  value={hexKeypair.publicKey}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  label="Signature"
                  variant="filled"
                  value={message.signature}
                />
              </FormControl>
              <Button variant="contained" onClick={verifyHandler}>
                Verify
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Fade>
    </>
  );
}
