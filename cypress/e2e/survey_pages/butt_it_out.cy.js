import {
  checkDeepNestedRadio,
  selectDropdownOption,
  selectDropdownWithAria,
  textareaWithinDiv,
  // checkboxes,
  // checkboxesWithinDiv,
  checkboxesWithinDiv2,
  selectRadioOption,
  inputTypeWithinDiv
} from "./utils.js";

export function page_ProgramAndStaff(atom_data) {
  // selectRadioOption("Program", atom_data[]); // a;lwys Butt it out
  selectRadioOption("Staff", "Aftab.Jalal");
  selectRadioOption("ReferredFrom", atom_data["ReferredFrom"]);
  checkboxesWithinDiv2("DiversityList", atom_data["DiversityList"]);
}

export function smoking(atom_data) {
  checkDeepNestedRadio("DoYouSmoke", "Both");
  checkDeepNestedRadio("HowLongSmoked", atom_data["HowLongSmoked"]);
  if (atom_data["TobaccoAsSpin"] !== undefined) {
    checkDeepNestedRadio("TobaccoAsSpin", atom_data["TobaccoAsSpin"]);
  }
  checkDeepNestedRadio("MotivationToQuit", atom_data["MotivationToQuit"]);
  checkDeepNestedRadio(
    "ConfidentQuittingReducing",
    atom_data["ConfidentQuittingReducing"]
  );
  checkDeepNestedRadio(
    "HowManyTimesQuitSmoking",
    atom_data["HowManyTimesQuitSmoking"]
  );
  checkDeepNestedRadio("HowManagingQuitting", atom_data["HowManagingQuitting"]);
  checkDeepNestedRadio("HowMuchDoYouKnow", atom_data["HowMuchDoYouKnow"]);
}

export function smoking_notes_quitline(atom_data) {
  textareaWithinDiv("SmokingITSPNotes", atom_data["SmokingITSPNotes"]);
  textareaWithinDiv("SmokingITSPGoals", atom_data["SmokingITSPGoals"]);
  checkDeepNestedRadio("QuitlineReferral", atom_data["QuitlineReferral"]);
}

export function officialUseOnly(atom_data) {
  checkboxesWithinDiv2("FinalChecklist", atom_data["FinalChecklist"]);
}

export function physicalHealth(atom_data) {
  selectRadioOption(
    "Past4WkPhysicalHealth",
    atom_data["Past4WkPhysicalHealth"]
  );

  checkboxesWithinDiv2("InterventionType", atom_data["InterventionType"]);
}
