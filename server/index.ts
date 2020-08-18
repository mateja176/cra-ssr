import express from 'express';
import 'ignore-styles';
import path from 'path';
import Loadable from 'react-loadable';
// we'll talk about this in a minute:
import serverRenderer from './middleware/renderer';

const PORT = 3000;

// initialize the application and create the routes
const app = express();
const router = express.Router();

// other static resources should just be served as they are
router.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' }),
);

// else serve rendered page
router.get('*', serverRenderer);

// tell the app to use the above rules
app.use(router);

// start the app
Loadable.preloadAll().then(() => {
  app.listen(PORT, (error) => {
    // ...
    console.log(`http://localhost:${PORT}`);
  });
});
