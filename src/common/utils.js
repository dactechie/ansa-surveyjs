import { MILLIS_IN_DAY } from "@/common/constants";

function getFriendlyTimestampString(dateObj) {
  return `${dateObj.toLocaleDateString("en-au", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })} ${dateObj.toLocaleTimeString()}`;
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
  const { year, month, day } = getCurrentYearMonthDay();
  const monthStr = `${month}`.padStart(2, "0");
  const dateStr = `${day}`.padStart(2, "0");
  return `${year}${separator}${monthStr}${separator}${dateStr}`;
}

// how much older since 3 months ago
// if negative , newer, can use

function gapInDays(yyyy_mm_dd) {
  //passed-in-date

  const [y, m, d] = yyyy_mm_dd.split("-");
  const passedInTime = new Date(y, m - 1, d).getTime();

  const currentTime = new Date().getTime();

  return (currentTime - passedInTime) / MILLIS_IN_DAY;
}

const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Validates that the input string is a valid date formatted as "ddmmyyyy"
function isValidDate(dayStr, monthStr, yearStr) {
  const [day, month, year] = [
    parseInt(dayStr),
    parseInt(monthStr),
    parseInt(yearStr)
  ];

  // Check the ranges of month and year
  if (year < 1910 || year > 2050 || month == 0 || month > 12) return false;

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;

function sumUp(list) {
  const result = list.reduce(reducer);
  console.log("SSDS SCORE ", result);
  return result;
}

export {
  getCurrentYearMonthDay,
  getCurrentYearMonthDayString,
  getFriendlyTimestampString,
  gapInDays,
  sumUp,
  isValidDate
};
