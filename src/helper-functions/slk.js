function reverseCleanString(str) {
  return str
    .split("-")
    .reverse()
    .join("");
}

function getSLK(fname, lname, dob, sex) {
  let f = fname.replace(/([^a-z-]+)/gi, ""),
    s = lname.replace(/([^a-z-]+)/gi, ""),
    d = reverseCleanString(dob),
    x = sex;
  f = f.toUpperCase().padEnd(3, "9");
  s = s.toUpperCase().padEnd(5, "9");
  let name_part = `${s[1]}${s[2]}${s[4]}${f[1]}${f[2]}`;

  switch (x) {
    case "male":
      x = 1;
      break;
    case "female":
      x = 2;
      break;
    default:
      x = 9;
  }
  return `${name_part}${d}${x}`;
}

export { getSLK };
