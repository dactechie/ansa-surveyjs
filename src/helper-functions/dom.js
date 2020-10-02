import { checkAssign } from "../common/utils";
import { calculateSLK } from "./slk";

export function getLookupDetails(picked_type) {
  let id_type = "slk";
  if (picked_type === "by_name") {
    let lookupDetails = {};
    let slkObj = {
      Firstname: document.getElementById("fname").value,
      Surname: document.getElementById("lname").value,
      DOB: document.getElementById("dob").value,
      Sex: document.querySelector('input[name="sex"]:checked').value
    };
    let errors = {};
    const result = checkAssign(lookupDetails, slkObj, errors);

    if (result == -1) {
      console.log("Nothing to lookup. Has errors.", errors);
      return { id_val: undefined, id_type: undefined, errors: errors };
    }

    return {
      ClientID: calculateSLK(lookupDetails),
      IDType: id_type,
      errors: undefined
    };
  }
  id_type = document.querySelector('input[name="lookup_id"]:checked').id;

  return {
    ClientID: document.getElementById("id_val").value,
    IDType: id_type,
    errors: undefined
  };
}
