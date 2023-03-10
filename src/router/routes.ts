import { RouteRecordRaw } from 'vue-router';
import { i18n } from 'app/src/boot/i18n';
// import { upload } from 'app/src/middleware/index';

// console.log(i18n.global);
const t = i18n.global.t;

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: t('homeLinkTarget'),
        name: t('homeLinkName'),
        component: () => import('pages/IndexPage.vue'),
        meta: {
          // title: t('homeTitle'),
          requiresAuth: true,
          titleKey: 'homeTitle',
        }
      },
      { 
        path: t('homeBisLinkTarget'),
        name: t('homeBisLinkName'),
        component: () => import('pages/IndexPage.vue'),
        meta: {
          // title: t('homeTitle'),
          requiresAuth: true,
          titleKey: 'homeTitle',
        }
      },
      { 
        path: t('profileLinkTarget'),
        name: t('profileLinkName'),
        component: () => import('pages/ProfilePage.vue'),
        meta: {
          // title: t('profileTitle'),
          requiresAuth: true,
          titleKey: 'profileTitle',
        }
      },
      { 
        path: t('aboutLinkTarget'),
        name: t('aboutLinkName'),
        component: () => import('pages/AboutPage.vue'),
        meta: {
          // title: t('aboutTitle'),
          requiresAuth: true,
          titleKey: 'aboutTitle',
        }
      },
      { 
        path: t('startLinkTarget'),
        name: t('startLinkName'),
        component: () => import('pages/StartPage.vue'),
        meta: {
          // title: t('startTitle'),
          requiresAuth: false,
          titleKey: 'startTitle',
        }
      },
      { 
        path: t('serviceLinkTarget'),
        name: t('serviceLinkName'),
        component: () => import('pages/ServicePage.vue'),
        meta: {
          // title: t('serviceTitle'),
          requiresAuth: true,
          titleKey: 'serviceTitle',
        },
        props: {
          admin: true,
          display: false
        }
      },
      { 
        path: t('actorLinkTarget'),
        name: t('actorLinkName'),
        component: () => import('pages/ActorPage.vue'),
        meta: {
          // title: t('actorTitle'),
          requiresAuth: true,
          titleKey: 'actorTitle',
        },
        props: {
          admin: true,
          display: false
        }
      },
      { 
        path: t('orderLinkTarget'),
        name: t('orderLinkName'),
        component: () => import('pages/OrderPage.vue'),
        meta: {
          // title: t('orderTitle'),
          requiresAuth: true,
          titleKey: 'orderTitle',
        },
        props: {
          admin: true,
          display: false
        }
      },
      { 
        path: t('paymentLinkTarget'),
        name: t('paymentLinkName'),
        component: () => import('pages/PaymentPage.vue'),
        meta: {
          // title: t('paymentTitle'),
          requiresAuth: true,
          titleKey: 'paymentTitle',
        },
        props: {
          admin: true,
          display: false
        }
      },
      { 
        path: t('invoiceLinkTarget'),
        name: t('invoiceLinkName'),
        component: () => import('pages/InvoicePage.vue'),
        meta: {
          // title: t('invoiceTitle'),
          requiresAuth: true,
          titleKey: 'invoiceTitle',
        },
        props: {
          admin: true,
          display: false
        }
      },
      { 
        path: t('exportLinkTarget'),
        name: t('exportLinkName'),
        component: () => import('pages/ExportPage.vue'),
        meta: {
          // title: t('exportTitle'),
          requiresAuth: true,
          titleKey: 'exportTitle',
        },
        children: [
          {
            path: t('pdfLinkTarget'),
            name: t('pdfLinkName'),
            component: () => import('components/PdfComponent.vue'),
            meta: {
              // title: t('pdfTitle'),
              requiresAuth: true,
              titleKey: 'pdfTitle',
            },
          },
        ],
      },
      { 
        path: t('startLinkTarget'),
        name: t('startLinkName'),
        component: () => import('pages/StartPage.vue'),
        meta: {
          // title: t('startTitle'),
          requiresAuth: false,
          titleKey: 'startTitle',
        },
      },
      { 
        path: t('registerLinkTarget'),
        name: t('registerLinkName'),
        component: () => import('pages/RegisterPage.vue'),
        meta: {
          // title: t('registerTitle'),
          requiresAuth: false,
          titleKey: 'registerTitle',
        },
      },
    ],
  },
  // { 
  //   path: t('uploadLinkTarget'),
  //   name: 'upload',
  //   component: upload,
  //   meta: {
  //     // title: t('registerTitle'),
  //     // middleware: 'upload',
  //     requiresAuth: true,
  //   },
  // },
  // { 
  //   path: t('downloadLinkTarget')+'/:filename([a-zA-Z0-9_\.]+)*',
  //   name: 'download',
  //   // component: () => import('pages/DownloadPage.vue'),
  //   meta: {
  //     // title: t('registerTitle'),
  //     middleware: 'download',
  //     requiresAuth: true,
  //   },
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    // name: 'Others'
    meta: {
      // title: t('notFoundTitle'),
      requiresAuth: false,
      titleKey: 'notFoundTitle',
    },
  },
];

// console.log(t('uploadLinkTarget'));

export default routes;
