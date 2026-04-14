import fs from "fs";
import { colors } from "../configs/colors.js";
import { logSuccess, logError, logResult, logErrorRequired, logErrorUrlFormat, logValid, logErrorString, logUseDefault, logErrorColorFormat, logErrorBoolean, logErrorEmailFormat, logErrorWhiteSpace, logErrorEnum, logErrorArrayContainString, logErrorArrayString, logInfo, logWarningEmpty } from "../configs/log.js";
import { socialBrand } from "../src/utils/socialBrand.js";
import { techBrand } from "../src/utils/techBrand.js";
import { projectStatus } from "../src/utils/statusEnum.js";
import { defaultImage } from "../src/utils/defaultImage.js";

const CONFIG_PATH = "./data/config.json";
const PROJECTS_PATH = "./data/projects.json";
const REPOSITORIES_PATH = "./data/repositories.json";

const isUrl = (str) => /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(str);
const isEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
const isColor = (str) => /^#[0-9A-Fa-f]{6}$/.test(str);

function readJson(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    if (!data.trim()) throw new Error("File is empty");
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Critical: ${filePath} -> ${err.message}`);
  }
}

// config.json
function validateConfig(config) {
  console.log(`\n${colors.cyan}Validating config.json ...${colors.reset}`);
  let valid = true;

  // githubUsername
  if (!config.githubUsername || config.githubUsername.trim() === "") {
    logErrorRequired("githubUsername");
    valid = false;
  } else if (typeof config.githubUsername !== "string") {
    logErrorString("githubUsername");
    valid = false;
  } else {
    logValid("githubUsername");
  }

  // githubUrl
  if (config.githubUrl) {
    if (!isUrl(config.githubUrl)) {
      logErrorUrlFormat("githubUrl");
      valid = false;
    } else {
      logValid("githubUrl");
    }
  } else {
    logUseDefault("githubUrl", "https://github.com/[githubUsername]")
  }

  // webTitle
  if (config.webTitle) {
    if (typeof config.webTitle !== "string") {
      logErrorString("webTitle");
      valid = false;
    } else if (config.webTitle.trim() === "") {
      logErrorWhiteSpace("webTitle");
      valid = false;
    } else {
      logValid("webTitle");
    }
  }

  // title, subtitle
  ["title", "subtitle"].forEach(field => {
    if (!config[field] || config[field].trim() === "") {
      logErrorRequired(field);
      valid = false;
    } else if (typeof config[field] !== "string") {
      logErrorString(field);
      valid = false;
    } else {
      logValid(field);
    }
  });

  // lightThemeColor, darkThemeColor
  ["lightThemeColor", "darkThemeColor"].forEach(field => {
    if (config[field]) {
      if (!isColor(config[field])) {
        logErrorColorFormat(field);
        valid = false;
      } else {
        logValid(field);
      }
    } else {
      switch (field) {
        case "lightThemeColor":
          logUseDefault(field, "#0000FF");
          break;
        case "darkThemeColor":
          logUseDefault(field, "#BB86FC");
          break;
        default:
      };
    }
  });

  // useLocalJson
  if (config.useLocalJson !== undefined) {
    if (typeof config.useLocalJson !== "boolean") {
      logErrorBoolean("useLocalJson");
      valid = false;
    } else if (config.useLocalJson === false) {
      logResult("info", `Field "${colors.bright}useLocalJson${colors.reset}" feature is under development; it won't change anything if set to false (default is true)`);
    }
  }

  // email
  if (config.email) {
    if (!isEmail(config.email)) {
      logErrorEmailFormat("email");
      valid = false;
    } else {
      logValid("email");
    }
  }

  // socialMedia
  if (config.socialMedia) {
    if (!Array.isArray(config.socialMedia)) {
      logResult("error", "socialMedia must be an array");
      valid = false;
    } else {
      const brandName = Object.keys(socialBrand);
      config.socialMedia.forEach((social, idx) => {
        // socialMedia.name
        if (!social.name) {
          logErrorRequired(`socialMedia[${idx}] name`);
          valid = false;
        } else if (!brandName.includes(social.name)) {
          logErrorEnum(`socialMedia[${idx}] name`, `social media name: ${colors.dim}${brandName.join(", ")}${colors.reset}`);
          valid = false;
        }
        // socialMedia.url
        if (!social.url) {
          logErrorRequired(`socialMedia[${idx}] URL`);
          valid = false;
        } else if (!isUrl(social.url)) {
          logErrorUrlFormat(`socialMedia[${idx}] URL`);
          valid = false;
        }
      });
      if (valid) logValid(`socialMedia (${config.socialMedia.length} items)`);
    }
  }

  return valid;
}

