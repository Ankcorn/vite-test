const trpc = require("@trpc/server");

const appRouter = trpc.router().query("getUser", {
  async resolve(req) {
    console.log(req);
    return { id: req.input, name: "Bilbo" };
  },
});

module.exports = appRouter;
