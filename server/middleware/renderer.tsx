import { Handler } from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import { StaticRouter } from 'react-router-dom';
import manifest from '../../build/asset-manifest.json';
import App from '../../src/App';
import { fetchLaunches } from '../../src/service';

const serverRenderer: Handler = async (req, res, next) => {
  // point to the html file created by CRA's build tool
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(500).end();
    }

    fetchLaunches().then((launches) => {
      const modules: string[] = [];

      const html = ReactDOMServer.renderToString(
        <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
          <StaticRouter
            location={{
              pathname: req.path,
              state: { initialLaunches: launches },
            }}
          >
            <App />
          </StaticRouter>
        </Loadable.Capture>,
      );

      const chunkNames = modules.map((moduleName) => {
        const match = moduleName.match(/\w+$/)?.[0];

        if (!match) {
          throw new Error(`Could not extract name from module "${moduleName}"`);
        } else {
          return manifest.files[
            `${match}.js` as keyof typeof manifest['files']
          ];
        }
      });

      res.send(
        htmlData.replace(
          '<div id="root"></div>',
          `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
            launches,
          ).replace('<', '\\u003c')}
        </script>
        <div id="root">${html}</div>
        ${chunkNames
          .map((chunkName) => `<script src="${chunkName}"></script>`)
          .join('\n')}`,
        ),
      );
    });
  });
};

export default serverRenderer;
