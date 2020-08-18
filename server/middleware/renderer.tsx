import { Handler } from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../../src/App';

const serverRenderer: Handler = (req, res, next) => {
  // point to the html file created by CRA's build tool
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(500).end();
    }

    // render the app as a string
    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.path}>
        <App />
      </StaticRouter>,
    );

    // inject the rendered app into our html and send it
    return res.send(
      htmlData.replace('<div id="root"></div>', `<div id="root">${html}</div>`),
    );
  });
};

export default serverRenderer;
