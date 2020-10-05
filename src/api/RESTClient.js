//const fetch = require("node-fetch");

async function performRemoteDataOperation(url, options = {}, data = {}) {
  options["headers"] = { "Content-Type": "application/json" };
  if (data) {
    options["body"] = JSON.stringify(data);
  }
  return await fetch(url, options);
}

async function getDataAsync(url, data = {}) {
  let options = {
    method: "POST" // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
  };
  const response = await performRemoteDataOperation(url, options, data);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  let d = await response.json();

  console.log("//>>>>>>>>>>>>>", d);
  return d;
}

async function doPostAction(url, data = {}) {
  let options = {
    method: "POST" // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
  };
  options["headers"] = { "Content-Type": "application/json" };
  if (data) {
    options["body"] = JSON.stringify(data);
  }
  const response = await fetch(url, options);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  let d = await response.json();

  console.log(" response>>>>>", d);
  return d;
}

export { getDataAsync, doPostAction };
