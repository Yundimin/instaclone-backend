require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
    // context: {
    //   token:
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAzNzM5MTIyfQ.K4c3BeOJrgil0AgQ534uiDZ0A_K3yqSGlRkFjOPObZg",
    // },
  },
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
app.listen({ port: PORT }, () => {
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
