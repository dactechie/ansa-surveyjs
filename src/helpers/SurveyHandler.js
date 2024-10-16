
import {
  PREFILL_EXCLUSIONS_ALLCASES,
  PREFILL_EXCLUSIONS,
  MANDATORY_FIELDS
} from "@/common/constants";
import { getCurrentYearMonthDayString } from "@/common/utils";
import SurveyService from "@/api/SurveyService";

// const methods = {
//   ...mapActions(["ADD_SURVEY_DATASERVER", "UPDATE_SURVEY_DATASERVER"])
// };
const mandatoryFieldList = MANDATORY_FIELDS.split(",");

// SurveyHandler.js
export default class SurveyHandler {
  // static validateBeforeSave(surveyComp) {
  //   if (!surveyComp.isProgramSet) {
  //     surveyComp.logError("Program not set. Unable to save");
  //     return false;
  //   }
  //   return true;
  // }
  static saveSurvey(surveyComp, surveyData, status, surveyId) {
    console.log("Saving survey data", surveyData, " with status: ", status);
    // Logic to save survey
    const response = surveyComp.ADD_SURVEY_DATASERVER({
      SLK: surveyComp.$store.state.currentClientSLK,
      surveyData: surveyData,
      surveyId: surveyId, //surveyComp.$route.params.surveyid,
      //surveyName: this.$store.state.surveyName,
      status: status
    });
    console.log("save survey response :::: ", response);

    // You can use your API calls here
    return response;
  }

  static performPrefill(surveyComp, sender, prefillSurvey) {
    let prefillSurveyData = prefillSurvey["SurveyData"];
    const allCasesPrefillExclusions = PREFILL_EXCLUSIONS_ALLCASES.split(",");

    const prefillQuestionNamesList = sender
      .getAllQuestions(false) //even hidden questions (they maybe hidd)
      .map(q => q.name)
      .filter(qname => !allCasesPrefillExclusions.includes(qname)); // exclude scores
    // some questions have a comment field which is not returned in the by getAllQuestions
    //so include those as well
    const prefillCommentQuestionsList = sender
      .getAllQuestions(false)
      .filter(q => q.hasComment);

    let canPrefillQuestionNamesList = [];
    let canPrefillCommentQuestionsList = [];
    if (
      !surveyComp.isContinuingSurvey() //&&
      //prefillSurvey["Status"] !== "Incomplete"
    ) {
      const prefillExclusionList = PREFILL_EXCLUSIONS.split(",");
      prefillSurveyData["AssessmentDate"] = getCurrentYearMonthDayString("-");
      // we're not continuing an incomplete survey, but starting a new one (with prefill)
      //exclude Issues, Goals
      canPrefillQuestionNamesList = prefillQuestionNamesList
        .filter(qname => !prefillExclusionList.includes(qname))
        .filter(qname =>
          SurveyService.canPrefill(
            surveyComp.survey,
            qname,
            prefillSurveyData[qname]
          )
        );
      canPrefillCommentQuestionsList = prefillCommentQuestionsList.filter(q =>
        canPrefillQuestionNamesList.includes(q.name)
      );
    } else {
      //
      // if continuing a survey, we want to prefill everything which had data in it.
      //
      canPrefillQuestionNamesList = prefillQuestionNamesList;
      canPrefillCommentQuestionsList = prefillCommentQuestionsList;

      surveyComp.survey.setValue("Program", prefillSurvey["Program"]);
      surveyComp.survey.setValue("Staff", prefillSurvey["Staff"]);
    }

    canPrefillQuestionNamesList.forEach(qname => {
      surveyComp.survey.setValue(qname, prefillSurveyData[qname]);
    });
    canPrefillCommentQuestionsList.forEach(commentQuestion => {
      commentQuestion.comment =
        prefillSurveyData[`${commentQuestion.name}-Comment`];
    });
  }

  static getMissingMandatoryFields(me) {
    let missingFieldPageQuestionNames = [];
    let answeredKeys = Object.keys(me.survey.getAllValues());
    const missingMandatoryFields = [];

    me.survey
      .getAllQuestions(true) //true=> visible
      .filter(
        e =>
          (mandatoryFieldList.includes(e.name) || e.isRequired) &&
          !answeredKeys.includes(e.name)
      )
      // get all mandatory & visible but not answered questions

      .forEach(e => {
        if (!me.survey.getValue(e.name)) {
          missingMandatoryFields.push(e.name);
          missingFieldPageQuestionNames.push(`Question: ${e.title} \n`); // Page:${e.page.title} :
        }
      });
    return { missingMandatoryFields, missingFieldPageQuestionNames };
  }
}
