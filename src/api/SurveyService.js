import {
  getClientDataByPartitionKey,
  getClientDataByClientID,
  updateClientData
} from "./AZTableService";
import {
  ROW_KEY,
  PARTITION_KEY,
  SURVEY_TYPE_MAP
  // SURVEY_ID_MAP
} from "@/common/constants";
import { generateRowKey } from "@/helper-functions/survey-helpers";

export default {
  sortByAssessmentDate(surveyDataObject) {
    const result = surveyDataObject.sort((a, b) => {
      let aDate = new Date(Date.parse(a["SurveyData"]["AssessmentDate"]));
      let bDate = new Date(Date.parse(b["SurveyData"]["AssessmentDate"]));
      if (aDate > bDate) return -1;
      if (aDate < bDate) return 1;
      return 0;
    });
    return result;
  },
  canPrefill(survey, questionName, prefillData) {
    const question = survey.getQuestionByName(questionName);
    // if (!question) {
    //   console.log("No question in current survey with Prefill question name: ",)
    // }
    if (!prefillData) return false;

    // if not a 'choice list', assume that we can prefill
    if (!["radiogroup", "dropdown", "checkbox"].includes(question.getType())) {
      return true;
    }
    const choiceList = question.choices.map(c => c.itemValue);
    let copyPrefilData = [];
    if (prefillData.constructor === Array) copyPrefilData = prefillData;
    else copyPrefilData.push(prefillData);

    const extraInPrefillData = copyPrefilData.filter(
      p => !choiceList.includes(p)
    );
    if (extraInPrefillData.length > 0) {
      console.log(
        `Prefill data "${copyPrefilData}" for question:${questionName} had these un-prefilllable value(s): ${extraInPrefillData}. Available values: `,
        choiceList
      );
      return true;
    }
    // can prefill some
    if (extraInPrefillData.length < copyPrefilData.length) {
      return true;
    }
    //prefill data had more items for this control (radio group, checkbox/dropdown) than
    // it could match with the avialble list in the survey questionnaire
    return false;
  },
  async getBySLK(slk, userMode) {
    let result = await getClientDataByPartitionKey(slk, userMode);
    return this.sortByAssessmentDate(result);
  },

  async getByIDAndType(id, idType, userMode) {
    const result = await getClientDataByClientID(id, idType, userMode);
    return this.sortByAssessmentDate(result);
  },

  async createData(SLK, rowData, keyDate, userMode) {
    const { AssessmentType, Program } = rowData;
    const assTypeCode = SURVEY_TYPE_MAP[AssessmentType];
    if (!assTypeCode) {
      alert(
        `Assessement Type was  undeinfed ${AssessmentType}. Survey Can't be saved`
      );
      return undefined;
    }
    rowData[ROW_KEY] = generateRowKey(assTypeCode, Program, keyDate);
    rowData[PARTITION_KEY] = SLK;
    console.log(` in create data ${SLK}, ${rowData[ROW_KEY]}`);

    // if (rowData["SurveyData"]["DB_ID"]) {
    //   rowData["ClientID"] = rowData["SurveyData"]["clientID"];
    //   rowData["SourceDatabase"] = rowData["SurveyData"]["idType"];
    //   delete rowData["SurveyData"]["clientID"];
    //   delete rowData["SurveyData"]["idType"];
    // }
    return await updateClientData(rowData, userMode);
  },
  async updateData(rowData, userMode) {
    //const { SurveyName, Program } = rowData;
    //rowData[ROW_KEY] = generateRowKey(SURVEY_TYPE_MAP[SurveyName], Program);
    //rowData[PARTITION_KEY] = SLK;

    return await updateClientData(rowData, userMode);
  }
};
