import {
  checkDeepNestedRadio,
  checkboxesWithinDiv2,
  textareaWithinDiv
} from "../utils.js";

export function hono() {
  checkDeepNestedRadio("HONOSAssessment", "Yes");
  checkDeepNestedRadio("HONOSQ1", "4");
  checkDeepNestedRadio("HONOSQ2", "0");
  checkDeepNestedRadio("HONOSQ3", "9");
  checkDeepNestedRadio("HONOSQ4", "4");
  checkDeepNestedRadio("HONOSQ5", "3");
  checkDeepNestedRadio("HONOSQ6", "2");
  checkDeepNestedRadio("HONOSQ7", "4");
  checkDeepNestedRadio("HONOSQ8", "1");
  checkboxesWithinDiv2("HONOSQ8a", ["B", "F", "J"]);
  textareaWithinDiv("HONOSQ8a", "these are some notes for HONO Others");

  checkDeepNestedRadio("HONOSQ9", "3");
  checkDeepNestedRadio("HONOSQ10", "2");
  checkDeepNestedRadio("HONOSQ11", "1");
  checkDeepNestedRadio("HONOSQ11", "3");
}
