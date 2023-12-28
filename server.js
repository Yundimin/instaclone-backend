require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
      // context: {
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAzNzM5MTIyfQ.K4c3BeOJrgil0AgQ534uiDZ0A_K3yqSGlRkFjOPObZg",
  // },

    }
});



server.listen(PORT).then(() =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
