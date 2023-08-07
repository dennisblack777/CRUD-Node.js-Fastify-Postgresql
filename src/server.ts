import build from "./app";

const app = build({ logger: true });

try {
  app.listen({ host: "0.0.0.0", port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
