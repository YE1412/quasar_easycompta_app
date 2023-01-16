<template>
  <q-no-ssr>
    <MessagesItem v-if='messageVisibility && renderComponent'></MessagesItem>
  </q-no-ssr>
  <div style="width: 100%;">
    <table-item
      :tableTitle='t("actorsComponent.tableTitle")'
      :isForm='isForm'
      addForm='actorForm'
      :tableObj='adminPropRef ? addInputObject : displayInputObject'
      :addDefaultRow='defaultRow'
      addActionName='addClick'
      @addClick='addClickFromChild'
      updateActionName='updateClick'
      @updateClick='updateClickFromChild'
      deleteActionName='deleteClick'
      @deleteClick='deleteClickFromChild'
      ident='actorId'
      :updating='formState.update'
      :adding='formState.add'
      v-if='renderComponent'
      :admin='admin'
      :display='display'
      :no_data_label='t("actorsComponent.errors.empty.tableBodyContentText")'
      :no_data_button_text='t("actorsComponent.errors.empty.buttonAdding")'
      colSpan='4'
      :dbConn='dbConn'>
      <template #actorForm>
        <q-td style='text-align: center;'>
          <q-icon :name='formState.add ? "add" : "update"' size='sm'></q-icon>
        </q-td>
        <q-td style='text-align: center;'>
          <q-input
            v-model='prenom'
            type='text'
            :name='addInputObject.prenom.name'
            :label='addInputObject.prenom.label'
            :hint="t('actorsComponent.hints.firstName')"
            :hide-hint="true"
            :counter='false'
            :autogrow='false'
            :maxlength='15'
            :clearable='true'
            :placeholders='t("actorsComponent.placeholders.firstName")'
            :rules='[
              val => nonEmptyPrenom || t("actorsComponent.errors.empty.firstName"),
              val => validPrenom || t("actorsComponent.errors.error.firstName"),
              ]'
            >
              <template v-slot:prepend v-if='platform.is.desktop'>
                <q-icon name='badge'/>
              </template>
            </q-input>
        </q-td>
        <q-td style='text-align: center;'>
          <q-input
            v-model='nom'
            type='text'
            :name='addInputObject.nom.name'
            :label='addInputObject.nom.label'
            :hint="t('actorsComponent.hints.lastName')"
            :hide-hint="true"
            :counter='false'
            :autogrow='false'
            :maxlength='15'
            :clearable='true'
            :placeholders='t("actorsComponent.placeholders.lastName")'
            :rules='[
              val => nonEmptyNom || t("actorsComponent.errors.empty.lastName"),
              val => validNom || t("actorsComponent.errors.error.lastName"),
            ]'
          >
              <template v-slot:prepend v-if='platform.is.desktop'>
                <q-icon name='badge'/>
              </template>
            </q-input>
        </q-td>
        <q-td style='text-align: center;'>
          <q-input
            v-model='email'
            type='email'
            :name='addInputObject.email.name'
            :label='addInputObject.email.label'
            :hint="t('actorsComponent.hints.email')"
            :hide-hint="true"
            :counter='false'
            :autogrow='false'
            :maxlength='15'
            :clearable='true'
            :placeholders='t("actorsComponent.placeholders.email")'
            :rules='[
              val => nonEmptyEmail || t("actorsComponent.errors.empty.email"),
              val => validEmail || t("actorsComponent.errors.error.email"),
              ]'
          >
              <template v-slot:prepend v-if='platform.is.desktop'>
                <q-icon name='mail'/>
              </template>
            </q-input>
        </q-td>
        <q-td style='text-align: center;'>
          <q-input
            v-model='numRue'
            type='text'
            :name='addInputObject.numRue.name'
            :label='addInputObject.numRue.label'
            :hint="t('actorsComponent.hints.streetNum')"
            :hide-hint="true"
            :counter='false'
            :autogrow='false'
            :maxlength='15'
            :clearable='true'
            :placeholders='t("actorsComponent.placeholders.streetNum")'
            :rules='[
              val => nonEmptyNumRue || t("actorsComponent.errors.empty.streetNum"),
              val => validNumRue || t("actorsComponent.errors.error.streetNum"),
            ]'
          >
              <template v-slot:prepend v-if='platform.is.desktop'>
                <q-icon name='signpost'/>
              </template>
            </q-input>
        </q-td>
        <q-td style='text-align: center;'>
          <q-input
            v-model='nomRue'
            type='text'
            :name='addInputObject.nomRue.name'
            :label='addInputObject.nomRue.label'
            :hint="t('actorsComponent.hints.streetName')"
            :hide-hint="true"
            :counter='false'
            :autogrow='false'
            :maxlength='50'
            :clearable='true'
            :placeholders='t("actorsComponent.placeholders.streetName")'
            :rules='[
              val => nonEmptyNomRue || t("actorsComponent.errors.empty.streetName"),
              val => validNomRue || t("actorsComponent.errors.error.streetName"),
            ]'
          >
              <template v-slot:prepend v-if='platform.is.desktop'>
                <q-icon name='signpost'/>
              </template>
            </q-input>
        </q-td>
        <q-td style='text-align: center;'>
          <q-input
            v-model='cp'
            type='text'
            :name='addInputObject.cp .name'
            :label='addInputObject.cp.label'
            :hint="t('actorsComponent.hints.cp')"
            :hide-hint="true"
            :counter='false'
            :autogrow='false'
            :maxlength='15'
            :clearable='true'
            :placeholders='t("actorsComponent.placeholders.cp")'
            :rules='[
              val => nonEmptyCp || t("actorsComponent.errors.empty.cp"),
              val => validCp || t("actorsComponent.errors.error.cp"),
            ]'
          >
              <template v-slot:prepend v-if='platform.is.desktop'>
                <q-icon name='local_post_office'/>
              </template>
            </q-input>
        </q-td>
        <q-td style='text-align: center;'>
          <q-input
            v-model='ville'
            type='text'
            :name='addInputObject.ville.name'
            :label='addInputObject.ville.label'
            :hint="t('actorsComponent.hints.city')"
            :hide-hint="true"
            :counter='false'
            :autogrow='false'
            :maxlength='50'
            :clearable='true'
            :placeholders='t("actorsComponent.placeholders.city")'
            :rules='[
              val => nonEmptyVille || t("actorsComponent.errors.empty.city"),
              val => validVille || t("actorsComponent.errors.error.city"),
            ]'
          >
              <template v-slot:prepend v-if='platform.is.desktop'>
                <q-icon name='location_city'/>
              </template>
            </q-input>
        </q-td>
        <q-td style='text-align: center;'>
          <q-input
            v-model='tel'
            type='tel'
            :name='addInputObject.tel.name'
            :label='addInputObject.tel.label'
            :hint="t('actorsComponent.hints.tel')"
            :hide-hint="true"
            :counter='false'
            :autogrow='false'
            :maxlength='10'
            :clearable='true'
            :placeholders='t("actorsComponent.placeholders.tel")'
            :rules='[
              val => nonEmptyTel || t("actorsComponent.errors.empty.tel"),
              val => validTel || t("actorsComponent.errors.error.tel"),
            ]'
          >
              <template v-slot:prepend v-if='platform.is.desktop'>
                <q-icon name='call'/>
              </template>
            </q-input>
        </q-td>
        <q-td style='text-align: center;'>
          <q-input
            v-model='numCommercant'
            type='text'
            :name='addInputObject.numCommercant.name'
            :label='addInputObject.numCommercant.label'
            :hint="t('actorsComponent.hints.sellerNum')"
            :hide-hint="true"
            :counter='false'
            :autogrow='false'
            :maxlength='15'
            :clearable='true'
            :placeholders='t("actorsComponent.placeholders.sellerNum")'
            :rules='[
              val => nonEmptyNumCommercant || t("actorsComponent.errors.empty.sellerNum"),
              val => validNumCommercant || t("actorsComponent.errors.error.sellerNum"),
            ]'
            :disable='numCommercantState'>
              <template v-slot:prepend v-if='platform.is.desktop'>
                <q-icon name='storefront'/>
              </template>
            </q-input>
        </q-td>
        <q-td style='text-align: center'>
          <q-option-group
            :options='checkboxOptionTypes'
            type='checkbox'
            v-model='types'></q-option-group>
        </q-td>
        <q-td style='text-align: center;' class="flex-center">
          <q-btn v-if="formState.add"
            color="primary" 
            icon="add_circle" 
            :label="t('actorsComponent.errors.empty.buttonAdding')" 
            glossy unelevated
            :disabled="formSubmitButtonState"
            @click="addClickFromChild($event, true)">  
          </q-btn>
          <q-btn v-if="formState.update"
            color="secondary" 
            icon="update" 
            :label="t('actorsComponent.errors.empty.buttonUpdating')" 
            glossy unelevated
            :disabled="formSubmitButtonState"
            @click="updateClickFromChild($event, true)">  
          </q-btn>
        </q-td>
      </template>
    </table-item>
  </div>
