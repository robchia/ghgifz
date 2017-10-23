import { Config } from '../src/config/config';
import { Giphy } from '../src/lib/giphy';
import * as fs from 'fs';

const filePath = './data/giphy-ids.json';
const contents = fs.readFileSync(filePath, 'utf8');
const ids = JSON.parse(contents).ids;

Giphy.gifs(ids, (json) => {
  const gifsFilePath = './data/gifs.json';
  fs.writeFile(gifsFilePath, JSON.stringify({ gifs: json.data }, null, 2), (err) => {
    console.log(json.data.length, 'gifs -> data/gifs.json');
  });
});
