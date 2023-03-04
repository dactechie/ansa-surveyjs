import { checkDeepNestedRadio } from "../utils.js";

export function CDS5() {
  checkDeepNestedRadio("CDS5RateAddictiontoCigarettes", "1");
  checkDeepNestedRadio("CDS5HowManyCigarettesPerDay", "2");
  checkDeepNestedRadio("CDS5HowSoonAfterWaking", "3");
  checkDeepNestedRadio("CDS5HowHardIsQuitting", "4");
  checkDeepNestedRadio("CDS5HowStrongTheUrgeToSmoke", "5");
}
