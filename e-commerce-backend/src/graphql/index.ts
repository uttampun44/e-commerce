import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";
import express, { Express } from "express";
import cors from "cors";
import { optionalAuthmiddleware, AuthRequest } from "@/middleware/auth.middleware.js";

export async function setupGraphQL(app: Express) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Apply middleware
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    optionalAuthmiddleware,
    expressMiddleware(server, {
      context: async ({ req }: { req: AuthRequest }) => ({ 
        user: req.user,
        token: req.headers.authorization
     }),
    }),
  );

  return server;
}

export { typeDefs, resolvers };
