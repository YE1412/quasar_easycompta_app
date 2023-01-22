<template>
  <div class='q-pa-md'>
    <q-table
      v-if="!isForm"
      :title="tableTitle" 
      flat
      bordered
      :columns="tableHeadForDisplay"
      :rows="contentsForDisp"
      :row-key="ident"
      :no-data-label="no_data_label"
      :no-results-label="t('forms.errors.empty.filterBodyContentText')"
      separator="horizontal"
      :dense="compact">
      <template v-slot:no-data="{icon, message}">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied"/>
          <span>{{ message }}</span>
          <q-icon size="2em" :name="icon"/>
          <q-btn color="purple" icon="add_circle" :label="no_data_button_text" glossy unelevated @click="$emit(addActionName, $event, false)"></q-btn>
        </div>
      </template>
      <template v-slot:body="propos">
        <q-tr :props="propos">
          <q-td :data-key="key" v-for="(cont, key) in contentsForDisp[propos.rowIndex]"
            :key="key"
            :props="propos">
            {{ propos.row[key] }}
          </q-td>
          <q-td v-if="admin">
            <div style="text-align: center;display: flex;justify-content: space-around;">
              <q-btn color="primary" icon="add_circle" :label="t('forms.addButtonText')" glossy unelevated @click="$emit(addActionName, $event, false)"></q-btn>
              <q-btn color="secondary" icon="update" :label="t('forms.updateButtonText')" glossy unelevated @click="$emit(updateActionName, $event, false, contents[propos.rowIndex])"></q-btn>
              <q-btn color="negative" icon="cancel" :label="t('forms.deleteButtonText')" glossy unelevated @click="$emit(deleteActionName, $event, propos.row[ident])"></q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table v-if="isForm && (adding || updating)"
      :title="tableTitle" 
      flat
      bordered
      :columns="tableHeadForDisplay"
      :rows="addDefaultRow"
      :row-key="ident"
      separator="horizontal"
      :dense="platform.is.desktop ? false : true">
      <template v-slot:body>
        <q-tr>
          <slot
            :name="addForm">
          </slot>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
/*eslint @typescript-eslint/no-explicit-any: 'off'*/
/*eslint @typescript-eslint/no-unused-vars: 'off'*/
import { inject, computed, onMounted, ref, watch } from 'vue';
import { InputObjectCollection } from './models';
import { useUserStore } from 'stores/user';
import { useServiceStore } from 'stores/service';
import { useActorStore } from 'stores/actor';
import { useOrderStore } from 'stores/order';
import { usePaymentStore } from 'stores/payment';
import { useInvoiceStore } from 'stores/invoice';
import { useSessionStore } from 'stores/session';
// import { Capacitor } from '@capacitor/core';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { openDbConnection, isDbConnectionOpen, newQuery, closeDbConnection } from 'cap/storage';
import { setDecryptApi, __TRANSFORMOBJ__ } from 'src/globals';

// VARIABLES
const $q = useQuasar();
const { t } = useI18n({ useScope: 'global' });
const platform = $q.platform;
const src = inject('src');
// const isFullscreen = ref(false);
interface TableItemProps {
  tableTitle: string;
  isForm?: boolean;
  // tableHead?: string[];
  // emptyTableText?: string;
  addActionName: string;
  updateActionName: string;
  deleteActionName: string;
  updating: boolean;
  adding: boolean;
  addForm: string;
  tableObj: InputObjectCollection;
  addDefaultRow: object[];
  updateObj?: InputObjectCollection;
  admin: boolean;
  display: boolean;
  colSpan?: string;
  ident: string;
  no_data_label: string;
  no_data_button_text: string;
  dbConn?: SQLiteDBConnection | null; 
};
type FieldFunc = (row: object) => any;
type StyleClassesFunc = (row: object) => string;
interface TableColumnDef {
  name: string;
  label: string;
  field: string | FieldFunc;
  required?: boolean;
  align?: string;
  sortable?: boolean;
  sort?(a: any, b: any, rowA: object, rowB:object): number;
  sortOrder?: string;
  format?(val: any, row: object): any;
  style?: string | StyleClassesFunc;
  classes?: string | StyleClassesFunc;
  headerStyle?: string;
  headerClasses?: string;
};
const props = withDefaults(defineProps<TableItemProps>(), {
  tableTitle: '',
  isForm: false,
  // tableHead: () => ([]),
  // emptyTableText: 'Empty !',
  addActionName: '',
  updateActionName: '',
  deleteActionName: '',
  updating: false,
  adding: true,
  addForm: '',
  tableObj: () => ({label: '', name: ''}),
  addDefaultRow: () => ([]),
  admin: true,
  display: false,
  colSpan: '1',
  ident: '',
  no_data_label: '',
  no_data_button_text: '',
});
const objContents = ref([]);
// const idents = ref([]);
const contents = ref([]);
// const contentVal = ref('');
// const objLength = computed(() => {
//   return objContents.value.length;
// });
const tableActorsTypeLibelle = computed(() => {
  let ret = [];
  if (src === 'actors') {
    for (const k in objContents.value) {
      for (const l in objContents.value[k]) {
        if (l === 'personne_type') {
          let libelle = objContents.value[k][l].seller && objContents.value[k][l].buyer ? t('actorsComponent.libelles.actorTypes.both') : '';
          libelle = objContents.value[k][l].seller && !objContents.value[k][l].buyer ? t('actorsComponent.libelles.actorTypes.seller') : libelle;
          libelle = !objContents.value[k][l].seller && objContents.value[k][l].buyer ? t('actorsComponent.libelles.actorTypes.buyer') : libelle;
          ret[k] = libelle;
        }
      }
    }
  }
  return ret;
});
const contentsForDisp = computed(() => {
  let ret = [];
  // console.log('contentsForDisp -->');
  // console.log(objContents.value);
  for (const key in objContents.value) {
      ret[key] = {};
      for (const key2 in objContents.value[key]) {
        if (key2 === 'personne_type') {
          ret[key][key2] = tableActorsTypeLibelle.value[key];
        }
        else if (key2 === 'numCommercant') {
          ret[key][key2] = tableActorsSellNumLibelle(key);
        }
        else if (key2 === 'facture') {
          ret[key][key2] = tableOrdersInvoiceLibelle(key);
        } 
        else if (key2 === 'Services') {
          ret[key]['services'] = tableOrdersServicesLibelle(key);
        }
         else if (key2 === 'contenuAdditionnel') {
          ret[key][key2] = tableOrdersAddContentLibelle(key);
        }
        else if (key2 === 'payment_type') {
          ret[key][key2] = tablePaymentsTypeLibelle(key);
        } else if (key2 === 'etat') {
          ret[key][key2] = tablePaymentsStateLibelle(key);
        } 
        else if (key2 === 'buyer') {
          ret[key][key2] = tableInvoicesBuyerLibelle(key);
        } 
        else if (key2 === 'seller') {
          ret[key][key2] = tableInvoicesSellerLibelle(key);
        } 
        else if (key2 === 'commandes') {
          ret[key][key2] = tableInvoicesOrdersLibelle(key);
        } 
        else if (key2 === 'devise') {
          ret[key][key2] = tableInvoicesDeviseLibelle(key);
        } 
        else if (key2 === 'langue') {
          ret[key][key2] = tableInvoicesLangueLibelle(key);
        } 
        else if (key2 === 'payments') {
          ret[key][key2] = tableInvoicesPaymentsLibelle(key);
        } else if (key2 === 'tvaValue') {
          ret[key][key2] = tableInvoicesVATLibelle(key);
        } 
        else if (key2 === 'date') {
          ret[key][key2] = tableInvoicesDateLibelle(key);
        }
        else {
          ret[key][key2] = objContents.value[key][key2];
        }
      }
    }
    return ret;
});
const tableHeadForDisplay: Ref<TableColumnDef[]> = ref([]);
const emits = [props.addActionName, props.updateActionName, props.deleteActionName];
const orientation = ref(null);
const compact = computed(() => {
  let ret = false;
  if (!!orientation.value){
    if (orientation.value === 'portrait-primary' || orientation.value === 'portrait-secondary'){
      ret = true;
    }
  }
  return ret;
});
// console.log(props);
let serviceStore = null, actorStore = null, orderStore = null, paymentStore = null, invoiceStore = null, sessionStore = null, userStore = null, prefs = null, session = null;

