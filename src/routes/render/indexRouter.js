import express from 'express';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const initState = { path: req.originalUrl };
    res.layout(initState);
  });

router.route('/hash')
  .get((req, res) => {
    const initState = { path: req.originalUrl };
    res.layout(initState);
  });

router.route('/block')
  .get((req, res) => {
    const initState = { path: req.originalUrl };
    res.layout(initState);
  });

export default router;
