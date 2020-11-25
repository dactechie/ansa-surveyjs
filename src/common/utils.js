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

function getFriendlyTimestampString(dateObj) {
  return `${dateObj.toLocaleDateString("en-au", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })} ${dateObj.toLocaleTimeString()}`;
}

function getCurrentTimestamp() {
  return getFriendlyTimestampString(new Date());
}

function getCurrentYearMonthDay() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
}

function getCurrentYearMonthDayString(separator = "") {
  let { year, month, day } = getCurrentYearMonthDay();
  const monthStr = `${month}`.padStart(2, "0");
  const dateStr = `${day}`.padStart(2, "0");
  return `${year}${separator}${monthStr}${separator}${dateStr}`;
}

export {
  checkAssign,
  promisify,
  getCurrentYearMonthDay,
  getCurrentYearMonthDayString,
  getCurrentTimestamp,
  getFriendlyTimestampString
};
