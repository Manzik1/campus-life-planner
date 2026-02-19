// ===============================
// REGEX RULES 
// ===============================
const titleRegex = /^\S(?:.*\S)?$/;
const durationRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const tagRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
const duplicateRegex = /\b(\w+)\s+\1\b/i;

// ===============================
// VALIDATION
// ===============================
function validateTask(title, date, duration, tag) {

  if (!titleRegex.test(title)) {
    showMessage("Invalid title format.", true);
    return false;
  }

  if (duplicateRegex.test(title)) {
    showMessage("Duplicate words detected.", true);
    return false;
  }

  if (!dateRegex.test(date)) {
    showMessage("Invalid date format.", true);
    return false;
  }

  if (!durationRegex.test(duration)) {
    showMessage("Invalid duration.", true);
    return false;
  }

  if (!tagRegex.test(tag)) {
    showMessage("Invalid tag format.", true);
    return false;
  }

  return true;
}

