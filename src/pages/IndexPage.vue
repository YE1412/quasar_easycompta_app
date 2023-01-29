<template>
  <q-page class="column q-pa-lg">
    <q-no-ssr>
      <messages-item v-if="messageVisibility && renderComponent"></messages-item>
    </q-no-ssr>
    <div class="row full-width text-center q-pt-xl" v-if="!compact">
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

    <div class="column full-width text-center q-pt-xl" v-if="compact">
      <div class="row q-pb-lg">  
        <div class="col">
          <q-icon size="lg" aria-hidden="false" name="mdi-receipt-text" color="primary">
          </q-icon>
          <h5 class="text-primary q-my-sm">
            {{ nbInvoices }}
          </h5>
          <h6 class="SenExtrabold-font q-my-md">{{ t("homeComponent.labels.invoicesLabel") }}</h6>
          <div
            class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"
          ></div>
        </div>

        <div class="col">
          <q-icon size="lg" aria-hidden="false" color="dark" name="mdi-order-bool-descending">
          </q-icon>
          <h5 class="text-dark q-my-sm">
            {{ nbOrders }}
          </h5>
          <h6 class="SenExtrabold-font q-my-md">{{ t("homeComponent.labels.ordersLabel") }}</h6>
          <div
            class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"
          ></div>
        </div>
      </div>
      <div class="row"> 
        <div class="col">
          <q-icon size="lg" aria-hidden="false" name="mdi-clipboard-account" color="accent">
          </q-icon>
          <h5 class="text-accent q-my-sm">
            {{ nbActors }}
          </h5>
          <h6 class="SenExtrabold-font q-my-md">{{ t("homeComponent.labels.actorsLabel") }}</h6>
          <div
            class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"
          ></div>
        </div>

        <div class="col">
          <q-icon size="lg" aria-hidden="false" class="text-secondary" name="mdi-room-service" color="secondary">
          </q-icon>
          <h5 class="text-secondary q-my-sm">
            {{ nbServices }}
          </h5>
          <h6 class="SenExtrabold-font q-my-md">{{ t("homeComponent.labels.servicesLabel") }}</h6>
        </div>
      </div>
    </div>

    <home-table
      cssClasses="q-pa-md full-width"
      :dbConn="dbConn"
      :invoicesFY="invoices"
      v-if="renderStats"
    />
    <bar-chart cssClasses="q-pa-md full-width" :dbConn="dbConn" :invoicesFY="invoices"
    v-if="renderStats"/>
    <pie-chart cssClasses="q-pa-md full-width column flex items-center" :dbConn="dbConn" :invoicesFY="invoices"
    v-if="renderStats"/>
  </q-page>
</template>

