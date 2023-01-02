const app = require("./app");
const mongoose = require("./src/db/index");

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.URL_DB)
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
