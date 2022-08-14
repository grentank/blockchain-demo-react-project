import React from 'react';
import { renderToString } from 'react-dom/server';
import Layout from '../components/Layout';

export default function layout(req, res, next) {
  res.layout = (initState) => {
    const layoutComponent = React.createElement(Layout, { initState });
    const html = renderToString(layoutComponent);
    res.write('<!DOCTYPE html>');
    res.end(html);
  };
  next();
}
