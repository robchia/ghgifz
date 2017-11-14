import * as fs from 'fs';
import { Config } from '../src/config/config';
import { Giphy } from '../src/lib/giphy';

const filePath = './data/giphy-ids.json';
const contents = fs.readFileSync(filePath, 'utf8');
const ids = JSON.parse(contents).ids;

Giphy.gifs(ids, (json) => {
  const gifsFilePath = './data/gifs.json';
  const versionPath = './data/gifs.version';
  const timestamp = (new Date()).getTime();

  fs.writeFile(gifsFilePath, JSON.stringify({ version: timestamp, gifs: json.data }, null, 2), (err) => {
    fs.writeFile(versionPath, timestamp, (err) => {
      console.log(ids.length, 'gifs saved');
    });
  });
});
