import { colors } from "./colors.js";

// Base log
export function logSuccess(message) {
  console.log(` ${colors.green}${colors.bright}SUCCESS${colors.reset} >> ${colors.white}${message}`);
}
export function logError(message) {
  console.log(` ${colors.red}${colors.bright}ERROR${colors.reset}   >> ${colors.red}${message}${colors.reset}`);
}
export function logInfo(message) {
  console.log(` ${colors.blue}${colors.bright}INFO${colors.reset}    >> ${colors.white}${message}`);
}
export function logWarning(message) {
  console.log(` ${colors.yellow}${colors.bright}WARNING${colors.reset} >> ${colors.yellow}${message}${colors.reset}`);
}
export function logResult(type, message) {
  let symbol = "";

  if (type === "info") {
    symbol = `${colors.blue}${colors.bright}\u2139 `;
  } else if (type === "success") {
    symbol = `${colors.green}${colors.bright}✅`;
  } else if (type === "warning") {
    symbol = `${colors.yellow}${colors.bright}⚠ `;
  } else if (type === "error") {
    symbol = `${colors.red}${colors.bright}❌`;
  } else {
    return;
  }

  console.log(`   ${symbol} ${colors.reset}${message}`);
}

// Validator log
export function logValid(field) {
  logResult("success", `Field "${colors.bright}${field}${colors.reset}" is valid`);
}
export function logUseDefault(field, defaultField) {
  logResult("info", `Field "${colors.bright}${field}${colors.reset}" is empty, using "${colors.dim}${defaultField}${colors.reset}" as default`);
}
export function logErrorRequired(field) {
  logResult("error", `Field "${colors.bright}${field}${colors.reset}" is required`);
}
export function logErrorEnum(field, enumsValue) {
  logResult("error", `Field "${colors.bright}${field}${colors.reset}" is invalid value. See allowed ${enumsValue}`);
}
export function logErrorWhiteSpace(field) {
  logResult("error", `Field "${colors.bright}${field}${colors.reset}" cannot contain white space only`);
}
export function logErrorString(field) {
  logResult("error", `Field "${colors.bright}${field}${colors.reset}" must be a string`);
}
export function logErrorBoolean(field) {
  logResult("error", `Field "${colors.bright}${field}${colors.reset}" must be a boolean (true or false)`);
}
export function logErrorArray(field) {
  logResult("error", `Field "${colors.bright}${field}${colors.reset}" must be an array`);
}
export function logErrorUrlFormat(field) {
  logResult("error", `Field "${colors.bright}${field}${colors.reset}" must be an URL format`);
}
export function logErrorColorFormat(field) {
  logResult("error", `Field "${colors.bright}${field}${colors.reset}" must be a hex color format`);
}
export function logErrorEmailFormat(field) {
  logResult("error", `Field "${colors.bright}${field}${colors.reset}" must be an email format`);
}
export function logErrorArrayString(field) {
  logResult("error", `Field "${colors.bright}${field}${colors.reset}" must be a string or array of string`);
}
export function logErrorArrayContainString(field) {
  logResult("error", `Field "${colors.bright}${field}${colors.reset}" array must contain string only`);
}
export function logWarningEmpty(field) {
  logResult("warning", `Field "${colors.bright}${field}${colors.reset}" is empty`);
}
export function logWarningArrayRequired(field) {
  logResult("warning", `Field "${colors.bright}${field}${colors.reset}" is empty, at least contain one object`);
}