</template>

<script setup lang="ts">
/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { nextTick, ref, provide, computed, watch } from 'vue';
// import { useActorStore } from 'stores/actor';
import { useMessageStore } from 'stores/message';
import TableItem from './TableItem.vue';
import MessagesItem from './MessagesItem.vue';
import actorAxiosService from 'db/services/actor.service';
import { InputObjectCollection, FormState } from './models';
import { useI18n } from 'vue-i18n';
// import { Capacitor } from '@capacitor/core';
import { useQuasar } from 'quasar';
// import { useRouter } from 'vue-router';
import { openDbConnection, isDbConnectionOpen, newRun, closeDbConnection } from 'cap/storage';
import { setGenApi, setCryptApi, __FORMATOBJ__ } from 'src/globals';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

// VARIABLES
interface ActorProps {
  actorForm?: boolean;
  admin: boolean;
  display: boolean;
  dbConn?: SQLiteDBConnection | null;
};
interface DefaultActorRow {
  actorId: number;
  prenom: string;
  nom: string;
  email: string;
  numRue: string;
  nomRue: string;
  cp: string;
  ville: string;
  tel: string;
  numCommercant: string | null;
  personne_type: string[];
  actions: string;
};
const props = withDefaults(defineProps<ActorProps>(), {
  ActorForm: false,
  admin: true,
  display: false,
  dbConn: null,
});
const $q = useQuasar();
// const router = useRouter();
const platform = $q.platform;
const renderComponent = ref(true);
const { t } = useI18n({ useScope: 'global' });
const displayInputObject: InputObjectCollection = {
  prenom: {
    label: t('actorsComponent.inputLabels.firstName'),
    head: t('actorsComponent.headTable.firstName'),
    name: 'prenom',
    placeholder: t('actorsComponent.placeholders.firstName'),
    disabled: false,
  },
  nom: {
    label: t('actorsComponent.inputLabels.lastName'),
    head: t('actorsComponent.headTable.lastName'),
    name: 'nom',
    placeholder: t('actorsComponent.placeholders.lastName'),
    disabled: false,
  },
  email: {
    label: t('actorsComponent.inputLabels.email'),
    head: t('actorsComponent.headTable.email'),
    name: 'email',
    placeholder: t('actorsComponent.placeholders.email'),
    disabled: false,
  },
  numRue: {
    label: t('actorsComponent.inputLabels.streetNum'),
    head: t('actorsComponent.headTable.streetNum'),
    name: 'numRue',
    placeholder: t('actorsComponent.placeholders.streetNum'),
    disabled: false,
  },
  nomRue: {
    label: t('actorsComponent.inputLabels.streetName'),
    head: t('actorsComponent.headTable.streetName'),
    name: 'nomRue',
    placeholder: t('actorsComponent.placeholders.streetName'),
    disabled: false,
  },
  cp: {
    label: t('actorsComponent.inputLabels.cp'),
    head: t('actorsComponent.headTable.cp'),
    name: 'cp',
    placeholder: t('actorsComponent.placeholders.cp'),
    disabled: false,
  },
  ville: {
    label: t('actorsComponent.inputLabels.city'),
    head: t('actorsComponent.headTable.city'),
    name: 'ville',
    placeholder: t('actorsComponent.placeholders.city'),
    disabled: false,
  },
  tel: {
    label: t('actorsComponent.inputLabels.tel'),
    head: t('actorsComponent.headTable.tel'),
    name: 'tel',
    placeholder: t('actorsComponent.placeholders.tel'),
    disabled: false,
  },
  numCommercant: {
    label: t('actorsComponent.inputLabels.sellerNum'),
    head: t('actorsComponent.headTable.sellerNum'),
    name: 'numCommercant',
    placeholder: t('actorsComponent.placeholders.sellerNum'),
    disabled: false,
  },
  personne_type: {
    label: t('actorsComponent.inputLabels.type'),
    head: t('actorsComponent.headTable.type'),
    name: 'personne_type',
    placeholder: t('actorsComponent.placeholders.type'),
    disabled: false,
  },
};
const addInputObject: InputObjectCollection = { 
  prenom: displayInputObject.prenom,
  nom: displayInputObject.nom,
  email: displayInputObject.email,
  numRue: displayInputObject.numRue,
  nomRue: displayInputObject.nomRue,
  cp: displayInputObject.cp,
  ville: displayInputObject.ville,
  tel: displayInputObject.tel,
  numCommercant: displayInputObject.numCommercant,
  personne_type: displayInputObject.personne_type,
  actions: {
    label: t('forms.headTable.action'),
    name: 'actions',
    head: t('forms.headTable.action'),
    placeholder: '',
    disabled: false,
  },
};
const adminPropRef = ref(props.admin);
const displayPropRef = ref(props.display);
const isForm = ref(props.actorForm);
const messageVisibility = ref(false);
const actorId = ref(0);
const prenom = ref('');
const nom = ref('');
const email = ref('');
const numRue = ref('');
const nomRue = ref('');
const cp = ref('');
const ville = ref('');
const tel = ref('');
const numCommercant = ref(null);
const checkboxOptionTypes = ref([
  { label: t('actorsComponent.inputLabels.buyerType'), value: '3' },
  { label: t('actorsComponent.inputLabels.sellerType'), value: '2' },
]);
const types = ref([]);
const formState: Ref<FormState> = ({
  update: false,
  add: true
});
const defaultRow: Ref<DefaultActorRow[]> = ref([]);
const validPrenom = computed(() => {
  const re = /^(([a-zA-Z])(\-)*){2,15}$/;
  return re.test(prenom.value);
});
const nonEmptyPrenom = computed(() => {
  return !!prenom.value && prenom.value != '';
});
const validNom = computed(() => {
  const re = /^([a-zA-Z]){2,15}$/;
  return re.test(nom.value);
});
const nonEmptyNom = computed(() => {
  return !!nom.value && nom.value != '';
});
const validEmail = computed(() => {
  // const re = /^(([a-zA-Z])(\-)*){2,15}$/;
  return true;
});
const nonEmptyEmail = computed(() => {
  return !!email.value && email.value != '';
});
const validNumRue = computed(() => {
  const re = /^(([0-9])(bis|ter)*)+$/i;
  return re.test(numRue.value);
});
const nonEmptyNumRue = computed(() => {
  return !!numRue.value && numRue.value != '';
});
const validNomRue = computed(() => {
  const re = /^(([a-zA-Z])([\-\s])*){2,50}$/;
  return re.test(nomRue.value);
});
const nonEmptyNomRue = computed(() => {
  return !!nomRue.value && nomRue.value != '';
});
const validCp = computed(() => {
  const re = /^([0-9]){5}$/;
  return re.test(cp.value);
});
const nonEmptyCp = computed(() => {
  return !!cp.value && cp.value != '';
});
const validVille = computed(() => {
  const re = /^(([a-zA-Z])(\-)*){2,50}$/;
  return re.test(ville.value);
});
const nonEmptyVille = computed(() => {
  return !!ville.value && ville.value != '';
});
const validTel = computed(() => {
  const re = /^([0-9]){10}$/;
  return re.test(tel.value);
});
const nonEmptyTel = computed(() => {
  return !!tel.value && tel.value != '';
});
const validNumCommercant = computed(() => {
  const re = /^([0-9])+$/;
  return re.test(numCommercant.value);
});
const nonEmptyNumCommercant = computed(() => {
  return !!numCommercant.value && numCommercant.value != '';
});
const nonEmptyType = computed(() => {
  return !types.value.length ? false : true;
});
// const validType = computed(() => {
//   const re = /^(([a-zA-Z])(\-)*){2,15}$/;
//   return re.test(types.value);
// });
const formSubmitButtonState = computed(() => {
  let actorType = 0;
  actorType = types.value.length == 2 ? 1 : actorType;
  actorType = types.value.length == 1 ? parseInt(types.value[0]) : actorType;
  const ret1 = !(validPrenom.value && nonEmptyPrenom.value && validNom.value
    && nonEmptyNom.value && validEmail.value && nonEmptyEmail.value
    && validNumRue.value && nonEmptyNumRue.value && validNomRue.value && nonEmptyNomRue.value
    && validCp.value && nonEmptyCp.value
    && validVille.value && nonEmptyVille.value && validTel.value
    && nonEmptyTel.value && nonEmptyType.value);
  // console.log(`ret1 --> ${ret1}`);
  const ret2 = !(actorType === 3 || (validNumCommercant.value && nonEmptyNumCommercant.value));
  // console.log(`ret2 --> ${ret2}`);
  return ret1 || ret2;
});
const numCommercantState = computed(() => {
  let actorType = 0;
  actorType = types.value.length == 2 ? 1 : actorType;
  actorType = types.value.length == 1 ? parseInt(types.value[0]) : actorType;
  setNumCommercantValue(actorType);
  return actorType === 2 || actorType === 1 ? false : true; 
});

