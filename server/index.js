const express = require("express");
const app = express();
const appRouter = require("./trpc");
const cors = require("cors");

const trpcExpress = require("@trpc/server/adapters/express");
// created for each request
const createContext = ({ req, res }) => ({}); // no context
app.use(cors());
app.use((req, res, next) => {
  console.log(req);
  next();
});
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.log("started on 4000");
});
