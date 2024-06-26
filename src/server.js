require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});


const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀Server is running on http://localhost:${PORT}/graphql ✅`);
});
// require("dotenv").config();
// import express from "express";
// import logger from "morgan";
// import { ApolloServer } from "apollo-server-express";
// import { typeDefs, resolvers } from "./schema";
// import { getUser } from "./users/users.utils";

// const PORT = process.env.PORT;
// const server = new ApolloServer({
//   resolvers,
//   typeDefs,
//   context: async ({ req }) => {
//     return {
//       loggedInUser: await getUser(req.headers.token),
//     };
//   },
// });

// const app = express();
// app.use(logger("tiny"));

// server.start().then((res) => {
//   server.applyMiddleware({ app, path: "/" });

//   app.listen({ port: PORT }, () =>
//     console.log(`🚀Server is running on http://localhost:${PORT} ✅`)
//   );
// });