// projects.json
function validateProjects(projects) {
  console.log(`\n${colors.cyan}Validating projects.json ...${colors.reset}`);
  let valid = true;

  if (!Array.isArray(projects)) {
    logError(`"${colors.bright}projects.json${colors.reset}" must be an Array`);
    return false;
  }

  projects.forEach((p, i) => {
    const projectName = p.name || `Unnamed Project @ index ${i}`;
    console.log(`\n ${colors.bright}[${i + 1}] ${projectName}${colors.reset}`);

    // name
    if (!p.name || p.name.trim() === "") {
      logErrorRequired("name");
      valid = false
    } else if (typeof p.name !== "string") {
      logErrorString("name");
      valid = false;
    } else {
      logValid("name");
    }

    // description, field
    ["description", "field"].forEach(field => {
      if (!p[field] || p[field].trim() === "") {
        logWarningEmpty(field);
      } else if (typeof p[field] !== "string") {
        logErrorString(field);
        valid = false;
      } else {
        logValid(field);
      }
    });

    // status
    if (!p.status) {
      logWarningEmpty("status");
    } else if (!projectStatus.includes(p.status)) {
      logErrorEnum("status", `project status: ${colors.dim}${projectStatus.join(", ")}${colors.reset}`);
      valid = false;
    } else {
      logValid("status");
    }

    // fullDescription
    if (p.fullDescription) {
      if (Array.isArray(p.fullDescription)) {
        if (!p.fullDescription.every(item => typeof item === "string")) {
          logErrorArrayContainString("error", "fullDescription (Array)");
          valid = false;
        } else {
          logValid("fullDescription (Array)");
        }
      } else if (typeof p.fullDescription === "string") {
        logValid("fullDescription (String)");
      } else {
        logErrorArrayString("fullDescription");
        valid = false;
      }
    } else {
      logUseDefault("fullDescription", "description");
    }

    // projectUrl, productUrl
    ["projectUrl", "productUrl"].forEach(field => {
      if (p[field]) {
        if (!isUrl(p[field])) {
          logErrorUrlFormat(field);
          valid = false;
        } else {
          logValid(field);
        }
      }
    });

    // techStack
    if (!p.techStack || !Array.isArray(p.techStack) || p.techStack.length === 0) {
      logWarningEmpty("techStack");
      valid = false;
    } else {
      const allowedTechs = Object.keys(techBrand);
      p.techStack.forEach((tech, idx) => {
        if (!tech.name) {
          logErrorRequired(`techStack[${idx}].name`);
          valid = false;
        } else if (!allowedTechs.includes(tech.name)) {
          logErrorEnum(`techStack[${idx}].name`, "techBrand on documentation");
          valid = false;
        }
      });
      if (valid) logValid(`techStack (${p.techStack.length} items)`);
    }

    // thumbnailImage
    if (p.thumbnailImage) {
      if (typeof p.thumbnailImage !== "string") {
        logErrorString("thumbnailImage");
        valid = false;
      } else {
        logValid("thumbnailImage");
      }
    } else {
      logUseDefault("thumbnailImage", defaultImage);
    }

    // thumbnailImageAlt
    if (p.thumbnailImageAlt) {
      if (typeof p.thumbnailImageAlt !== "string") {
        logErrorString("thumbnailImageAlt");
        valid = false;
      } else {
        logValid("thumbnailImageAlt");
      }
    }

    // modalImages
    if (p.modalImages) {
      if (!Array.isArray(p.modalImages)) {
        logErrorArray("modalImages");
        valid = false;
      } else {
        p.modalImages.forEach((img, idx) => {
          // modalImages.fileName
          if (!img.fileName) {
            logErrorRequired(`modalImages[${idx}].fileName`);
            valid = false;
          } else if (typeof img.fileName !== "string") {
            logErrorString(`modalImages[${idx}].fileName`);
            valid = false;
          }

          // modalImages.alt
          if (img.alt && typeof img.alt !== "string") {
            logErrorString(`modalImages[${idx}].alt`);
            valid = false;
          }
        });
        if (valid) logValid(`modalImages (${p.modalImages.length} items)`);
      }
    }
  });

  return valid;
}

// repositoriesitories.json
function validateRepositories(repositories) {
  console.log(`\n${colors.cyan}Validating repositories.json ...${colors.reset}`);
  let valid = true;

  if (!Array.isArray(repositories)) {
    logError(`Data must be an array`);
    return false;
  }

  if (repositories.length === 0) {
    logInfo(`"${colors.bright}repositories.json${colors.reset}" is empty. Skipping validation`);
    return true;
  }

  repositories.forEach((r, i) => {
    const repositoryName = r.repoName || `Unnamed Repository @ index ${i}`;
    console.log(`\n ${colors.bright}[${i + 1}] ${repositoryName}${colors.reset}`);

    // repoName
    if (!r.repoName || r.repoName.trim() === "") {
      logErrorRequired("repoName");
      valid = false;
    } else if (typeof r.repoName !== "string") {
      logErrorString("repoName");
      valid = false;
    } else {
      logValid("repoName");
    }

    // repoDesc
    if (r.repoDesc) {
      if (typeof r.repoDesc !== "string") {
        logErrorString("repoDesc");
        valid = false;
      } else {
        logValid("repoDesc");
      }
    }

    // repoUrl
    if (!r.repoUrl || r.repoUrl.trim() === "") {
      logErrorRequired("repoUrl");
      valid = false;
    } else if (!isUrl(r.repoUrl)) {
      logErrorUrlFormat("repoUrl");
      valid = false;
    } else {
      logValid("repoUrl");
    }
  });

  return valid;
}

function main() {
  console.log(`${colors.bright}Starting Portfolio Template Validation...${colors.reset}`);
  
  try {
    if (!fs.existsSync(CONFIG_PATH)) throw new Error(`Missing ${CONFIG_PATH}`);
    if (!fs.existsSync(PROJECTS_PATH)) throw new Error(`Missing ${PROJECTS_PATH}`);

    const config = readJson(CONFIG_PATH);
    const projects = readJson(PROJECTS_PATH);
    const repositories = readJson(REPOSITORIES_PATH);

    const configValid = validateConfig(config);
    const projectsValid = validateProjects(projects);
    const repositoriesValid = validateRepositories(repositories);

    console.log("\n" + "=".repeat(40));
    if (configValid && projectsValid && repositoriesValid) {
      logSuccess("ALL TESTS PASSED!");
      process.exit(0);
    } else {
      logError("VALIDATION FAILED. Check the logs above.");
      process.exit(1);
    }

  } catch (err) {
    logError(err.message);
    process.exit(1);
  }
}

main();