<script setup lang="ts">
/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { useMessageStore } from 'stores/message';
import { useCounterStore } from 'stores/counter';
import { useUserStore } from 'stores/user';
// import { useSessionStore } from 'stores/session';
import MessagesItem from 'components/MessagesItem.vue';
import BarChart from 'components/BarChart.vue';
import PieChart from 'components/PieChart.vue';
import HomeTable from 'components/HomeTable.vue';
import { ref, onMounted, watch, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { openDbConnection, isDbConnectionOpen, newQuery } from 'cap/storage';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { setDecryptApi, __TRANSFORMOBJ__ } from 'src/globals';
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
const { t } = useI18n({ useScope: 'global' });
const nbInvoices = ref(0);
const nbOrders = ref(0);
const nbActors = ref(0);
const nbServices = ref(0);
const invoices = ref(null);
const messageVisibility = ref(false);
const orientation = ref(null);
const compact = ref(false);
const renderStats = ref(false);

let counterStore = null,
  messageStore = null, prefs = null, userStore = null, dateStartLibelle = null;

// DECLARATIONS
if (platform.is.mobile) {
  orientation.value = window.screen.orientation.type;
  if (orientation.value === 'portrait-primary' || orientation.value === 'portrait-secondary'){
    compact.value = true;
  }
  window.addEventListener('orientationchange', handleOrientation);
}

// FUNCTIONS
function sanitizeQueryResult(obj: any) {
  let ret = [], ind = 0;
  // console.log('sanitizeQueryResult !');
  for (const k in obj) {
    const prevId = k > 0 ? obj[k - 1].factureId : 0;
    if (prevId && prevId !== obj[k].factureId){
      ind++;
    }
    if (!prevId || (prevId && prevId !== obj[k].factureId)) {
      ret[ind] = {};
    }
    for (const l in obj[k]) {
      if (prevId === obj[k].factureId) {
        if (l === 'commandes.orderId') {
          // console.log(obj[k][l]);
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if(!ret[ind]['commandes'].length){
            if (obj[k][l] !== null)
              ret[ind]['commandes'].push({orderId: obj[k][l]});
          }
          else {
            const foundIndex = ret[ind]['commandes'].findIndex(elem => elem.orderId === obj[k][l]);
            if (obj[k][l] !== null){
              if (foundIndex === -1)
                ret[ind]['commandes'].push({orderId: obj[k][l]});
              else
                ret[ind]['commandes'][foundIndex].orderId = obj[k][l];
            }
          }
        }
        else if(l === 'commandes.contenuAdditionnel') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          // if (obj[k][l] !== null){
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({contenuAdditionnel: obj[k][l]});
            }
            else{
              const foundIndex = ret[ind]['commandes'].findIndex(elem => elem.orderId === obj[k]['orderId']);
              if (foundIndex === -1)
                ret[ind]['commandes'][ret[ind]['commandes'].length - 1].contenuAdditionnel = obj[k][l];
              else
                ret[ind]['commandes'][foundIndex].contenuAdditionnel = obj[k][l];
            }
          // }
        }
        else if(l === 'commandes.priceHt') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({priceHt: obj[k][l]});
            }
            else{
              const foundIndex = ret[ind]['commandes'].findIndex(elem => elem.orderId === obj[k]['orderId']);
              if (obj[k][l] !== null){
                if(foundIndex === -1)
                  ret[ind]['commandes'][ret[ind]['commandes'].length - 1].priceHt = obj[k][l];
                else
                  ret[ind]['commandes'][foundIndex].priceHt = obj[k][l];
              }
            }
          }
        }
        else if(l === 'commandes.factureId') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if (obj[k][l] !== null){
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({factureId: obj[k][l]});
            }
            else{
              const foundIndex = ret[ind]['commandes'].findIndex(elem => elem.orderId === obj[k]['orderId']);
              if (obj[k][l] !== null){
                if (foundIndex === -1)
                  ret[ind]['commandes'][ret[ind]['commandes'].length - 1].factureId = obj[k][l];
                else
                  ret[ind]['commandes'][foundIndex].factureId = obj[k][l];
              }
            }
          }
        }
        else if (l === 'payments.paymentId') {
          // console.log(obj[k][l]);
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if(!ret[ind]['payments'].length){
            if (obj[k][l] !== null)
              ret[ind]['payments'].push({paymentId: obj[k][l]});
          }
          else {
            const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === obj[k][l]);
            if (obj[k][l] !== null){
              if (foundIndex === -1)
                ret[ind]['payments'].push({paymentId: obj[k][l]});
              else
                ret[ind]['payments'][foundIndex].paymentId = obj[k][l];
            }
          }
        }
        else if (l === 'payments.etat') {
          // console.log(obj[k][l]);
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if(!ret[ind]['payments'].length){
            if (obj[k][l] !== null)
              ret[ind]['payments'].push({etat: obj[k][l]});
          }
          else {
            const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === obj[k]['payments.paymentId']);
            if (obj[k][l] !== null){
              if (foundIndex === -1)
                ret[ind]['payments'][ret[ind]['payments'].length - 1].etat = obj[k][l];
              else
                ret[ind]['payments'][foundIndex].etat = obj[k][l];
            }
          }
        }
        else if (l === 'payments.paymentValue') {
          // console.log(obj[k][l]);
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if(!ret[ind]['payments'].length){
            if (obj[k][l] !== null)
              ret[ind]['payments'].push({paymentValue: obj[k][l]});
          }
          else {
            const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === obj[k]['payments.paymentId']);
            if (obj[k][l] !== null){
              if (foundIndex === -1)
                ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentValue = obj[k][l];
              else
                ret[ind]['payments'][foundIndex].paymentValue = obj[k][l];
            }
          }
        }
        else if (l === 'payments.paymentType') {
          // console.log(obj[k][l]);
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if(!ret[ind]['payments'].length){
            if (obj[k][l] !== null)
              ret[ind]['payments'].push({paymentType: obj[k][l]});
          }
          else {
            const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === obj[k]['payments.paymentId']);
            if (obj[k][l] !== null){
              if (foundIndex === -1)
                ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentType = obj[k][l];
              else
                ret[ind]['payments'][foundIndex].paymentType = obj[k][l];
            }
          }
        }
        else if (l === 'payments.factureId') {
          // console.log(obj[k][l]);
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if(!ret[ind]['payments'].length){
            if (obj[k][l] !== null)
              ret[ind]['payments'].push({factureId: obj[k][l]});
          }
          else {
            const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === obj[k]['payments.paymentId']);
            if (obj[k][l] !== null){
              if (foundIndex === -1)
                ret[ind]['payments'][ret[ind]['payments'].length - 1].factureId = obj[k][l];
              else
                ret[ind]['payments'][foundIndex].factureId = obj[k][l];
            }
          }
        }
      }
      else {
        if (l === 'langue.langueId') {
          ret[ind]['langue'] = ret[ind]['langue'] === undefined ? {} : ret[ind]['langue'];
          if (obj[k][l] === null) {
            ret[ind]['langue'] = null;
          } else {
            ret[ind]['langue']['langueId'] = obj[k][l];
          }
        }
        else if(l === 'langue.libelle'){
          ret[ind]['langue'] = ret[ind]['langue'] === undefined ? {} : ret[ind]['langue'];
          if (obj[k][l] === null) {
            ret[ind]['langue'] = null;
          } else {
            ret[ind]['langue']['libelle'] = obj[k][l];
          }
        }
        else if (l === 'langue.nom'){
          ret[ind]['langue'] = ret[ind]['langue'] === undefined ? {} : ret[ind]['langue'];
          if (obj[k][l] === null) {
            ret[ind]['langue'] = null;
          } else {
            ret[ind]['langue']['nom'] = obj[k][l];
          }
        }
        else if (l === 'devise.deviseId'){
          ret[ind]['devise'] = ret[ind]['devise'] === undefined ? {} : ret[ind]['devise'];
          if (obj[k][l] === null) {
            ret[ind]['devise'] = null;
          } else {
            ret[ind]['devise']['deviseId'] = obj[k][l];
          }
        }
        else if (l === 'devise.symbole'){
          ret[ind]['devise'] = ret[ind]['devise'] === undefined ? {} : ret[ind]['devise'];
          if (obj[k][l] === null) {
            ret[ind]['devise'] = null;
          } else {
            ret[ind]['devise']['symbole'] = obj[k][l];
          }
        }
        else if (l === 'devise.libelle'){
          ret[ind]['devise'] = ret[ind]['devise'] === undefined ? {} : ret[ind]['devise'];
          if (obj[k][l] === null) {
            ret[ind]['devise'] = null;
          } else {
            ret[ind]['devise']['libelle'] = obj[k][l];
          }
        }
        else if (l === 'buyer.actorId'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['actorId'] = obj[k][l];
          }
        }
        else if (l === 'buyer.cp'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['cp'] = obj[k][l];
          }
        }
        else if (l === 'buyer.email'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['email'] = obj[k][l];
          }
        }
        else if (l === 'buyer.nom'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['nom'] = obj[k][l];
          }
        }
        else if (l === 'buyer.nomRue'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['nomRue'] = obj[k][l];
          }
        }
        else if (l === 'buyer.numCommercant'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          ret[ind]['buyer']['numCommercant'] = obj[k][l];
        }
        else if (l === 'buyer.numRue'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['numRue'] = obj[k][l];
          }
        }
        else if (l === 'buyer.prenom'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['prenom'] = obj[k][l];
          }
        }
        else if (l === 'buyer.tel'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['tel'] = obj[k][l];
          }
        }
        else if (l === 'buyer.actorTypeId'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['actorTypeId'] = obj[k][l];
          }
        }
        else if (l === 'buyer.ville'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['ville'] = obj[k][l];
          }
        }
        else if (l === 'seller.actorId'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['actorId'] = obj[k][l];
          }
        }
        else if (l === 'seller.cp'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['cp'] = obj[k][l];
          }
        }
        else if (l === 'seller.email'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['email'] = obj[k][l];
          }
        }
        else if (l === 'seller.nom'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['nom'] = obj[k][l];
          }
        }
        else if (l === 'seller.nomRue'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['nomRue'] = obj[k][l];
          }
        }
        else if (l === 'seller.numCommercant'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          ret[ind]['seller']['numCommercant'] = obj[k][l];
        }
        else if (l === 'seller.numRue'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['numRue'] = obj[k][l];
          }
        }
        else if (l === 'seller.prenom'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['prenom'] = obj[k][l];
          }
        }
        else if (l === 'seller.tel'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['tel'] = obj[k][l];
          }
        }
        else if (l === 'seller.actorTypeId'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['actorTypeId'] = obj[k][l];
          }
        }
        else if (l === 'seller.ville'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['ville'] = obj[k][l];
          }
        }
        else if(l === 'commandes.orderId') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({orderId: obj[k][l]});
            }
            else{
              ret[ind]['commandes'][ret[ind]['commandes'].length - 1].orderId = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'commandes.contenuAdditionnel') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({contenuAdditionnel: obj[k][l]});
            }
            else{
              ret[ind]['commandes'][ret[ind]['commandes'].length - 1].contenuAdditionnel = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'commandes.priceHt') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({priceHt: obj[k][l]});
            }
            else{
              ret[ind]['commandes'][ret[ind]['commandes'].length - 1].priceHt = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'commandes.factureId') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({factureId: obj[k][l]});
            }
            else{
              ret[ind]['commandes'][ret[ind]['commandes'].length - 1].factureId = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'payments.paymentId') {
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['payments'].length){
              ret[ind]['payments'].push({paymentId: obj[k][l]});
            }
            else{
              ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentId = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'payments.etat') {
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['payments'].length){
              ret[ind]['payments'].push({etat: obj[k][l]});
            }
            else{
              ret[ind]['payments'][ret[ind]['payments'].length - 1].etat = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'payments.paymentValue') {
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['payments'].length){
              ret[ind]['payments'].push({paymentValue: obj[k][l]});
            }
            else{
              ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentValue = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'payments.paymentType') {
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['payments'].length){
              ret[ind]['payments'].push({paymentType: obj[k][l]});
            }
            else{
              ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentType = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'payments.factureId') {
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['payments'].length){
              ret[ind]['payments'].push({factureId: obj[k][l]});
            }
            else{
              ret[ind]['payments'][ret[ind]['payments'].length - 1].factureId = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else {
          ret[ind][l] = obj[k][l];
        }
      }
    }
  }
  return ret;
};
function handleOrientation(){
  // console.log(screen.orientation);
  orientation.value = screen.orientation.type;
};
// async function forceMessageItemsRerender() {
//   renderComponent.value = false;
//   await nextTick();
//   renderComponent.value = true;
// };

