import { MANDATORY_FIELDS } from "@/common/constants";

const mandatoryFieldList = MANDATORY_FIELDS.split(",");

// Helper function to check if field name matches FMQ pattern (FMQ1-FMQ30)
function isMandatoryByPattern(fieldName) {
  const fmqPattern = /^FMQ([1-9]|[12][0-9]|30)$/;
  return fmqPattern.test(fieldName);
}

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

  static getMissingMandatoryFields(me) {
    let missingFieldPageQuestionNames = [];
    let answeredKeys = Object.keys(me.survey.getAllValues());
    const missingMandatoryFields = [];

    me.survey
      .getAllQuestions(true) //true=> visible
      .filter(
        e =>
          (mandatoryFieldList.includes(e.name) ||
            isMandatoryByPattern(e.name) ||
            e.isRequired) &&
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
