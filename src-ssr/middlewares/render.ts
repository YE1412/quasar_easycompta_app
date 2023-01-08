import { RenderError } from '@quasar/app-vite';
import { ssrMiddleware } from 'quasar/wrappers';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import db from 'app/src/db/models/index';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express';
// This middleware should execute as last one
// since it captures everything and tries to
// render the page with Vue

export default ssrMiddleware(async ({ app, port, resolve, render, serve, folders, publicPath }) => {  
  // console.log('app middleware routing !');
  // console.log(resolve.root('src'));
  // console.log(resolve.urlPath('assets'));
  // console.log(folders.root);
  app.use(resolve.urlPath('assets'), express.static(`${resolve.root('src')}/assets`))
  app.use(cors({
      origin: [`http://localhost:${port}`, `https://localhost:${port}`],
      credentials: true,
      exposeHeaders: ['set-cookie'],
    })
  )
  app.use(
    session({
      secret: 'sessionSecret',
      cookie: {
        maxAge: 600000,
      },
      saveUninitialized: true,
      resave: false,
      unset: 'keep',
    })
  );
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  const userRouter = await import(`app/src/db/routes/user.route`);
  const serviceRouter = await import(`app/src/db/routes/service.route`);
  const sessionsRouter = await import(`app/src/db/routes/sessions.route`);
  const actorRouter = await import(`app/src/db/routes/actor.route`);
  const orderRouter = await import(`app/src/db/routes/order.route`);
  const paymentRouter = await import(`app/src/db/routes/payment.route`);
  const invoiceRouter = await import(`app/src/db/routes/invoice.route`);

  app.use(`${resolve.urlPath('api')}/users`, userRouter.default(express));
  app.use(`${resolve.urlPath('api')}/services`, serviceRouter.default(express));
  app.use(`${resolve.urlPath('api')}/sessions`, sessionsRouter.default(express));
  app.use(`${resolve.urlPath('api')}/actors`, actorRouter.default(express));
  app.use(`${resolve.urlPath('api')}/orders`, orderRouter.default(express));
  app.use(`${resolve.urlPath('api')}/payments`, paymentRouter.default(express));
  app.use(`${resolve.urlPath('api')}/invoices`, invoiceRouter.default(express));
  app.get(`${resolve.urlPath('api')}/session`, (req, res) => {
    // console.log('routing to session route !');
    req.session.appSession = uuidv4();
    res.send({ id: req.session.appSession });
  });
  app.post(`${resolve.urlPath('api')}/session`, (req, res) => {
    // console.log(`Req Session ID : ${req.body.sessionID}`);
    // console.log(`Cookie Session Id : ${req.cookies.session}`);
    let sessionId = req.session.appSession ?? req.cookies.session;
    sessionId = req.session.appSession ? req.session.appSession
      : (req.cookies.session ? JSON.parse(req.cookies.session).sessionId : undefined);
    // console.log(`Session ID : ${sessionId}`);
    // if (sessionId === undefined)
    //   console.log(req);
    if (req.body.sessionID != sessionId) {
      return res.status(500).send({ message: 'The data in the session does not match the request sessionID !'});
    }
    res.send({ message: 'Success !' });
  });
  // we capture any other Express route and hand it
  // over to Vue and Vue Router to render our page
  app.get(resolve.urlPath('*'), (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    render(/* the ssrContext: */ { req, res })
      .then((html) => {
        // now let's send the rendered html to the client
        res.send(html);
      })
      .catch((err: RenderError) => {
        // oops, we had an error while rendering the page

        // we were told to redirect to another URL
        if (err.url) {
          if (err.code) {
            res.redirect(err.code, err.url);
          } else {
            res.redirect(err.url);
          }
        } else if (err.code === 404) {
          // hmm, Vue Router could not find the requested route

          // Should reach here only if no "catch-all" route
          // is defined in /src/routes
          res.status(404).send('404 | Page Not Found');
        } else if (process.env.DEV) {
          // well, we treat any other code as error;
          // if we're in dev mode, then we can use Quasar CLI
          // to display a nice error page that contains the stack
          // and other useful information

          // serve.error is available on dev only
          serve.error({ err, req, res });
        } else {
          // we're in production, so we should have another method
          // to display something to the client when we encounter an error
          // (for security reasons, it's not ok to display the same wealth
          // of information as we do in development)

          // Render Error Page on production or
          // create a route (/src/routes) for an error page and redirect to it
          res.status(500).send('500 | Internal Server Error');
          // console.error(err.stack)
        }
      });
  });
});