// WATCHERS
watch(
  orientation,
  (newOrientation) => {
    if (!!newOrientation) {
      if (newOrientation === 'portrait-primary' || newOrientation === 'portrait-secondary'){
        compact.value = true;
      }
      else {
        compact.value = false;
      }
    }
  }
)

// LIFECYCLE EVENTS
onMounted(() => {
  emit('change-tab', 'home')
});
onBeforeMount(async() => {
  if (platform.is.desktop) {
    // console.log("Setup !");
    counterStore = useCounterStore();
    messageStore = useMessageStore();
    userStore = useUserStore();
    if (messageStore.getMessages.length)
      messageStore.setMessagesVisibility(true);
    messageVisibility.value = messageStore.getMessagesVisibility;
    if (!import.meta.env.SSR){
      await counterStore.getFinancialYearInvoices(userStore.getUser.userId);
      await counterStore.getNbOrdersFromDb();
      await counterStore.getNbActorsFromDb();
      await counterStore.getNbServicesFromDb();
      await counterStore.getFinancialYearNbInvoices(userStore.getUser.userId);
      nbInvoices.value = counterStore.getNbInvoices;
      nbOrders.value = counterStore.getNbOrders;
      nbActors.value = counterStore.getNbActors;
      nbServices.value = counterStore.getNbServices;
      invoices.value = counterStore.getInvoicesFY;
    }
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
    dateStartLibelle = dateStart.toISOString();
    // console.log(`Open DB Connection !`);
    let isOpen = await isDbConnectionOpen(props.dbConn);
    isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
    if (isOpen) {
      let sql = `SELECT COUNT(\`factureId\`) AS \`n_inv\`, strftime('%s', \`facture\`.\`date\`) AS \`date_format\` FROM \`facture\` AS \`facture\` WHERE \`facture\`.\`administratorId\` = '${usr.user.userId}' AND \`date_format\` > strftime('%s', '${dateStart.toISOString()}');`;
      // console.log(sql);
      let values = await newQuery(props.dbConn, sql);
      // console.log(values);
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
      // console.log(values);
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
      // console.log(values);
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
      // console.log(sql);
      values = await newQuery(props.dbConn, sql);
      // console.log(values);
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

      sql = `SELECT \`facture\`.\`factureId\`, \`facture\`.\`date\`, \`facture\`.\`invoiceHTPrice\`, \`facture\`.\`invoiceTTPrice\`, \`facture\`.\`tvaValue\`, \`langue\`.\`langueId\` AS \`langue.langueId\`, \`langue\`.\`libelle\` AS \`langue.libelle\`, \`langue\`.\`nom\` AS \`langue.nom\`, \`devise\`.\`deviseId\` AS \`devise.deviseId\`, \`devise\`.\`symbole\` AS \`devise.symbole\`, \`devise\`.\`libelle\` AS \`devise.libelle\`, \`buyer\`.\`actorId\` AS \`buyer.actorId\`, \`buyer\`.\`cp\` AS \`buyer.cp\`, \`buyer\`.\`email\` AS \`buyer.email\`, \`buyer\`.\`nom\` AS \`buyer.nom\`, \`buyer\`.\`nomRue\` AS \`buyer.nomRue\`, \`buyer\`.\`numCommercant\` AS \`buyer.numCommercant\`, \`buyer\`.\`numRue\` AS \`buyer.numRue\`, \`buyer\`.\`prenom\` AS \`buyer.prenom\`, \`buyer\`.\`tel\` AS \`buyer.tel\`, \`buyer\`.\`actorTypeId\` AS \`buyer.actorTypeId\`, \`buyer\`.\`ville\` AS \`buyer.ville\`, \`seller\`.\`actorId\` AS \`seller.actorId\`, \`seller\`.\`cp\` AS \`seller.cp\`, \`seller\`.\`email\` AS \`seller.email\`, \`seller\`.\`nom\` AS \`seller.nom\`, \`seller\`.\`nomRue\` AS \`seller.nomRue\`, \`seller\`.\`numCommercant\` AS \`seller.numCommercant\`, \`seller\`.\`numRue\` AS \`seller.numRue\`, \`seller\`.\`prenom\` AS \`seller.prenom\`, \`seller\`.\`tel\` AS \`seller.tel\`, \`seller\`.\`actorTypeId\` AS \`seller.actorTypeId\`, \`seller\`.\`ville\` AS \`seller.ville\`, \`payments\`.\`paymentId\` AS \`payments.paymentId\`, \`payments\`.\`etat\` AS \`payments.etat\`, \`payments\`.\`paymentValue\` AS \`payments.paymentValue\`, \`payments\`.\`paymentType\` AS \`payments.paymentType\`, \`payments\`.\`factureId\` AS \`payments.factureId\`, strftime('%s', \`facture\`.\`date\`) AS \`date_format\`, \`commandes\`.\`orderId\` AS \`commandes.orderId\`, \`commandes\`.\`contenuAdditionnel\` AS \`commandes.contenuAdditionnel\`, \`commandes\`.\`priceHt\` AS \`commandes.priceHt\`, \`commandes\`.\`factureId\` AS \`commandes.factureId\` FROM \`facture\` AS \`facture\` LEFT OUTER JOIN \`langue\` AS \`langue\` ON \`facture\`.\`languageId\` = \`langue\`.\`langueId\` LEFT OUTER JOIN \`devise\` AS \`devise\` ON \`facture\`.\`deviseId\` = \`devise\`.\`deviseId\` LEFT OUTER JOIN \`personne\` AS \`buyer\` ON \`facture\`.\`buyerId\` = \`buyer\`.\`actorId\` LEFT OUTER JOIN \`personne\` AS \`seller\` ON \`facture\`.\`sellerId\` = \`seller\`.\`actorId\` LEFT OUTER JOIN \`payment\` AS \`payments\` ON \`facture\`.\`factureId\` = \`payments\`.\`factureId\` LEFT OUTER JOIN \`commande\` AS \`commandes\` ON \`facture\`.\`factureId\` = \`commandes\`.\`factureId\` WHERE \`facture\`.\`administratorId\` = '${usr.user.userId}'  AND \`date_format\` > strftime('%s', '${dateStartLibelle}')`;

      // console.log(sql);
      let counterSess = await prefs.getPref('counter');
      values = await newQuery(props.dbConn, sql);
      // console.log(values);
      if (!!values && values.values.length){
        const intRes = sanitizeQueryResult(values.values);
        // console.log(intRes);
        await setDecryptApi();
        const res = await __TRANSFORMOBJ__(intRes);
        // console.log(res);
        // let counterSess = await prefs.getPref('counter');
        // console.log(counterSess);
        counterSess = !!counterSess ? counterSess : {};
        counterSess.invoicesFY = res;
        invoices.value = res;
        await prefs.setPref('counter', counterSess, false);
      }
      else {
        invoices.value = [];
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
  renderStats.value = true;
});

// OTHERS


</script>
