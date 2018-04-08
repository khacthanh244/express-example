import { Router } from 'express';
import { readdirSync, existsSync } from 'fs';

const router = Router();
/* GET home page. */
// Import Router App
const rootFolder = `${__dirname}/`;

readdirSync(rootFolder).forEach((files, idx) => {
  if (files.match(/\.js$/) !== null && files !== 'index.js') {
    const name = files.replace('.js', '');
    router.use(`/${name}`, require(`./${files}`).default);
  } else if(files !== 'index.js' && files.match(/\_$/) === null) {
    if(existsSync(`${rootFolder}/${files}/index.js`)){
      router.use(`/${files}`, require(`./${files}/index`).default);
    }
  }
});

export default router;