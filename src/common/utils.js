function checkAssign(objectToAssign, data, errors) {
  for (const x of Object.keys(data)) {
    let sourceObj = data[x];
    if (!sourceObj) {
      errors[x] = `Missing ${x}`;
      return -1;
    }
    objectToAssign[x] = sourceObj;
  }
  return 1;
}

async function promisify(object, fn, ...args) {
  return new Promise((resolve, reject) => {
    let promiseHandling = (err, result) => {
      if (err) reject(err);
      else resolve(result);
    };
    args.push(promiseHandling);
    fn.apply(object, args);
  });
}

export { checkAssign, promisify };
