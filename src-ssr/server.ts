/**
 * More info about this file:
 * https://v2.quasar.dev/quasar-cli-vite/developing-ssr/ssr-webserver
 *
 * Runs in Node context.
 */

/**
 * Make sure to yarn add / npm install (in your project root)
 * anything you import here (except for express and compression).
 */
import express from 'express';
import compression from 'compression';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
import {
  ssrClose,
  ssrCreate,
  ssrListen,
  ssrRenderPreloadTag,
  ssrServeStaticContent,
} from 'quasar/wrappers';
import db from 'app/src/db/models/index';
// import * as dotenv from 'dotenv';

declare function initDB();

function initDB() {
  const userType = db.userType,
    actorType = db.actorType,
    lang = db.langue,
    paymentType = db.paymentType,
    devise = db.devise,
    price = db.price;

  price.create({
    stockPricesId : 1,
    euro: 1.00,
    dollar: 1.04,
    livre: 0.86
  });
  price.create({
    stockPricesId : 2,
    euro: 0.96,
    dollar: 1.00,
    livre: 0.83
  });
  price.create({
    stockPricesId : 3,
    euro: 1.16,
    dollar: 1.21,
    livre: 1.00
  });

  userType.create({
    userTypeId: 1,
    regular: true,
    admin: false
  });
  userType.create({
    userTypeId: 2,
    regular: false,
    admin: true
  });
  userType.create({
    userTypeId: 3,
    regular: true,
    admin: true
  });

  actorType.create({
    actorTypeId: 1,
    seller: true,
    buyer: true
  });
  actorType.create({
    actorTypeId: 2,
    seller: true,
    buyer: false
  });
  actorType.create({
    actorTypeId: 3,
    seller: false,
    buyer: true
  });

  lang.create({
    langueId: 1,
    libelle: 'English',
    nom: 'en-US'
  });
  lang.create({
    langueId: 2,
    libelle: 'Français',
    nom: 'fr-FR'
  });

  paymentType.create({
    paymentTypeId: 1,
    cb: true,
    esp: false,
    chq: false
  });
  paymentType.create({
    paymentTypeId: 2,
    cb: false,
    esp: true,
    chq: false
  });
  paymentType.create({
    paymentTypeId: 3,
    cb: false,
    esp: false,
    chq: true
  });

  devise.create({
    deviseId: 1,
    symbole: '$',
    libelle: 'dollar'
  });
  devise.create({
    deviseId: 2,
    symbole: '£',
    libelle: 'livre'
  });
  devise.create({
    deviseId: 3,
    symbole: '€',
    libelle: 'euro'
  });
}

/**
 * Create your webserver and return its instance.
 * If needed, prepare your webserver to receive
 * connect-like middlewares.
 *
 * Should NOT be async!
 */
export const create = ssrCreate((/* { ... } */) => {
  const app = express();
  const opt = {};
  if (process.env.PROD) {
    opt.logging = false;
  } else {
    opt.logging = console.log;
  }
  db.sequelize.authenticate()
    .then(async () => {
      await db.sequelize.query('SET  FOREIGN_KEY_CHECKS = 0', { raw: true })
      .then(async () => {
        await db.sequelize.sync(opt);
        // initDB();
      });
    })
    .catch((err) => {
      console.error("Unable to conntect to the database !");
      console.error(err);
    });
  // attackers can use this header to detect apps running Express
  // and then launch specifically-targeted attacks
  app.disable('x-powered-by');

  // (async ()=>{
  //   console.log('app middleware routing !');
  //   const userRouter = await import('app/src/db/routes/user.route');
  //   const serviceRouter = await import('app/src/db/routes/service.route');
  //   const sessionsRouter = await import('app/src/db/routes/sessions.route');
  //   const actorRouter = await import('app/src/db/routes/actor.route');
  //   const orderRouter = await import('app/src/db/routes/order.route');
  //   const paymentRouter = await import('app/src/db/routes/payment.route');
  //   const invoiceRouter = await import('app/src/db/routes/invoice.route');

  //   app.use('/api/users', userRouter.default);
  //   app.use('/api/services', serviceRouter.default);
  //   app.use('/api/sessions', sessionsRouter.default);
  //   app.use('/api/actors', actorRouter.default);
  //   app.use('/api/orders', orderRouter.default);
  //   app.use('/api/payments', paymentRouter.default);
  //   app.use('/api/invoices', invoiceRouter.default);
  // })();
  
  // place here any middlewares that
  // absolutely need to run before anything else
  if (process.env.PROD) {
    app.use(compression());
    // const mid = await import('sirv');
    // app.use('/',
    //   mid.default('staticAssets',
    //     {
    //       maxAge: 31536000, // 1Y
    //       immutable: false
    //     })
    // );
  }

  return app;
});

/**
 * You need to make the server listen to the indicated port
 * and return the listening instance or whatever you need to
 * close the server with.
 *
 * The "listenResult" param for the "close()" definition below
 * is what you return here.
 *
 * For production, you can instead export your
 * handler for serverless use or whatever else fits your needs.
 */
export const listen = ssrListen(async ({ app, port, isReady }) => {
  await isReady();
  return app.listen(port, () => {
    if (process.env.PROD) {
      console.log('Server listening at port ' + port);
    }
  });
});

/**
 * Should close the server and free up any resources.
 * Will be used on development only when the server needs
 * to be rebooted.
 *
 * Should you need the result of the "listen()" call above,
 * you can use the "listenResult" param.
 *
 * Can be async.
 */
export const close = ssrClose(({ listenResult }) => {
  return listenResult.close();
});

const maxAge = process.env.DEV ? 0 : 1000 * 60 * 60 * 24 * 30;

/**
 * Should return middleware that serves the indicated path
 * with static content.
 */
export const serveStaticContent = ssrServeStaticContent((path, opts) => {
  return express.static(path, {
    maxAge,
    ...opts,
  });
});

const jsRE = /\.js$/;
const cssRE = /\.css$/;
const woffRE = /\.woff$/;
const woff2RE = /\.woff2$/;
const gifRE = /\.gif$/;
const jpgRE = /\.jpe?g$/;
const pngRE = /\.png$/;

/**
 * Should return a String with HTML output
 * (if any) for preloading indicated file
 */
export const renderPreloadTag = ssrRenderPreloadTag((file) => {
  if (jsRE.test(file) === true) {
    return `<link rel="modulepreload" href="${file}" crossorigin>`;
  }

  if (cssRE.test(file) === true) {
    return `<link rel="stylesheet" href="${file}">`;
  }

  if (woffRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  }

  if (woff2RE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  }

  if (gifRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif">`;
  }

  if (jpgRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  }

  if (pngRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/png">`;
  }

  return '';
});
