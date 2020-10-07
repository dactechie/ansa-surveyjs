import { getCurrentYearMonthDayString } from "@/common/utils";

export function generateRowKey(surveyTypeCode, program) {
  // SAPPHIRE_INAS_20201009
  return `${program}_${surveyTypeCode}_${getCurrentYearMonthDayString()}`;
}

export function serializeDeepObjects(surveyObj) {
  const surveyObjClone = { ...surveyObj };
  const objs = [
    "AODHistory",
    "OtherDrugsOfConcern",
    "SurveyMeta",
    "additive_behaviours",
    "aod_harms_risks"
  ];
  // eslint-disable-next-line
  objs.forEach((e) => {
    surveyObjClone[e] = JSON.stringify(surveyObj[e]);
    // let str;
    // surveyObj[e].forEach(elem => {
    //   JSON.stringify(elem)
    // });
  });
  return surveyObjClone;
}

export function deSerializeDeepObjects(surveyObj) {
  const surveyObjClone = { ...surveyObj };
  const objs = [
    "AODHistory",
    "OtherDrugsOfConcern",
    "SurveyMeta",
    "additive_behaviours"
  ];
  // eslint-disable-next-line
  objs.forEach((e) => {
    surveyObjClone[e] = JSON.parse(surveyObj[e]);
    // let str;
    // surveyObj[e].forEach(elem => {
    //   JSON.stringify(elem)
    // });
  });
  return surveyObjClone;
}
