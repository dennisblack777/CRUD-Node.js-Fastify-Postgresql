// FASTIFY
import fastifyPostgres from "@fastify/postgres";
import Fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";

// FASTIFY SWAGGER
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

// DOTENV
import dotenv from "dotenv";
import RoutesProducts from "./routes/routes.products";
dotenv.config();

const build = (opts = {}) => {
  // INIT FASTIFY
  const app = Fastify(opts);

  // fastify error handler
  app.setErrorHandler(function (
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
      // Log error
      this.log.error(error);
      // Send error response
      reply.status(500).send({ ok: false });
    } else {
      // fastify will use parent error handler to handle this
      reply.send(error);
    }
  });

  // REGISTER SWAGGER
  app.register(fastifySwagger);
  app.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  // DB-CONNECTION
  app.register(fastifyPostgres, {
    connectionString: `postgres://developing:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`,
  });

  // register routes for products
  app.register(RoutesProducts, { prefix: "/api/products" });

  return app;
};

export default build;
