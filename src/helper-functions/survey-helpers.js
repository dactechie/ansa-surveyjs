import { getCurrentYearMonthDayString } from "@/common/utils";

export function generateRowKey(surveyTypeCode, program) {
  // SAPPHIRE_INAS_20201009
  return `${program}_${surveyTypeCode}_${getCurrentYearMonthDayString()}`;
}
