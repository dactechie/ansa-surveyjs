import { MILLIS_IN_DAY } from "@/common/constants";

function calculateAgeFromSLK(slk) {
  // Extract date of birth from SLK-581
  // SLK-581 format: CCCCCDDMMYYYYX
  const dobString = slk.substring(5, 13);
  const day = parseInt(dobString.substring(0, 2));
  const month = parseInt(dobString.substring(2, 4)) - 1; // JS months are 0-indexed
  const year = parseInt(dobString.substring(4, 8));

  const dob = new Date(year, month, day);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

function getFriendlyTimestampString(dateObj) {
  return `${dateObj.toLocaleDateString("en-au", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })} ${dateObj.toLocaleTimeString()}`;
}

function _getCurrentYearMonthDay() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
}

function getCurrentYearMonthDayString(separator = "") {
  const { year, month, day } = _getCurrentYearMonthDay();
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

export {
  getCurrentYearMonthDayString,
  getFriendlyTimestampString,
  gapInDays,
  isValidDate,
  calculateAgeFromSLK
};
