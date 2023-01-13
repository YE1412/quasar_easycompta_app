<template>
  <q-page class="column q-pa-lg">
    <messages-item v-if="messageVisibility && renderComponent"></messages-item>
    <div class="row text-center q-pt-xl">
      <div class="col">
        <q-icon size="lg" aria-hidden="false" name="mdi-receipt-text" color="primary">
        </q-icon>
        <h5 class="text-primary">
          {{ nbInvoices }}
        </h5>
        <h6 class="SenExtrabold-font">{{ t("homeComponent.labels.invoicesLabel") }}</h6>
        <div
          class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"
        ></div>
      </div>

      <div class="col">
        <q-icon size="lg" aria-hidden="false" color="dark" name="mdi-order-bool-descending">
        </q-icon>
        <h5 class="text-dark">
          {{ nbOrders }}
        </h5>
        <h6 class="SenExtrabold-font">{{ t("homeComponent.labels.ordersLabel") }}</h6>
        <div
          class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"
        ></div>
      </div>

      <div class="col">
        <q-icon size="lg" aria-hidden="false" name="mdi-clipboard-account" color="accent">
        </q-icon>
        <h5 class="text-accent">
          {{ nbActors }}
        </h5>
        <h6 class="SenExtrabold-font">{{ t("homeComponent.labels.actorsLabel") }}</h6>
        <div
          class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"
        ></div>
      </div>

      <div class="col">
        <q-icon size="lg" aria-hidden="false" class="text-secondary" name="mdi-room-service" color="secondary">
        </q-icon>
        <h5 class="text-secondary">
          {{ nbServices }}
        </h5>
        <h6 class="SenExtrabold-font">{{ t("homeComponent.labels.servicesLabel") }}</h6>
      </div>
    </div>
    <home-table
      cssClasses="q-pa-md"
      :dbConn="dbConn"
    />
    <bar-chart :dbConn="dbConn" />
    <pie-chart :dbConn="dbConn" />
  </q-page>
</template>

<script setup lang="ts">
import { useMessageStore } from 'stores/message';
import { useCounterStore } from 'stores/counter';
import { useUserStore } from 'stores/user';
// import { useSessionStore } from 'stores/session';
import MessagesItem from 'components/MessagesItem.vue';
import BarChart from 'components/BarChart.vue';
import PieChart from 'components/PieChart.vue';
import HomeTable from 'components/HomeTable.vue';
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { openDbConnection, isDbConnectionOpen, newQuery } from 'cap/storage';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
// import { Capacitor } from '@capacitor/core';

// VARIABLES
interface IndexPageProps {
  dbConn?: SQLiteDBConnection | null;
};
const props = withDefaults(defineProps<IndexPageProps>(), {
  dbConn: null,
});
// const app = getCurrentInstance();
// const pinia = app.appContext.config.globalProperties.$pinia;
const $q = useQuasar();
const emit = defineEmits(['change-tab']);
const renderComponent = ref(true);
const platform = $q.platform;
const { t } = useI18n();
const nbInvoices = ref(0);
const nbOrders = ref(0);
const nbActors = ref(0);
const nbServices = ref(0);
const messageVisibility = ref(false);

let counterStore = null,
  messageStore = null, prefs = null, userStore = null;