// DECLARATIONS
if (platform.is.desktop) {
  serviceStore = useServiceStore();
  actorStore = useActorStore();
  orderStore = useOrderStore();
  paymentStore = usePaymentStore();
  invoiceStore = useInvoiceStore();
  sessionStore = useSessionStore();
  userStore = useUserStore();
} 
else {
  orientation.value = window.screen.orientation.type;
  window.addEventListener('orientationchange', handleOrientation);
  (async () => {
    prefs = await import('cap/storage/preferences');
    session = await prefs.getPref('session');
  })();
}

// FUNCTIONS
async function hydrateObjContentFromStore() {
  let contentTab = [];
  if (src === 'services') {
    return (contentTab = await serviceStore.getAllServices()
      .then((res) => {
        return res;
      }, () => {
        return [];
      })
      .catch(() => {
        return [];
      })
    );
  } else if (src === 'actors'){
    return (contentTab = await actorStore.getAllActors()
      .then((res) => {
        return res;
      }, () => {
        return [];
      })
      .catch(() => {
        return [];
      })
    );
  } else if (src === 'orders') {
    return (contentTab = await orderStore.getAllOrders()
      .then((res) => {
        return res;
      }, () => {
        return [];
      })
      .catch(() => {
        return [];
      })
    );
  } else if(src === 'payments') {
    return (contentTab = await paymentStore.getAllPayments()
      .then((res) => {
        return res;
      }, () => {
        return [];
      })
      .catch(() => {
        return [];
      })
    );
  }
  else if (src === 'invoices') {
    return (contentTab = await invoiceStore.getAllInvoices(userStore.getUser.userId)
      .then((res) => {
        return res;
      }, () => {
        return [];
      })
      .catch(() => {
        return [];
      })
    );
  }
  else {
    return contentTab;
  }
};
async function hydrateObjContentFromSQLite() {
  // console.log('hydrate from SQLite !');
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  let res = [];
  if (isOpen) {
    let sql = '';
    if (src === 'services') {
      sql = 'SELECT `service`.`serviceId`, `service`.`nom`, `service`.`montantHt`, `service`.`quantite` FROM `produitservice` AS `service`;';
      const values = await newQuery(props.dbConn, sql);
       // console.log(values);
      // await setDecryptApi();
      // res = await __TRANSFORMOBJ__(values.values);
      // console.log(res);
      res = values.values;
    } else if (src === 'actors') {
      sql = 'SELECT `personne`.`actorId`, `personne`.`prenom`, `personne`.`nom`, `personne`.`email`, `personne`.`numRue`, `personne`.`nomRue`, `personne`.`cp`, `personne`.`ville`, `personne`.`tel`, `personne`.`numCommercant`, `personne_type`.`actorTypeId`, `personne_type`.`actorTypeId` AS `personne_type.actorTypeId`, `personne_type`.`seller` AS `personne_type.seller`, `personne_type`.`buyer` AS `personne_type.buyer` FROM `personne` AS `personne` LEFT OUTER JOIN `personne_type` AS `personne_type` ON `personne`.`actorTypeId` = `personne_type`.`actorTypeId`;';
      const values = await newQuery(props.dbConn, sql);
       // console.log(values);
      // await setDecryptApi();
      // res = await __TRANSFORMOBJ__(values.values);
      // console.log(res);
      res = values.values;
    } else if(src === 'orders') {
      sql = 'SELECT `commande`.`orderId`, `commande`.`contenuAdditionnel`, `commande`.`priceHt`, `Services`.`serviceId` AS `Services.serviceId`, `Services`.`montantHt` AS `Services.montantHt`, `Services`.`nom` AS `Services.nom`, `Services`.`quantite` AS `Services.quantite`, `facture`.`factureId` AS `facture.factureId`, `facture`.`date` AS `facture.date`, `facture`.`invoiceHTPrice` AS `facture.invoiceHTPrice`, `facture`.`invoiceTTPrice` AS `facture.invoiceTTPrice`, `facture`.`languageId` AS `facture.languageId`, `facture`.`deviseId` AS `facture.deviseId`, `facture`.`tvaValue` AS `facture.tvaValue`, `facture`.`buyerId` AS `facture.buyerId`, `facture`.`sellerId` AS `facture.sellerId`, `facture`.`administratorId` AS `facture.administratorId` FROM `commande` AS `commande` LEFT OUTER JOIN ( `contains` AS `Services->contains` INNER JOIN `produitservice` AS `Services` ON `Services`.`serviceId` = `Services->contains`.`serviceId`) ON `commande`.`orderId` = `Services->contains`.`orderId` LEFT OUTER JOIN `facture` AS `facture` ON `commande`.`factureId` = `facture`.`factureId`;';
      const values = await newQuery(props.dbConn, sql);
       // console.log(values);
      // await setDecryptApi();
      // res = await __TRANSFORMOBJ__(values.values);
      // console.log(res);
      res = values.values;
    } else if(src === 'payments') {
      sql = 'SELECT `payment`.`paymentId`, `payment`.`etat`, `payment`.`paymentValue`, `payment_type`.`paymentTypeId` AS `payment_type.paymentTypeId`, `payment_type`.`cb` AS `payment_type.cb`, `payment_type`.`esp` AS `payment_type.esp`, `payment_type`.`chq` AS `payment_type.chq`, `facture`.`factureId` AS `facture.factureId`, `facture`.`date` AS `facture.date`, `facture`.`invoiceHTPrice` AS `facture.invoiceHTPrice`, `facture`.`invoiceTTPrice` AS `facture.invoiceTTPrice`, `facture`.`languageId` AS `facture.languageId`, `facture`.`deviseId` AS `facture.deviseId`, `facture`.`tvaValue` AS `facture.tvaValue`, `facture`.`buyerId` AS `facture.buyerId`, `facture`.`sellerId` AS `facture.sellerId`, `facture`.`administratorId` AS `facture.administratorId` FROM `payment` AS `payment` LEFT OUTER JOIN `payment_type` AS `payment_type` ON `payment`.`paymentType` = `payment_type`.`paymentTypeId` LEFT OUTER JOIN `facture` AS `facture` ON `payment`.`factureId` = `facture`.`factureId`;';
      const values = await newQuery(props.dbConn, sql);
      // await setDecryptApi();
      // res = await __TRANSFORMOBJ__(values.values);
      // console.log(res);
      res = values.values;
    } else if(src === 'invoices'){
      prefs = await import('cap/storage/preferences');
      const usr = await prefs.getPref('user');
      sql = 'SELECT `facture`.`factureId`, `facture`.`date`, `facture`.`invoiceHTPrice`, `facture`.`invoiceTTPrice`, `facture`.`tvaValue`, `langue`.`langueId` AS `langue.langueId`, `langue`.`libelle` AS `langue.libelle`, `langue`.`nom` AS `langue.nom`, `devise`.`deviseId` AS `devise.deviseId`, `devise`.`symbole` AS `devise.symbole`, `devise`.`libelle` AS `devise.libelle`, `buyer`.`actorId` AS `buyer.actorId`, `buyer`.`cp` AS `buyer.cp`, `buyer`.`email` AS `buyer.email`, `buyer`.`nom` AS `buyer.nom`, `buyer`.`nomRue` AS `buyer.nomRue`, `buyer`.`numCommercant` AS `buyer.numCommercant`, `buyer`.`numRue` AS `buyer.numRue`, `buyer`.`prenom` AS `buyer.prenom`, `buyer`.`tel` AS `buyer.tel`, `buyer`.`actorTypeId` AS `buyer.actorTypeId`, `buyer`.`ville` AS `buyer.ville`, `seller`.`actorId` AS `seller.actorId`, `seller`.`cp` AS `seller.cp`, `seller`.`email` AS `seller.email`, `seller`.`nom` AS `seller.nom`, `seller`.`nomRue` AS `seller.nomRue`, `seller`.`numCommercant` AS `seller.numCommercant`, `seller`.`numRue` AS `seller.numRue`, `seller`.`prenom` AS `seller.prenom`, `seller`.`tel` AS `seller.tel`, `seller`.`actorTypeId` AS `seller.actorTypeId`, `seller`.`ville` AS `seller.ville`, `commandes`.`orderId` AS `commandes.orderId`, `commandes`.`contenuAdditionnel` AS `commandes.contenuAdditionnel`, `commandes`.`priceHt` AS `commandes.priceHt`, `commandes`.`factureId` AS `commandes.factureId`, `payments`.`paymentId` AS `payments.paymentId`, `payments`.`etat` AS `payments.etat`, `payments`.`paymentValue` AS `payments.paymentValue`, `payments`.`paymentType` AS `payments.paymentType`, `payments`.`factureId` AS `payments.factureId` FROM `facture` AS `facture` LEFT OUTER JOIN `langue` AS `langue` ON `facture`.`languageId` = `langue`.`langueId` LEFT OUTER JOIN `devise` AS `devise` ON `facture`.`deviseId` = `devise`.`deviseId` LEFT OUTER JOIN `personne` AS `buyer` ON `facture`.`buyerId` = `buyer`.`actorId` LEFT OUTER JOIN `personne` AS `seller` ON `facture`.`sellerId` = `seller`.`actorId` LEFT OUTER JOIN `commande` AS `commandes` ON `facture`.`factureId` = `commandes`.`factureId` LEFT OUTER JOIN `payment` AS `payments` ON `facture`.`factureId` = `payments`.`factureId` WHERE `facture`.`administratorId` = \''+usr.user.userId+'\' GROUP BY `facture`.`factureId`, `payments.paymentId`, `commandes.orderId`;';
      const values = await newQuery(props.dbConn, sql);
      // await setDecryptApi();
      // res = await __TRANSFORMOBJ__(values.values);
      // console.log(res);
      res = values.values;
    }
    closeDbConnection(props.dbConn);
    return res;
  }
  return res;
};
function transformObjContentFromSQLiteDb() {
  if (platform.is.mobile) {
    // console.log(objContents.value);
    let ret = [];
    if (src === 'actors') {
      for (const k in objContents.value) {
        ret[k] = {};
        for (const l in objContents.value[k]) {
          if (l === 'personne_type.actorTypeId') {
            ret[k]['personne_type'] = ret[k]['personne_type'] === undefined ? {} : ret[k]['personne_type'];
            ret[k]['personne_type']['actorTypeId'] = objContents.value[k][l];
          } else if(l === 'personne_type.seller') {
            ret[k]['personne_type'] = ret[k]['personne_type'] === undefined ? {} : ret[k]['personne_type'];
            ret[k]['personne_type']['seller'] = objContents.value[k][l];
          } else if(l === 'personne_type.buyer') {
            ret[k]['personne_type'] = ret[k]['personne_type'] === undefined ? {} : ret[k]['personne_type'];
            ret[k]['personne_type']['buyer'] = objContents.value[k][l];
          } else {
            ret[k][l] = objContents.value[k][l];
          }
        }
      }
    } 
    else if(src === 'orders') {
      let ind = 0;
      for (const k in objContents.value) {
        const prevId = k > 0 ? objContents.value[k - 1].orderId : 0;
        if (prevId && prevId !== objContents.value[k].orderId){
          ind++;
        }
        if (!prevId || (prevId && prevId !== objContents.value[k].orderId)) {
          // console.log(`k --> ${k}/ind --> ${ind}`);
          ret[ind] = {};
        }
        // console.log(`prevId --> ${prevId}/objId --> ${objContents.value[k].orderId}/ind --> ${ind}`);
        for (const l in objContents.value[k]) {
          // console.log(l);
          if (prevId === objContents.value[k].orderId) {
            // console.log('equals');
            if (l === 'Services.serviceId') {
              // console.log(objContents.value[k][l]);
              ret[ind]['Services'] = ret[ind]['Services'] === undefined ? [] : ret[ind]['Services'];
                ret[ind]['Services'].push({serviceId: objContents.value[k][l]});
            } 
            else if(l === 'Services.montantHt') {
              ret[ind]['Services'] = ret[ind]['Services'] === undefined ? [] : ret[ind]['Services'];
              if (!ret[ind]['Services'].length){
                ret[ind]['Services'].push({montantHt: objContents.value[k][l]});
              }
              else{
                ret[ind]['Services'][ret[ind]['Services'].length - 1].montantHt = objContents.value[k][l];
              }
            } else if(l === 'Services.nom') {
              ret[ind]['Services'] = ret[ind]['Services'] === undefined ? [] : ret[ind]['Services'];
              if (!ret[ind]['Services'].length){
                ret[ind]['Services'].push({nom: objContents.value[k][l]});
              }
              else{
                ret[ind]['Services'][ret[ind]['Services'].length - 1].nom = objContents.value[k][l];
              }
            } else if (l === 'Services.quantite') {
              ret[ind]['Services'] = ret[ind]['Services'] === undefined ? [] : ret[ind]['Services'];
              if (!ret[ind]['Services'].length){
                ret[ind]['Services'].push({quantite: objContents.value[k][l]});
              }
              else{
                ret[ind]['Services'][ret[ind]['Services'].length - 1].quantite = objContents.value[k][l];
              }
            }
            // console.log(ind);
            // console.log(ret[ind]);
          }
          else {
            if (l === 'Services.serviceId') {
              ret[ind]['Services'] = ret[ind]['Services'] === undefined ? [] : ret[ind]['Services'];
              if (!ret[ind]['Services'].length){
                ret[ind]['Services'].push({serviceId: objContents.value[k][l]});
              }
              else{
                ret[ind]['Services'][ret[ind]['Services'].length - 1].serviceId = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            } 
            else if(l === 'Services.montantHt') {
              ret[ind]['Services'] = ret[ind]['Services'] === undefined ? [] : ret[ind]['Services'];
              if (!ret[ind]['Services'].length){
                ret[ind]['Services'].push({montantHt: objContents.value[k][l]});
              }
              else{
                ret[ind]['Services'][ret[ind]['Services'].length - 1].montantHt = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            } 
            else if(l === 'Services.nom') {
              ret[ind]['Services'] = ret[ind]['Services'] === undefined ? [] : ret[ind]['Services'];
              if (!ret[ind]['Services'].length){
                ret[ind]['Services'].push({nom: objContents.value[k][l]});
              }
              else{
                ret[ind]['Services'][ret[ind]['Services'].length - 1].nom = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            } 
            else if (l === 'Services.quantite') {
              ret[ind]['Services'] = ret[ind]['Services'] === undefined ? [] : ret[ind]['Services'];
              if (!ret[ind]['Services'].length){
                ret[ind]['Services'].push({quantite: objContents.value[k][l]});
              }
              else{
                ret[ind]['Services'][ret[ind]['Services'].length - 1].quantite = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            } 
            else if (l === 'facture.factureId') {
              ret[ind]['facture'] = ret[ind]['facture'] === undefined ? {} : ret[ind]['facture'];
              if (objContents.value[k][l] === null) {
                ret[ind]['facture'] = null;
              } else {
                ret[ind]['facture']['factureId'] = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            } 
            else if (l === 'facture.date') {
              ret[ind]['facture'] = ret[ind]['facture'] === undefined ? {} : ret[ind]['facture'];
              if (objContents.value[k][l] === null) {
                ret[ind]['facture'] = null;
              } else {
                ret[ind]['facture']['date'] = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            } 
            else if (l === 'facture.invoiceHTPrice') {
              ret[ind]['facture'] = ret[ind]['facture'] === undefined ? {} : ret[ind]['facture'];
              if (objContents.value[k][l] === null) {
                ret[ind]['facture'] = null;
              } else {
                ret[ind]['facture']['invoiceHTPrice'] = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            }
            else if (l === 'facture.invoiceTTPrice') {
              ret[ind]['facture'] = ret[ind]['facture'] === undefined ? {} : ret[ind]['facture'];
              if (objContents.value[k][l] === null) {
                ret[ind]['facture'] = null;
              } else {
                ret[ind]['facture']['invoiceTTPrice'] = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            }
            else if (l === 'facture.languageId') {
              ret[ind]['facture'] = ret[ind]['facture'] === undefined ? {} : ret[ind]['facture'];
              if (objContents.value[k][l] === null) {
                ret[ind]['facture'] = null;
              } else {
                ret[ind]['facture']['lauguageId'] = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            }
            else if (l === 'facture.deviseId') {
              ret[ind]['facture'] = ret[ind]['facture'] === undefined ? {} : ret[ind]['facture'];
              if (objContents.value[k][l] === null) {
                ret[ind]['facture'] = null;
              } else {
                ret[ind]['facture']['deviseId'] = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            }
            else if (l === 'facture.tvaValue') {
              ret[ind]['facture'] = ret[ind]['facture'] === undefined ? {} : ret[ind]['facture'];
              if (objContents.value[k][l] === null) {
                ret[ind]['facture'] = null;
              } else {
                ret[ind]['facture']['tvaValue'] = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            } 
            else if (l === 'facture.buyerId') {
              ret[ind]['facture'] = ret[ind]['facture'] === undefined ? {} : ret[ind]['facture'];
              if (objContents.value[k][l] === null) {
                ret[ind]['facture'] = null;
              } else {
                ret[ind]['facture']['buyerId'] = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            } 
            else if (l === 'facture.sellerId') {
              ret[ind]['facture'] = ret[ind]['facture'] === undefined ? {} : ret[ind]['facture'];
              if (objContents.value[k][l] === null) {
                ret[ind]['facture'] = null;
              } else {
                ret[ind]['facture']['sellerId'] = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            } 
            else if (l === 'facture.administratorId') {
              ret[ind]['facture'] = ret[ind]['facture'] === undefined ? {} : ret[ind]['facture'];
              if (objContents.value[k][l] === null) {
                ret[ind]['facture'] = null;
              } else {
                ret[ind]['facture']['administratorId'] = objContents.value[k][l];
              }
              // console.log(ret[ind]);
            } 
            else {
              ret[ind][l] = objContents.value[k][l];
            }
          }
        }
      }
      // console.log(ret);
    } else if (src === 'payments') {
      for (const k in objContents.value) {
        ret[k] = {};
        for (const l in objContents.value[k]) {
          if (l === 'payment_type.paymentTypeId') {
            ret[k]['payment_type'] = ret[k]['payment_type'] === undefined ? {} : ret[k]['payment_type'];
            ret[k]['payment_type'].paymentTypeId = objContents.value[k][l];
          }
          else if (l === 'payment_type.cb'){
            ret[k]['payment_type'] = ret[k]['payment_type'] === undefined ? {} : ret[k]['payment_type'];
            ret[k]['payment_type'].cb = objContents.value[k][l];
          }
          else if (l === 'payment_type.esp'){
            ret[k]['payment_type'] = ret[k]['payment_type'] === undefined ? {} : ret[k]['payment_type'];
            ret[k]['payment_type'].esp = objContents.value[k][l];
          }
          else if (l === 'payment_type.chq'){
            ret[k]['payment_type'] = ret[k]['payment_type'] === undefined ? {} : ret[k]['payment_type'];
            ret[k]['payment_type'].chq = objContents.value[k][l];
          }
          else if (l === 'facture.factureId'){
            ret[k]['facture'] = ret[k]['facture'] === undefined ? {} : ret[k]['facture'];
            ret[k]['facture']['factureId'] = objContents.value[k][l];
          }
          else if (l === 'facture.date') {
            ret[k]['facture'] = ret[k]['facture'] === undefined ? {} : ret[k]['facture'];
            ret[k]['facture']['date'] = objContents.value[k][l];
            // console.log(ret[k]);
          } 
          else if (l === 'facture.invoiceHTPrice') {
            ret[k]['facture'] = ret[k]['facture'] === undefined ? {} : ret[k]['facture'];
            ret[k]['facture']['invoiceHTPrice'] = objContents.value[k][l];
            // console.log(ret[k]);
          }
          else if (l === 'facture.invoiceTTPrice') {
            ret[k]['facture'] = ret[k]['facture'] === undefined ? {} : ret[k]['facture'];
            ret[k]['facture']['invoiceTTPrice'] = objContents.value[k][l];
            // console.log(ret[k]);
          }
          else if (l === 'facture.languageId') {
            ret[k]['facture'] = ret[k]['facture'] === undefined ? {} : ret[k]['facture'];
            ret[k]['facture']['lauguageId'] = objContents.value[k][l];
            // console.log(ret[k]);
          }
          else if (l === 'facture.deviseId') {
            ret[k]['facture'] = ret[k]['facture'] === undefined ? {} : ret[k]['facture'];
            ret[k]['facture']['deviseId'] = objContents.value[k][l];
            // console.log(ret[k]);
          }
          else if (l === 'facture.tvaValue') {
            ret[k]['facture'] = ret[k]['facture'] === undefined ? {} : ret[k]['facture'];
            ret[k]['facture']['tvaValue'] = objContents.value[k][l];
            // console.log(ret[k]);
          } 
          else if (l === 'facture.buyerId') {
            ret[k]['facture'] = ret[k]['facture'] === undefined ? {} : ret[k]['facture'];
            ret[k]['facture']['buyerId'] = objContents.value[k][l];
            // console.log(ret[k]);
          } 
          else if (l === 'facture.sellerId') {
            ret[k]['facture'] = ret[k]['facture'] === undefined ? {} : ret[k]['facture'];
            ret[k]['facture']['sellerId'] = objContents.value[k][l];
            // console.log(ret[k]);
          } 
          else if (l === 'facture.administratorId') {
            ret[k]['facture'] = ret[k]['facture'] === undefined ? {} : ret[k]['facture'];
            ret[k]['facture']['administratorId'] = objContents.value[k][l];
            // console.log(ret[k]);
          }
          else {
            ret[k][l] = objContents.value[k][l];
          }
        }
      }
    } else if (src === 'invoices') {
      let ind = 0;
      for (const k in objContents.value) {
        const prevId = k > 0 ? objContents.value[k - 1].factureId : 0;
        if (prevId && prevId !== objContents.value[k].factureId){
          ind++;
        }
        if (!prevId || (prevId && prevId !== objContents.value[k].factureId)) {
          // console.log(`k --> ${k}/ind --> ${ind}`);
          ret[ind] = {};
        }
        // console.log(`prevId --> ${prevId}/objId --> ${objContents.value[k].factureId}/ind --> ${ind}`);
        for (const l in objContents.value[k]) {
          // console.log(l);
          if (prevId === objContents.value[k].factureId) {
            if (l === 'commandes.orderId') {
              // console.log(objContents.value[k][l]);
              ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
              if(!ret[ind]['commandes'].length){
                if (objContents.value[k][l] !== null)
                  ret[ind]['commandes'].push({orderId: objContents.value[k][l]});
              }
              else {
                const foundIndex = ret[ind]['commandes'].findIndex(elem => elem.orderId === objContents.value[k][l]);
                if (objContents.value[k][l] !== null){
                  if (foundIndex === -1)
                    ret[ind]['commandes'].push({orderId: objContents.value[k][l]});
                  else
                    ret[ind]['commandes'][foundIndex].orderId = objContents.value[k][l];
                }
              }
            }
            else if(l === 'commandes.contenuAdditionnel') {
              ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
              // if (objContents.value[k][l] !== null){
                if (!ret[ind]['commandes'].length){
                  ret[ind]['commandes'].push({contenuAdditionnel: objContents.value[k][l]});
                }
                else{
                  const foundIndex = ret[ind]['commandes'].findIndex(elem => elem.orderId === objContents.value[k]['orderId']);
                  if (foundIndex === -1)
                    ret[ind]['commandes'][ret[ind]['commandes'].length - 1].contenuAdditionnel = objContents.value[k][l];
                  else
                    ret[ind]['commandes'][foundIndex].contenuAdditionnel = objContents.value[k][l];
                }
              // }
            }
            else if(l === 'commandes.priceHt') {
              ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
              if (objContents.value[k][l] !== null) {
                if (!ret[ind]['commandes'].length){
                  ret[ind]['commandes'].push({priceHt: objContents.value[k][l]});
                }
                else{
                  const foundIndex = ret[ind]['commandes'].findIndex(elem => elem.orderId === objContents.value[k]['orderId']);
                  if (objContents.value[k][l] !== null){
                    if(foundIndex === -1)
                      ret[ind]['commandes'][ret[ind]['commandes'].length - 1].priceHt = objContents.value[k][l];
                    else
                      ret[ind]['commandes'][foundIndex].priceHt = objContents.value[k][l];
                  }
                }
              }
            }
            else if(l === 'commandes.factureId') {
              ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
              if (objContents.value[k][l] !== null){
                if (!ret[ind]['commandes'].length){
                  ret[ind]['commandes'].push({factureId: objContents.value[k][l]});
                }
                else{
                  const foundIndex = ret[ind]['commandes'].findIndex(elem => elem.orderId === objContents.value[k]['orderId']);
                  if (objContents.value[k][l] !== null){
                    if (foundIndex === -1)
                      ret[ind]['commandes'][ret[ind]['commandes'].length - 1].factureId = objContents.value[k][l];
                    else
                      ret[ind]['commandes'][foundIndex].factureId = objContents.value[k][l];
                  }
                }
              }
            }
            else if (l === 'payments.paymentId') {
              // console.log(objContents.value[k][l]);
              ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
              if(!ret[ind]['payments'].length){
                if (objContents.value[k][l] !== null)
                  ret[ind]['payments'].push({paymentId: objContents.value[k][l]});
              }
              else {
                const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === objContents.value[k][l]);
                if (objContents.value[k][l] !== null){
                  if (foundIndex === -1)
                    ret[ind]['payments'].push({paymentId: objContents.value[k][l]});
                  else
                    ret[ind]['payments'][foundIndex].paymentId = objContents.value[k][l];
                }
              }
            }
            else if (l === 'payments.etat') {
              // console.log(objContents.value[k][l]);
              ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
              if(!ret[ind]['payments'].length){
                if (objContents.value[k][l] !== null)
                  ret[ind]['payments'].push({etat: objContents.value[k][l]});
              }
              else {
                const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === objContents.value[k]['payments.paymentId']);
                if (objContents.value[k][l] !== null){
                  if (foundIndex === -1)
                    ret[ind]['payments'][ret[ind]['payments'].length - 1].etat = objContents.value[k][l];
                  else
                    ret[ind]['payments'][foundIndex].etat = objContents.value[k][l];
                }
              }
            }
            else if (l === 'payments.paymentValue') {
              // console.log(objContents.value[k][l]);
              ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
              if(!ret[ind]['payments'].length){
                if (objContents.value[k][l] !== null)
                  ret[ind]['payments'].push({paymentValue: objContents.value[k][l]});
              }
              else {
                const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === objContents.value[k]['payments.paymentId']);
                if (objContents.value[k][l] !== null){
                  if (foundIndex === -1)
                    ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentValue = objContents.value[k][l];
                  else
                    ret[ind]['payments'][foundIndex].paymentValue = objContents.value[k][l];
                }
              }
            }
            else if (l === 'payments.paymentType') {
              // console.log(objContents.value[k][l]);
              ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
              if(!ret[ind]['payments'].length){
                if (objContents.value[k][l] !== null)
                  ret[ind]['payments'].push({paymentType: objContents.value[k][l]});
              }
              else {
                const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === objContents.value[k]['payments.paymentId']);
                if (objContents.value[k][l] !== null){
                  if (foundIndex === -1)
                    ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentType = objContents.value[k][l];
                  else
                    ret[ind]['payments'][foundIndex].paymentType = objContents.value[k][l];
                }
              }
            }
            else if (l === 'payments.factureId') {
              // console.log(objContents.value[k][l]);
              ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
              if(!ret[ind]['payments'].length){
                if (objContents.value[k][l] !== null)
                  ret[ind]['payments'].push({factureId: objContents.value[k][l]});
              }
              else {
                const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === objContents.value[k]['payments.paymentId']);
                if (objContents.value[k][l] !== null){
                  if (foundIndex === -1)
                    ret[ind]['payments'][ret[ind]['payments'].length - 1].factureId = objContents.value[k][l];
                  else
                    ret[ind]['payments'][foundIndex].factureId = objContents.value[k][l];
                }
              }
            }
          }
          else {
            if (l === 'langue.langueId') {
              ret[ind]['langue'] = ret[ind]['langue'] === undefined ? {} : ret[ind]['langue'];
              if (objContents.value[k][l] === null) {
                ret[ind]['langue'] = null;
              } else {
                ret[ind]['langue']['langueId'] = objContents.value[k][l];
              }
            }
            else if(l === 'langue.libelle'){
              ret[ind]['langue'] = ret[ind]['langue'] === undefined ? {} : ret[ind]['langue'];
              if (objContents.value[k][l] === null) {
                ret[ind]['langue'] = null;
              } else {
                ret[ind]['langue']['libelle'] = objContents.value[k][l];
              }
            }
            else if (l === 'langue.nom'){
              ret[ind]['langue'] = ret[ind]['langue'] === undefined ? {} : ret[ind]['langue'];
              if (objContents.value[k][l] === null) {
                ret[ind]['langue'] = null;
              } else {
                ret[ind]['langue']['nom'] = objContents.value[k][l];
              }
            }
            else if (l === 'devise.deviseId'){
              ret[ind]['devise'] = ret[ind]['devise'] === undefined ? {} : ret[ind]['devise'];
              if (objContents.value[k][l] === null) {
                ret[ind]['devise'] = null;
              } else {
                ret[ind]['devise']['deviseId'] = objContents.value[k][l];
              }
            }
            else if (l === 'devise.symbole'){
              ret[ind]['devise'] = ret[ind]['devise'] === undefined ? {} : ret[ind]['devise'];
              if (objContents.value[k][l] === null) {
                ret[ind]['devise'] = null;
              } else {
                ret[ind]['devise']['symbole'] = objContents.value[k][l];
              }
            }
            else if (l === 'devise.libelle'){
              ret[ind]['devise'] = ret[ind]['devise'] === undefined ? {} : ret[ind]['devise'];
              if (objContents.value[k][l] === null) {
                ret[ind]['devise'] = null;
              } else {
                ret[ind]['devise']['libelle'] = objContents.value[k][l];
              }
            }
            else if (l === 'buyer.actorId'){
              ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
              if (objContents.value[k][l] === null) {
                ret[ind]['buyer'] = null;
              } else {
                ret[ind]['buyer']['actorId'] = objContents.value[k][l];
              }
            }
            else if (l === 'buyer.cp'){
              ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
              if (objContents.value[k][l] === null) {
                ret[ind]['buyer'] = null;
              } else {
                ret[ind]['buyer']['cp'] = objContents.value[k][l];
              }
            }
            else if (l === 'buyer.email'){
              ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
              if (objContents.value[k][l] === null) {
                ret[ind]['buyer'] = null;
              } else {
                ret[ind]['buyer']['email'] = objContents.value[k][l];
              }
            }
            else if (l === 'buyer.nom'){
              ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
              if (objContents.value[k][l] === null) {
                ret[ind]['buyer'] = null;
              } else {
                ret[ind]['buyer']['nom'] = objContents.value[k][l];
              }
            }
            else if (l === 'buyer.nomRue'){
              ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
              if (objContents.value[k][l] === null) {
                ret[ind]['buyer'] = null;
              } else {
                ret[ind]['buyer']['nomRue'] = objContents.value[k][l];
              }
            }
            else if (l === 'buyer.numCommercant'){
              ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
              ret[ind]['buyer']['numCommercant'] = objContents.value[k][l];
            }
            else if (l === 'buyer.numRue'){
              ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
              if (objContents.value[k][l] === null) {
                ret[ind]['buyer'] = null;
              } else {
                ret[ind]['buyer']['numRue'] = objContents.value[k][l];
              }
            }
            else if (l === 'buyer.prenom'){
              ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
              if (objContents.value[k][l] === null) {
                ret[ind]['buyer'] = null;
              } else {
                ret[ind]['buyer']['prenom'] = objContents.value[k][l];
              }
            }
            else if (l === 'buyer.tel'){
              ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
              if (objContents.value[k][l] === null) {
                ret[ind]['buyer'] = null;
              } else {
                ret[ind]['buyer']['tel'] = objContents.value[k][l];
              }
            }
            else if (l === 'buyer.actorTypeId'){
              ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
              if (objContents.value[k][l] === null) {
                ret[ind]['buyer'] = null;
              } else {
                ret[ind]['buyer']['actorTypeId'] = objContents.value[k][l];
              }
            }
            else if (l === 'buyer.ville'){
              ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
              if (objContents.value[k][l] === null) {
                ret[ind]['buyer'] = null;
              } else {
                ret[ind]['buyer']['ville'] = objContents.value[k][l];
              }
            }
            else if (l === 'seller.actorId'){
              ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
              if (objContents.value[k][l] === null) {
                ret[ind]['seller'] = null;
              } else {
                ret[ind]['seller']['actorId'] = objContents.value[k][l];
              }
            }
            else if (l === 'seller.cp'){
              ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
              if (objContents.value[k][l] === null) {
                ret[ind]['seller'] = null;
              } else {
                ret[ind]['seller']['cp'] = objContents.value[k][l];
              }
            }
            else if (l === 'seller.email'){
              ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
              if (objContents.value[k][l] === null) {
                ret[ind]['seller'] = null;
              } else {
                ret[ind]['seller']['email'] = objContents.value[k][l];
              }
            }
            else if (l === 'seller.nom'){
              ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
              if (objContents.value[k][l] === null) {
                ret[ind]['seller'] = null;
              } else {
                ret[ind]['seller']['nom'] = objContents.value[k][l];
              }
            }
            else if (l === 'seller.nomRue'){
              ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
              if (objContents.value[k][l] === null) {
                ret[ind]['seller'] = null;
              } else {
                ret[ind]['seller']['nomRue'] = objContents.value[k][l];
              }
            }
            else if (l === 'seller.numCommercant'){
              ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
              ret[ind]['seller']['numCommercant'] = objContents.value[k][l];
            }
            else if (l === 'seller.numRue'){
              ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
              if (objContents.value[k][l] === null) {
                ret[ind]['seller'] = null;
              } else {
                ret[ind]['seller']['numRue'] = objContents.value[k][l];
              }
            }
            else if (l === 'seller.prenom'){
              ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
              if (objContents.value[k][l] === null) {
                ret[ind]['seller'] = null;
              } else {
                ret[ind]['seller']['prenom'] = objContents.value[k][l];
              }
            }
            else if (l === 'seller.tel'){
              ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
              if (objContents.value[k][l] === null) {
                ret[ind]['seller'] = null;
              } else {
                ret[ind]['seller']['tel'] = objContents.value[k][l];
              }
            }
            else if (l === 'seller.actorTypeId'){
              ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
              if (objContents.value[k][l] === null) {
                ret[ind]['seller'] = null;
              } else {
                ret[ind]['seller']['actorTypeId'] = objContents.value[k][l];
              }
            }
            else if (l === 'seller.ville'){
              ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
              if (objContents.value[k][l] === null) {
                ret[ind]['seller'] = null;
              } else {
                ret[ind]['seller']['ville'] = objContents.value[k][l];
              }
            }
            else if(l === 'commandes.orderId') {
              ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
              if (objContents.value[k][l] !== null) {
                if (!ret[ind]['commandes'].length){
                  ret[ind]['commandes'].push({orderId: objContents.value[k][l]});
                }
                else{
                  ret[ind]['commandes'][ret[ind]['commandes'].length - 1].orderId = objContents.value[k][l];
                }
              }
              // console.log(ret[ind]);
            }
            else if(l === 'commandes.contenuAdditionnel') {
              ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
              if (objContents.value[k][l] !== null) {
                if (!ret[ind]['commandes'].length){
                  ret[ind]['commandes'].push({contenuAdditionnel: objContents.value[k][l]});
                }
                else{
                  ret[ind]['commandes'][ret[ind]['commandes'].length - 1].contenuAdditionnel = objContents.value[k][l];
                }
              }
              // console.log(ret[ind]);
            }
            else if(l === 'commandes.priceHt') {
              ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
              if (objContents.value[k][l] !== null) {
                if (!ret[ind]['commandes'].length){
                  ret[ind]['commandes'].push({priceHt: objContents.value[k][l]});
                }
                else{
                  ret[ind]['commandes'][ret[ind]['commandes'].length - 1].priceHt = objContents.value[k][l];
                }
              }
              // console.log(ret[ind]);
            }
            else if(l === 'commandes.factureId') {
              ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
              if (objContents.value[k][l] !== null) {
                if (!ret[ind]['commandes'].length){
                  ret[ind]['commandes'].push({factureId: objContents.value[k][l]});
                }
                else{
                  ret[ind]['commandes'][ret[ind]['commandes'].length - 1].factureId = objContents.value[k][l];
                }
              }
              // console.log(ret[ind]);
            }
            else if(l === 'payments.paymentId') {
              ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
              if (objContents.value[k][l] !== null) {
                if (!ret[ind]['payments'].length){
                  ret[ind]['payments'].push({paymentId: objContents.value[k][l]});
                }
                else{
                  ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentId = objContents.value[k][l];
                }
              }
              // console.log(ret[ind]);
            }
            else if(l === 'payments.etat') {
              ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
              if (objContents.value[k][l] !== null) {
                if (!ret[ind]['payments'].length){
                  ret[ind]['payments'].push({etat: objContents.value[k][l]});
                }
                else{
                  ret[ind]['payments'][ret[ind]['payments'].length - 1].etat = objContents.value[k][l];
                }
              }
              // console.log(ret[ind]);
            }
            else if(l === 'payments.paymentValue') {
              ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
              if (objContents.value[k][l] !== null) {
                if (!ret[ind]['payments'].length){
                  ret[ind]['payments'].push({paymentValue: objContents.value[k][l]});
                }
                else{
                  ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentValue = objContents.value[k][l];
                }
              }
              // console.log(ret[ind]);
            }
            else if(l === 'payments.paymentType') {
              ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
              if (objContents.value[k][l] !== null) {
                if (!ret[ind]['payments'].length){
                  ret[ind]['payments'].push({paymentType: objContents.value[k][l]});
                }
                else{
                  ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentType = objContents.value[k][l];
                }
              }
              // console.log(ret[ind]);
            }
            else if(l === 'payments.factureId') {
              ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
              if (objContents.value[k][l] !== null) {
                if (!ret[ind]['payments'].length){
                  ret[ind]['payments'].push({factureId: objContents.value[k][l]});
                }
                else{
                  ret[ind]['payments'][ret[ind]['payments'].length - 1].factureId = objContents.value[k][l];
                }
              }
              // console.log(ret[ind]);
            }
            else {
              ret[ind][l] = objContents.value[k][l];
            }
          }
        }
      }
    }
    // else {
    //   ret = objContents.value
    // }
    if (src !== 'services'){   
      objContents.value = ret;
    }
    // console.log(`Obj transformed !`);
    // console.log(objContents.value);
  }
};
function tableActorsSellNumLibelle(ind: number) {
  let ret = '';
  let libelle = objContents.value[ind]['numCommercant'];
  if (objContents.value[ind]['numCommercant'] === null) {
    libelle = t('actorsComponent.libelles.no_sellerNum');
  }
  ret = libelle;
  return ret;
};
function tableOrdersInvoiceLibelle(ind: number) {
  let ret = '';
  let libelle = t('ordersComponent.libelles.no_invoice');
  if (objContents.value[ind]['facture'] !== null) {
    libelle = `${objContents.value[ind]['facture'].factureId} - ${objContents.value[ind]['facture'].invoiceTTPrice}`;
  }
  ret = libelle;
  return ret;
};
function tableOrdersServicesLibelle(ind: number) {
  let ret = '';
  if (objContents.value[ind]['Services'] !== null) {
    for (const m in objContents.value[ind]['Services']) {
      let libelle = `${objContents.value[ind]['Services'][m].serviceId} - ${objContents.value[ind]['Services'][m].nom}`;
      ret += m != objContents.value[ind]['Services'].length - 1 ? `${libelle}, ` : libelle;
    }
  }
  return ret;
};
function tableOrdersAddContentLibelle(ind: number) {
  let ret = '';
  let libelle = objContents.value[ind]['contenuAdditionnel'];
  if (objContents.value[ind]['contenuAdditionnel'] === null || 
    objContents.value[ind]['contenuAdditionnel'] === '') {
    libelle = t('ordersComponent.libelles.no_additional_content');
  }
  ret = libelle;
  return ret;
};
function tablePaymentsTypeLibelle(ind: number) {
  let ret = '';
  let libelle = objContents.value[ind]['payment_type'].cb ? t('paymentsComponent.libelles.types.cb') : '';
  libelle = objContents.value[ind]['payment_type'].esp ? t('paymentsComponent.libelles.types.esp') : libelle;
  libelle = objContents.value[ind]['payment_type'].chq ? t('paymentsComponent.libelles.types.chq') : libelle;
  ret = libelle;
  // console.log(ret);
  return ret;
};
function tablePaymentsStateLibelle(ind: number) {
  let ret = '';
  let libelle = objContents.value[ind]['etat'] === 1 ? t('paymentsComponent.libelles.etats.paid') : '';
  libelle = objContents.value[ind]['etat'] === 0 ? t('paymentsComponent.libelles.etats.not_paid') : libelle;
  ret = libelle;
  return ret;
};
function tableInvoicesBuyerLibelle(ind: number) {
  let ret = '';
  let libelle = `${objContents.value[ind]['buyer'].actorId} - ${objContents.value[ind]['buyer'].prenom} ${objContents.value[ind]['buyer'].nom}`;
  ret = libelle;
  return ret;
};
function tableInvoicesSellerLibelle(ind: number) {
  let ret = '';
  let libelle = `${objContents.value[ind]['seller'].actorId} - ${objContents.value[ind]['seller'].prenom} ${objContents.value[ind]['seller'].nom}`;
  ret = libelle;
  return ret;
};
function tableInvoicesOrdersLibelle(ind: number) {
  let ret = '', libelle = '';
  for (const m in objContents.value[ind]['commandes']) {
    libelle = `${objContents.value[ind]['commandes'][m].orderId} - ${objContents.value[ind]['commandes'][m].priceHt}`;
    ret += m != objContents.value[ind]['commandes'].length - 1 ? `${libelle}, ` : libelle;
  }
  ret = ret === '' ? t('invoicesComponent.libelles.no_order') : ret;
  return ret;
};
function tableInvoicesDeviseLibelle(ind: number) {
  let ret = '';
  let libelle = !!objContents.value[ind]['devise'] ? `${objContents.value[ind]['devise'].symbole} - ${objContents.value[ind]['devise'].libelle}` : t('invoicesComponent.libelles.no_devise');
  ret = libelle;
  return ret;
};
function tableInvoicesLangueLibelle(ind: numner) {
  let ret = '';
  let libelle = !!objContents.value[ind]['langue'] ? objContents.value[ind]['langue']['libelle'] : t('invoicesComponent.libelles.no_language');
  ret = libelle;
  return ret;
};
function tableInvoicesPaymentsLibelle(ind: number) {
  let ret = '', libelle = '', state = '';
  for (const m in objContents.value[ind]['payments']) {
    state = objContents.value[ind]['payments'][m].etat === 0 ? t('paymentsComponent.libelles.etats.not_paid') : '';
    state = objContents.value[ind]['payments'][m].etat === 1 ? t('paymentsComponent.libelles.etats.paid') : state;
    libelle = `${objContents.value[ind]['payments'][m].paymentId} - ${state} - ${objContents.value[ind]['payments'][m].paymentValue}`;
    ret += m != objContents.value[ind]['payments'].length - 1 ? `${libelle}, ` : libelle;
  }
  ret = ret === '' ? t('invoicesComponent.libelles.no_payment') : ret;
  return ret;
};
function tableInvoicesVATLibelle(ind: number) {
  let ret = '', libelle = '';
  libelle = `${objContents.value[ind].tvaValue * 100} %`;
  ret = libelle;
  return ret;
};
function tableInvoicesDateLibelle(ind: number) {
  const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
  let ret = '', libelle = '', date = '', locale='en-US';
  if (!!objContents.value[ind]['date'] && objContents.value[ind]['date'] !== '') {
    date = new Date(objContents.value[ind]['date']);
  }
  if (platform.is.desktop)
    locale = sessionStore.getLangDisplayed.nom;
  else{
    // Using Preferences for mobiles platform
    locale = !!session && !!session.langDisplayed ? session.langDisplayed.nom : 'en-US';
  }
  libelle = !!date ? `${date.toLocaleDateString(locale, options)}` : t('invoicesComponent.libelles.no_date');
  ret = libelle;
  return ret;
};
async function hydrateAll() {
  if (platform.is.desktop) {
    objContents.value = await hydrateObjContentFromStore();
    // console.log(objContents.value);
  } else {
    objContents.value = await hydrateObjContentFromSQLite();
    transformObjContentFromSQLiteDb();
    await setDecryptApi();
    const objClear = await __TRANSFORMOBJ__(objContents.value);
    objContents.value = objClear;
    // console.log('after decrypting !');
    // console.log(objContents.value);
  }
  // console.log('objContents -->');
  // console.log(objContents.value);
  // idents.value = shiftedIdents();
  contents.value = shiftedContents();
};
// function shiftedIdents() {
//   var that = this;
//   return objContents.value.map((val) => {
//     let ret = {};
//     for (const key in val) {
//       if (key === props.ident) {
//         ret[key] = val[key];
//       }
//     }
//     return ret;
//   }, that);
// };
function shiftedContents() {
  // var that = this;
  return objContents.value.map((val) => {
    let ret = val;
    // for (const key in val) {
    //   if (key !== props.ident) {
    //     ret[key] = val[key];
    //   }
    // }
    return ret;
  });
};
function fetchColumn() {
  let tableHead = [];
  let obj: TableColumnDef = {};
  obj.name = props.ident;
  obj.label = '#';
  obj.field = props.ident;
  obj.align = 'center';
  obj.sortable = false;
  tableHead.push(obj);
  for (const key in props.tableObj) {
    obj = {};
    obj.name = props.tableObj[key].name;
    obj.label = props.tableObj[key].head;
    obj.field = props.tableObj[key].name;
    obj.align = 'center';
    obj.sortable = false;
    tableHead.push(obj);
  } 
  // console.log(tableHead);
  return tableHead;
};
function handleOrientation(){
  // console.log(screen.orientation);
  orientation.value = screen.orientation.type;
};

// WATCHERS
watch(() => props.tableObj,
  () => {
    // console.log(`newProp -> ${newProp.actions}/oldProp -> ${again.actions}`);
    // tableHeadForDisplay.value = newProp;
    tableHeadForDisplay.value = fetchColumn();
  }
)

// LIFECYCLE EVENTS
onMounted(() => {
  if (!props.isForm){
    hydrateAll();
  }
  tableHeadForDisplay.value = fetchColumn();
});
</script>
