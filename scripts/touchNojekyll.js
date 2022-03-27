const fs = require("fs");

// Without this file in /out Next.js app deployed to GitHub pages won't work corrently
fs.closeSync(fs.openSync("./out/.nojekyll", "w"));
