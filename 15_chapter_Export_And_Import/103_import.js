import { formatToUppercase } from "./testUtil.js";
import { BASE_URL as URL } from "./testUtil.js";

import { logMessage } from "./logger.js"; // named Export
import defaultLogMessage from "./logger.js";  // For default export {} is not required

logMessage(formatToUppercase(URL));
defaultLogMessage(URL);

