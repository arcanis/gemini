import initSql               from 'sql.js';
// @ts-ignore
import sqlWasmPath           from 'sql.js/dist/sql-wasm.wasm';

// @ts-ignore
import listing               from './pokemon.db';

const dbPromise = Promise.all([
  // Initialize the wasm runtime
  initSql({locateFile: () => sqlWasmPath}),
  // Fetch the sqlite database
  fetch(listing).then(res => res.arrayBuffer()).then(buffer => new Uint8Array(buffer)),
]).then(([{Database}, data]) => {
  return new Database(data);
});

const queue: Array<string> = [];
let running = false;

const run = async (query: string) => {
  const db = await dbPromise;

  let message;
  try {
    message = [null, db.exec(query)[0]];
  } catch (error) {
    message = [error];
  }

  // @ts-ignore
  postMessage(message);
};

const tryRun = async () => {
  if (running)
    return;

  if (queue.length === 0)
    return;

  running = true;
  await run(queue.shift()!);
  running = false;

  tryRun();
};

self.onmessage = ev => {
  queue.push(ev.data);
  tryRun();
};
