import createApp from "./lib/create-app";
import indexRoutes from "./routes/index.routes";

const app = createApp();

// configureOpenAPi(app);

const routes = [indexRoutes];

routes.forEach(route => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
