function reverseCleanString(str) {
  return str
    .split("-")
    .reverse()
    .join("");
}

function calculateSLK(c) {
  let f = c["Firstname"].replace(/([^a-z-]+)/gi, ""),
    s = c["Surname"].replace(/([^a-z-]+)/gi, ""),
    d = reverseCleanString(c["DOB"]),
    x = c["Sex"];

  f = f.toUpperCase().padEnd(2 - f.length, "9");
  s = s.toUpperCase().padEnd(5 - f.length, "9");
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

export { calculateSLK };
