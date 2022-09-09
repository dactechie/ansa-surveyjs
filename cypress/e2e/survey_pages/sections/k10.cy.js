import {
  checkDeepNestedRadio,
  inputTypeWithinDiv,
  selectDropdownOption
} from "../utils.js";

export function k10() {
  checkDeepNestedRadio("K10Q01", "1");
  checkDeepNestedRadio("K10Q02", "2");
  checkDeepNestedRadio("K10Q03", "3");
  checkDeepNestedRadio("K10Q04", "4");
  checkDeepNestedRadio("K10Q05", "5");
  checkDeepNestedRadio("K10Q06", "4");
  checkDeepNestedRadio("K10Q07", "3");
  checkDeepNestedRadio("K10Q08", "2");
  checkDeepNestedRadio("K10Q09", "1");
  checkDeepNestedRadio("K10Q10", "2");
}

export function k10_plus() {
  selectDropdownOption("K10Q11", "2");
  selectDropdownOption("K10Q12", "12");
  selectDropdownOption("K10Q13", "7");

  checkDeepNestedRadio("K10Q14", "5");
  checkDeepNestedRadio("K10CompletedBy", "ReferringGP");

  inputTypeWithinDiv("DateOfK10", "date", "2021-12-31");
}
