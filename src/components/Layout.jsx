import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import store from '../Redux/serverStore';
// import store from '../Redux/store';
import App from './App';

export default function Layout({ initState, initStoreState }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.initState=${JSON.stringify(initState)}`,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__=${JSON.stringify(initStoreState)}`,
          }}
        />
        <link rel="stylesheet" href="/css/styles.css" />
        <link rel="stylesheet" href="/css/icons.css" />

        <script defer src="/js/app.js" />
        <script defer src="/js/vendor.js" />
        <title>Document</title>
      </head>
      <body>
        <div id="root">
          <StaticRouter location={initState.path}>
            <Provider store={store}>
              <App {...initState} />
            </Provider>
          </StaticRouter>
        </div>
      </body>
    </html>
  );
}
