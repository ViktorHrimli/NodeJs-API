const app = require("./app");
const mongoose = require("./src/db/index");

mongoose.set("strictQuery", true);

const { URL_DB, PORT } = process.env;

mongoose
  .connect(URL_DB)
  .then(() => {
    app.listen(PORT || 3001, () => {
      console.log("Server running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
