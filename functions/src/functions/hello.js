// Simple test endpoint to prove the Function App is deployed and reachable.
// GET /api/hello

const { app } = require("@azure/functions");

app.http("hello", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log("hello function called");
    return {
      jsonBody: {
        message: "Hello from the Group 9 Function App",
        time: new Date().toISOString(),
      },
    };
  },
});
