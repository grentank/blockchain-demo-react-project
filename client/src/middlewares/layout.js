import React from 'react';
import { renderToString } from 'react-dom/server';
import Layout from '../components/Layout';
import store from '../Redux/serverStore';

export default function layout(req, res, next) {
  res.layout = (initState) => {
    const initStoreState = store.getState();
    const layoutComponent = React.createElement(Layout, { initState, initStoreState });
    const html = renderToString(layoutComponent);
    res.write('<!DOCTYPE html>');
    res.end(html);
  };
  next();
}