let messageStore = null, 
  // actorStore = null, 
  prefs = null;

// DECLARATIONS
if (platform.is.desktop) {
  messageStore = useMessageStore();
  // actorStore = useActorStore();
  messageVisibility.value = messageStore.getMessagesVisibility;
} else {
  (async () => {
    prefs = await import('cap/storage/preferences');
    const mess = await prefs.getPref('message');
    // console.log(mess);
    const messages = !!mess ? mess.messages : [];
    // console.log(messages);
    const vis = !!mess ? mess.messagesVisibility : mess;
    // console.log(vis);
    if (messages.length && vis === null) {
      messageVisibility.value = true;
    } else {
      messageVisibility.value = vis !== null ? vis : false;
    }
  })();
}

// FUNCTIONS
function setNumCommercantValue(actorType: number){
  numCommercant.value = actorType === 3 ? null : numCommercant.value;
};
async function forceTableRerender() {
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
};
async function transformObject(obj: any) {
  if (__KEY__ === null) {
    await setGenApi();
  }
  await setCryptApi();
  __FORMATOBJ__(obj);
};
async function addClickFromChild(e: Event, db: boolean) {
  e.preventDefault();
  if (!db) {
    actorId.value = 0;
    prenom.value = '';
    nom.value = '';
    email.value = '';
    numRue.value = '';
    nomRue.value = '';
    cp.value = '';
    ville.value = '';
    tel.value = '';
    types.value = [];
    numCommercant.value = null;
    adminPropRef.value = true;
    displayPropRef.value = false;
    isForm.value = true;
    formState.update = false;
    formState.add = true;
    defaultRow.value[0] = {
      actorId : 0,
      prenom: '',
      nom: '',
      email: '',
      numRue: '',
      nomRue: '',
      cp: '',
      ville: '',
      tel: '',
      personne_type: [],
      numCommercant: '',
      actions: '',
    };
    forceTableRerender();
  } else {
    // console.log('adding actor in db !');
    let ret;
    if (platform.is.desktop) {
      ret = await insertActorInDb();
      if (ret) {
        isForm.value = false;
        formState.update = false;
        formState.add = true;
      }
      if (props.display){
        displayPropRef.value = true;
        adminPropRef.value = false;
      } else {
        displayPropRef.value = false;
        adminPropRef.value = true;
      }
      forceTableRerender();
    } else {
      ret = await insertActorInSQLiteDb();
      if (ret) {
        isForm.value = false;
        formState.update = false;
        formState.add = true;
      }
      if (props.display){
        displayPropRef.value = true;
        adminPropRef.value = false;
      } else {
        displayPropRef.value = false;
        adminPropRef.value = true;
      }
      forceTableRerender();
    }
    if (ret) {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: t('actorsComponent.results.ok.add')
      });
    }
    else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('actorsComponent.results.ko.add')
      });
    }
  }
};
async function updateClickFromChild(e: Event, db: boolean, obj: any = null) {
  e.preventDefault();
  if (!db) {
    let actorType = [];
    actorType = obj.personne_type.actorTypeId === 1 ? ['2', '3'] : [new String(obj.personne_type.actorTypeId).valueOf()];
    isForm.value = true;
    formState.update = true;
    formState.add = false;
    defaultRow.value[0] = {
      actorId: obj.actorId,
      prenom: obj.prenom,
      nom: obj.nom,
      email: obj.email,
      numRue: obj.numRue,
      nomRue: obj.nomRue,
      cp: obj.cp,
      ville: obj.ville,
      tel: obj.tel,
      personne_type: actorType,
      numCommercant: obj.numCommercant,
      actions: '',
    };
    actorId.value = obj.actorId;
    prenom.value = obj.prenom;
    nom.value = obj.nom;
    email.value = obj.email;
    numRue.value = obj.numRue;
    nomRue.value = obj.nomRue;
    cp.value = obj.cp;
    ville.value = obj.ville;
    tel.value = obj.tel;
    types.value = actorType;
    numCommercant.value = obj.numCommercant;
  } else {
    // console.log('updating actor to db !');
    let ret;
    if(platform.is.desktop) {
      ret = await updateActorInDb();
      if(ret) {
        isForm.value = false;
        formState.update = false;
        formState.add = true;
      }
      forceTableRerender();
    } else {
      ret = await updateActorInSQLiteDb();
      if(ret) {
        isForm.value = false;
        formState.update = false;
        formState.add = true;
      }
      forceTableRerender();
    }
    if (ret) {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: t('actorsComponent.results.ok.update')
      });
    }
    else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('actorsComponent.results.ko.update')
      });
    }
  }
};
async function deleteClickFromChild(e: Event, id: number) {
  e.preventDefault();
  actorId.value = id;
  // console.log('deleting actor from db !');
  let ret;
  if (platform.is.desktop) {
    ret = deleteActorFromDb();
    if(ret) {
      isForm.value = false;
      formState.update = false;
      formState.add = true;
    }
    forceTableRerender();
  } else {
    ret = deleteActorFromSQLiteDb();
    if(ret) {
      isForm.value = false;
      formState.update = false;
      formState.add = true;
    }
    forceTableRerender();
  }
  if (ret) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: t('actorsComponent.results.ok.delete')
    });
  }
  else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: t('actorsComponent.results.ko.delete')
    });
  }
};
async function insertActorInDb() {
  let actorType = 0;
  actorType = types.value.length == 2 ? 1 : actorType;
  actorType = types.value.length == 1 ? parseInt(types.value[0]) : actorType;
  const obj = {
    prenom: prenom.value,
    nom: nom.value,
    email: email.value,
    numRue: numRue.value,
    nomRue: nomRue.value,
    cp: cp.value,
    ville: ville.value,
    tel: tel.value,
    type: actorType,
    numCommercant: numCommercant.value,
  };
  await transformObject(obj);
  return actorAxiosService
    .create(obj)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('actorsComponent.results.ok.add')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.mssages.push({
        severity: true,
        content: t('actorsComponent.results.ko.add', { err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
async function insertActorInSQLiteDb () {
  let actorType = 0;
  actorType = types.value.length == 2 ? 1 : actorType;
  actorType = types.value.length == 1 ? parseInt(types.value[0]) : actorType;
  const obj = {
    prenom: prenom.value,
    nom: nom.value,
    email: email.value,
    numRue: numRue.value,
    nomRue: nomRue.value,
    cp: cp.value,
    ville: ville.value,
    tel: tel.value,
    type: actorType,
    numCommercant: numCommercant.value,
  };
  await transformObject(obj);
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    const sql = 'INSERT INTO \`personne\` (\`prenom\`, \`nom\`, \`email\`, \`numRue\`, \`nomRue\`, \`cp\`, \`ville\`, \`tel\`, \`actorTypeId\`, \`numCommercant\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    // console.log(sql);
    const values = await newRun(props.dbConn, sql, [obj.prenom, obj.nom, obj.email, obj.numRue, obj.nomRue, obj.cp, obj.ville, obj.tel, obj.type, obj.numCommercant]);
    let ret = false;
    if (values.changes.changes){
      await prefs.setPref('message', {
        messages: [
          { 
            severity: false, 
            content: t('actorsComponent.results.ok.add')
          }
        ],
        messageVisibility: true,
      });
      ret = true;
    } else {
      await prefs.setPref('message', {
        messages: [
          { 
            severity: true, 
            content: t('actorsComponent.results.ko.add', { err: 'Adding actor in SQLite DB !'})
          }
        ],
        messageVisibility: true,
      });
    }
    messageVisibility.value = true;
    closeDbConnection(props.dbConn);
    return ret;
  }
  await prefs.setPref('message', {
    messages: [
      {
        severity: true, 
        content: t('actorsComponent.results.ko.add', { err: 'Unable to open SQLite DB !'})
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value = true;
  return false;
};
async function updateActorInDb() {
  let actorType = 0;
  actorType = types.value.length == 2 ? 1 : actorType;
  actorType = types.value.length == 1 ? parseInt(types.value[0]) : actorType;
  const obj = {
    prenom: prenom.value,
    nom: nom.value,
    email: email.value,
    numRue: numRue.value,
    nomRue: nomRue.value,
    cp: cp.value,
    ville: ville.value,
    tel: tel.value,
    actorTypeId: actorType,
    numCommercant: numCommercant.value,
  };
  // console.log(obj);
  await transformObject(obj);
  return actorAxiosService
  .update(actorId.value, obj)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('actorsComponent.results.ok.update'),
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility = true;
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('actorsComponent.results.ko.update', { err: err }),
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility = true;
      return false;
    });
};
async function updateActorInSQLiteDb() {
  let actorType = 0;
  actorType = types.value.length == 2 ? 1 : actorType;
  actorType = types.value.length == 1 ? parseInt(types.value[0]) : actorType;
  const obj = {
    prenom: prenom.value,
    nom: nom.value,
    email: email.value,
    numRue: numRue.value,
    nomRue: nomRue.value,
    cp: cp.value,
    ville: ville.value,
    tel: tel.value,
    type: actorType,
    numCommercant: numCommercant.value,
  };
  await transformObject(obj);
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let ret = false;
    const sql = 'UPDATE \`personne\` SET \`prenom\`=?, \`nom\`=?, \`email\`=?, \`numRue\`=?, \`nomRue\`=?, \`cp\`=?, \`ville\`=?, \`tel\`=?, \`actorTypeId\`=?, \`numCommercant\`=? WHERE \`actorId\` = ?;';
    // console.log(sql);
    const values = await newRun(props.dbConn, sql, [obj.prenom, obj.nom, obj.email, obj.numRue, obj.nomRue, obj.cp, obj.ville, obj.tel, obj.type, obj.numCommercant, actorId.value]);
    if (values.changes.changes) {
      await prefs.setPref('message', {
        messages: [
          {
            severity: false,
            content: t('actorsComponent.results.ok.update')
          }
        ],
        messageVisibility: true,
      });
      ret = true;
    } else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('actorsComponent.results.ko.update', { err: 'Updating actor in SQLite DB !'})
          }
        ],
        messageVisibility: true,
      });
    }
    messageVisibility.value = true;
    closeDbConnection(props.dbConn);
    return ret;
  }
  await prefs.setPref('message', {
    messages: [
      {
        severity: true,
        content: t('actorsComponent.results.ko.update', { err: 'Unable to open SQLite DB !'})
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value = true;
  return false;
};
function deleteActorFromDb() {
  return actorAxiosService
    .delete(actorId.value)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('actorsComponent.results.ok.delete')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('actorsComponent.results.ko.delete', { err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
async function deleteActorFromSQLiteDb() {
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let ret = false;
    const sql = `DELETE FROM \`personne\` WHERE \`actorId\`= '${actorId.value}';`;
    // console.log(sql);
    const values = await newRun(props.dbConn, sql);
    if (values.changes.changes) {
      await prefs.setPref('message', {
        messages: [
          {
            severity: false,
            content: t('actorsComponent.results.ok.delete')
          }
        ],
        messageVisibility: true,
      });
      ret = true;
    } else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('actorsComponent.results.ko.delete', { err: 'Deleting actor from SQLite DB !'})
          }
        ],
        messageVisibility: true,
      });
    }
    messageVisibility.value = true;
    closeDbConnection(props.dbConn);
    return ret;
  }
  await prefs.setPref('message', {
    messages: [
      {
        severity: true,
        content: t('actorsComponent.results.ko.delete', { err: 'Unable to open SQLite DB !'})
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value= true;
  return false;
};

// WATCHERS
watch(() => [ props.admin, props.display, props.actorForm],
  ([newAdminProp, newDisplayProp, newActorForm]) => {
    // console.log(`newAdminProp -> ${newAdminProp}/oldAdminProp -> ${oldAdminProp}`);
    // console.log(`newDisplayProp -> ${newDisplayProp}/oldDisplayProp -> ${oldDisplayProp}`);
    adminPropRef.value = newAdminProp;
    displayPropRef.value = newDisplayProp;
    isForm.value = newActorForm;
    forceTableRerender();
  }
);

// LIFECYCLE EVENTS

// OTHER
provide('src', 'actors');
</script>