// DECLARATIONS
if (platform.is.desktop) {
  // console.log("Setup !");
  counterStore = useCounterStore();
  messageStore = useMessageStore();
  userStore = useUserStore();
  if (messageStore.getMessages.length)
    messageStore.setMessagesVisibility(true);
  messageVisibility.value = messageStore.getMessagesVisibility;
  (async() => {
    if (!import.meta.env.SSR){
      await counterStore.getNbOrdersFromDb();
      await counterStore.getNbActorsFromDb();
      await counterStore.getNbServicesFromDb();
      await counterStore.getFinancialYearNbInvoices(userStore.getUser.userId);
      nbInvoices.value = counterStore.getNbInvoices;
      nbOrders.value = counterStore.getNbOrders;
      nbActors.value = counterStore.getNbActors;
      nbServices.value = counterStore.getNbServices;
    }
  })();
}
else {
  prefs = await import('cap/storage/preferences');
  // console.log('Get messages preferences !');
  const mess = await prefs.getPref('message');
  const usr = await prefs.getPref('user');
  // console.log(mess);
  // console.log(usr);
  // console.log(`Setting messages !`);
  const messages = !!mess ? mess.messages : [];
  const vis = !!mess ? mess.messagesVisibility : mess;
  if (messages.length && vis === null) {
    messageVisibility.value = true;
  } else {
    messageVisibility.value = vis !== null ? vis : false;
  }
  // console.log(`Setting date !`);
  let dateStart = null;
  const now = new Date();
  if (now.getMonth() < 5) {
    dateStart = new Date(`${now.getFullYear() - 1}-06-01`);
  } 
  else {
    dateStart = new Date(`${now.getFullYear()}-06-01`);
  }
  // console.log(`Open DB Connection !`);
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let sql = `SELECT COUNT(\`factureId\`) AS \`n_inv\`, strftime('%s', \`facture\`.\`date\`) AS \`date_format\` FROM \`facture\` AS \`facture\` WHERE \`facture\`.\`administratorId\` = '${usr.user.userId}' AND \`date_format\` > strftime('%s', '${dateStart.toISOString()}');`;
    // console.log(sql);
    let values = await newQuery(props.dbConn, sql);
    console.log(values);
    if (values.values.length){
      nbInvoices.value = values.values[0].n_inv;
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('homeComponent.results.ko.fetch_stats', { err: 'Select count invoices from SQLite DB !' })
          }
        ],
        messagesVisibility: true,
      });
      messageVisibility.value = true;
    }

    sql = 'SELECT COUNT(\`orderId\`) AS \`n_ord\` FROM \`commande\` AS \`commande\`;';
    values = await newQuery(props.dbConn, sql);
    console.log(values);
    if (values.values.length){
      nbOrders.value = values.values[0].n_ord;
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('homeComponent.results.ko.fetch_stats', { err: 'Select count orders from SQLite DB !' })
          }
        ],
        messagesVisibility: true,
      });
      messageVisibility.value = true;
    }

    sql = 'SELECT COUNT(\`actorId\`) AS \`n_act\` FROM \`personne\` AS \`personne\`;';
    values = await newQuery(props.dbConn, sql);
    console.log(values);
    if (values.values.length){
      nbActors.value = values.values[0].n_act;
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('homeComponent.results.ko.fetch_stats', { err: 'Select count actors from SQLite DB !' })
          }
        ],
        messagesVisibility: true,
      });
      messageVisibility.value = true;
    }

    sql = 'SELECT COUNT(\`serviceId\`) AS \`n_srv\` FROM \`produitservice\` AS \`produitservice\`;';
    values = await newQuery(props.dbConn, sql);
    console.log(values);
    if (values.values.length){
      nbServices.value = values.values[0].n_srv;
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('homeComponent.results.ko.fetch_stats', { err: 'Select count services from SQLite DB !' })
          }
        ],
        messagesVisibility: true,
      });
      messageVisibility.value = true;
    }
  }
  else {
    await prefs.setPref('message', {
      messages: [
        {
          severity: true,
          content: t('homeComponent.results.ko.fetch_stats', { err: 'Unable to open SQLite DB !' })
        }
      ],
      messagesVisibility: true,
    });
    messageVisibility.value = true;
  }
}

// FUNCTIONS
// async function forceMessageItemsRerender() {
//   renderComponent.value = false;
//   await nextTick();
//   renderComponent.value = true;
// };

// WATCHERS

// LIFECYCLE EVENTS

// OTHERS

onMounted(() => {
  emit('change-tab', 'home')
})
</script>
