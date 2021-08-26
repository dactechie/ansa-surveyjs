import { isValidDate } from "@/common/utils";

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
  f = f.toUpperCase().padEnd(3, "2");
  s = s.toUpperCase().padEnd(5, "2");
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

function isValidSLK(slkString) {
  const matchedList = slkString.match(
    /^[A-Z29]{5}(\d{2})(\d{2})(\d{4})[1,2,9]$/
  );
  if (matchedList === null) return false;

  return isValidDate(matchedList[1], matchedList[2], matchedList[3]);
}

export { getSLK, isValidSLK };
