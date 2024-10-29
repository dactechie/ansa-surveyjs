// import { getCurrentYearMonthDayString } from "@/common/utils";

export function generateRowKey(surveyTypeCode, program, dateString) {
  // SAPPHIRE_INAS_20201009
  return `${program}_${surveyTypeCode}_${dateString}`;
}

const MILLIS_IN_DAY = 86_400_000; // 1000 * 60 * 60 * 24

export function getDaysDifference(date1, date2) {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  const diffInMs = Math.abs(d1 - d2);
  return Math.floor(diffInMs / MILLIS_IN_DAY);
}
