import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Button,
  Fade, FormControl, InputAdornment, Paper, Stack, Typography,
} from '@mui/material';
import { Buffer } from 'buffer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { generateTransactionNoVerification, signTransaction, verifyTransaction } from '../../../utils/ecdsa';

export default function TransactionBlock() {
  const initTransaction = {
    data: {
      amount: '30',
      sender: {
        publicKeyHex: '',
      },
      receiver: {
        publicKeyHex: '',
      },
    },
    signature: '',
    meta: {
      verified: null,
    },
  };
  const [growSend, setGrowSend] = useState(false);
  const [growReceive, setGrowReceive] = useState(false);
  const [transaction, setTransaction] = useState(initTransaction);
  const [receivedTransaction, setReceivedTransaction] = useState(initTransaction);

  // const transaction = {
  //   data: {
  //     amount: 30,
  //     sender: {
  //       publicKeyHex: '',
  //       keypair: {
  //         // actual keypair
  //       },
  //     },
  //     receiver: {
  //       publicKeyHex: '',
  //       keypair: {
  //         // actual keypair
  //       },
  //     },
  //   },
  //   signatureHex: '',
  //   _sig: '',
  // };
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
  // const messageChange = (e) => setMessage((prev) => ({ ...prev, text: e.target.value }));
  const receivedHandler = (e) => setReceivedTransaction((prev) => ({
    ...prev,
    data: { ...prev.data, amount: e.target.value },
  }));
  const signHandler = () => {
    signTransaction(transaction)
      .then((newTransaction) => {
        setTransaction(newTransaction);
        setReceivedTransaction(newTransaction);
        setGrowReceive(true);
      });
    // window.crypto.subtle.sign(
    //   {
    //     name: 'RSA-PSS',
    //     saltLength: 128,
    //   },
    //   keypair.privateKey,
    //   Buffer.from(message.text),
    // ).then((sig) => {
    //   setMessage((prev) => ({ ...prev, signature: Buffer.from(sig).toString('hex'), _sig: sig }));
    //   setReceivedMessage(message.text);
    // });
    // setGrowReceive(true);
  };
  const verifyHandler = () => {
    verifyTransaction(receivedTransaction)
      .then((verified) => setReceivedTransaction((prev) => ({ ...prev, meta: { verified } })));
    // window.crypto.subtle.verify(
    //   {
    //     name: 'RSA-PSS',
    //     saltLength: 128,
    //   },
    //   keypair.publicKey,
    //   message._sig,
    //   Buffer.from(receivedMessage),
    // ).then(setValid);
  };
  useEffect(() => {
    window.Buffer = Buffer;
    generateTransactionNoVerification('30')
      .then((generatedTransaction) => setTransaction(generatedTransaction));
    // window.crypto.subtle.generateKey(
    //   {
    //     name: 'RSA-PSS',
    //     modulusLength: 2048,
    //     publicExponent: new Uint8Array([1, 0, 1]),
    //     hash: { name: 'SHA-256' },
    //   },
    //   true,
    //   ['sign', 'verify'],
    // ).then(async (keys) => {
    //   setKeypair(keys);
    //   const privateKey = Buffer.from(await window.crypto.subtle.exportKey('pkcs8', keys.privateKey)).toString('hex');
    //   const publicKey = Buffer.from(await window.crypto.subtle.exportKey('spki', keys.publicKey)).toString('hex');
    //   setHexKeypair({ privateKey, publicKey });
    //   setGrowSend(true);
    // });
  }, []);
  useEffect(() => {
    setGrowSend(true);
  }, [transaction]);
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
                  id="outlined-start-adornment"
                  label="Amount"
                  variant="outlined"
                  name="amount"
                  sx={{ width: '10%' }}
                  value={transaction.data.amount}
                  onChange={() => {}}
                //   InputProps={{
                //     startAdornment: <InputAdornment position="start"><HdrAutoIcon /></InputAdornment>,
                //   }}
                />
                <TextField
                  id="outlined-from"
                  label="Sender Public Key"
                  variant="outlined"
                  name="value"
                  sx={{ width: '45%' }}
                  value={transaction.data.sender.publicKeyHex}
                  onChange={() => {}}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><ArrowForwardIcon /></InputAdornment>,
                  }}
                />
                <TextField
                  id="filled-multiline-flexible"
                  label="Receiver Public Key"
                  variant="outlined"
                  name="to"
                  sx={{ width: '45%' }}
                  value={transaction.data.receiver.publicKeyHex}
                  onChange={() => {}}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  label="Signature"
                  variant="filled"
                  value={transaction.signature}
                />
              </FormControl>
              <Button variant="contained" onClick={signHandler}>
                Sign and send
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Fade>
      <Fade in={growReceive}>
        <div>

          <Typography sx={{
            fontSize: 20,
            marginTop: 15,
          }}
          >
            Receiver:
          </Typography>
          <Paper elevation={4} sx={{ margin: 3 }}>
            <Box
              component="form"
              sx={{
                background: validColor(receivedTransaction.meta.verified),
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
                    id="outlined-start-adornment"
                    label="Amount"
                    variant="outlined"
                    name="amount"
                    sx={{ width: '10%' }}
                    value={receivedTransaction.data.amount}
                    onChange={receivedHandler}
                  />
                  <TextField
                    id="outlined-from"
                    label="Sender Public Key"
                    variant="outlined"
                    name="value"
                    sx={{ width: '45%' }}
                    value={receivedTransaction.data.sender.publicKeyHex}
                    error={receivedTransaction.meta.verified === false}
                    onChange={() => {}}
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><ArrowForwardIcon /></InputAdornment>,
                    }}
                  />
                  <TextField
                    id="filled-multiline-flexible"
                    label="Receiver Public Key"
                    variant="outlined"
                    name="to"
                    sx={{ width: '45%' }}
                    value={receivedTransaction.data.receiver.publicKeyHex}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Signature"
                    variant="filled"
                    value={receivedTransaction.signature}
                  />
                </FormControl>
                <Button variant="contained" onClick={verifyHandler}>
                  Verify
                </Button>
              </Stack>
            </Box>
          </Paper>
        </div>
      </Fade>
    </>
  );
}
