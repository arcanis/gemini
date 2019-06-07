import Worker from 'worker-loader!./database.worker';

const worker = new Worker();
const requests: Array<(err?: Error, result?: any) => void> = [];

worker.onmessage = (ev: any) => {
  const callback = requests.shift(); 

  if (!callback)
    throw new Error(`Assertion failed: Expected a request to be pending`);

  callback(...ev.data);
};

export function query(q: string) {
  return new Promise<any>((resolve, reject) => {
    requests.push((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });

    worker.postMessage(q);
  });
}
