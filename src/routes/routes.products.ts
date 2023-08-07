import { FastifyInstance } from "fastify";
import { IBody, IParams } from "../interfaces/interfaces.products";
import {
  addProduct,
  deleteProduct,
  product,
  products,
  updateProduct,
} from "../schemas/schemas.products";

async function RoutesProducts(fastify: FastifyInstance) {
  // get all products from DB
  fastify.get("/", products, async (request, reply) => {
    const client = await fastify.pg.connect();
    try {
      const { rows } = await client.query(
        "SELECT id, title, description, price, brand, category, thumbnail, images FROM products"
      );
      // Note: avoid doing expensive computation here, this will block releasing the client
      reply.status(200).send(rows);
    } finally {
      // Release the client immediately after query resolves, or upon error
      client.release();
    }
  });

  // get one product from DB by id
  fastify.get<{ Params: IParams }>("/:id", product, async (request, reply) => {
    const { params } = request;
    const client = await fastify.pg.connect();
    try {
      const { rows } = await client.query(
        "SELECT id, title, description, price, brand, category, thumbnail, images FROM products WHERE id=$1",
        [params.id]
      );
      // Note: avoid doing expensive computation here, this will block releasing the client
      reply.status(200).send(rows);
    } finally {
      // Release the client immediately after query resolves, or upon error
      client.release();
    }
  });

  // add new product to DB
  fastify.post<{ Body: IBody }>("/add", addProduct, async (request, reply) => {
    const { body } = request;
    // will return a promise, fastify will send the result automatically
    return fastify.pg.transact(async (client) => {
      // will resolve to an id, or reject with an error
      await client.query(
        "INSERT INTO products(title, description, price, brand, category, thumbnail, images) VALUES($1, $2, $3, $4, $5, $6, $7)",
        [
          body.title,
          body.description,
          body.price,
          body.brand,
          body.category,
          body.thumbnail,
          body.images,
        ]
      );

      reply.status(201).send({ msg: "Produkt wurde erfolgreich hinzugefügt." });
    });
  });

  // update product data by id
  fastify.put<{ Body: IBody; Params: IParams }>(
    "/:id",
    updateProduct,
    async (request, reply) => {
      const { body } = request;
      const { params } = request;
      // will return a promise, fastify will send the result automatically
      return fastify.pg.transact(async (client) => {
        // will resolve to an id, or reject with an error
        await client.query(
          "UPDATE products SET title = $2, description = $3, price = $4, brand = $5, category = $6, thumbnail = $7, images = $8, WHERE id = $1",
          [
            params.id,
            body.title,
            body.description,
            body.price,
            body.brand,
            body.category,
            body.thumbnail,
            body.images,
          ]
        );

        reply
          .status(200)
          .send({ msg: "Produkt wurde erfolgreich aktualisiert." });
      });
    }
  );

  // delete product from DB by id
  fastify.delete<{ Params: IParams }>(
    "/:id",
    deleteProduct,
    async (request, reply) => {
      const {
        params: { id },
      } = request;
      // will return a promise, fastify will send the result automatically
      return fastify.pg.transact(async (client) => {
        // will resolve to an id, or reject with an error
        const { rowCount } = await client.query(
          "DELETE FROM products WHERE id = $1 RETURNING id",
          [id]
        );

        reply.status(200).send({
          msg: !rowCount
            ? "ID konnte nicht gefunden werden."
            : "Produkt wurde erfolgreich gelöscht.",
        });
      });
    }
  );
}

export default RoutesProducts;
