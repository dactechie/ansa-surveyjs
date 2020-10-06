import { SURVEY_TYPE_MAP } from "@/common/constants";
import { getCurrentYearMonthDayString } from "@/common/utils";

export function generateRowKey(surveyTitle) {
  return `${SURVEY_TYPE_MAP[surveyTitle]}_${getCurrentYearMonthDayString()}`;
}
