// Weekly summary job. Runs every Monday at 13:00 UTC.
// For now it only logs. Reading Cosmos DB and sending email come later.

const { app } = require("@azure/functions");

app.timer("weeklySummary", {
  schedule: "0 0 13 * * 1",
  handler: async (timer, context) => {
    context.log(`weeklySummary ran at ${new Date().toISOString()}`);
    if (timer.isPastDue) {
      context.log("Timer is running late.");
    }
  },
});
