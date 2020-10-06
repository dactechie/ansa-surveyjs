function checkAssign(objectToAssign, data, errors) {
  // could use reduce , but we're accuumulating in two objects here.
  for (const x of Object.keys(data)) {
    let sourceObj = data[x];
    if (!sourceObj) {
      errors[x] = `Missing ${x}`;
    }
    objectToAssign[x] = sourceObj;
  }
  if (Object.keys(errors).length > 0) {
    return -1;
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

function getCurrentYearMonthDay() {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
}

function getCurrentYearMonthDayString() {
  const { year, month, day } = getCurrentYearMonthDay();
  return `${year}${month}${day}`;
}

export {
  checkAssign,
  promisify,
  getCurrentYearMonthDay,
  getCurrentYearMonthDayString
};
