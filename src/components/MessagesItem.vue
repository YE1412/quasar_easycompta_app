<template>
   <div style="width: 100%">
    <div class="q-pt-md q-pb-md" v-for="(msg, ind) in messagesFeed" :key="ind">
      <q-banner
        inline-actions
        :dense="platform === 'web' ? false : true"
        :class="`text-white text-weight-bolder ${!msg.severity ? 'bg-green-10' : 'bg-red-10'}`">
          {{ msg.content }}
        <template v-slot:action>
          <q-btn flat color="white" icon="cancel" @click="resetMessages($event)" />
        </template>
      </q-banner>
    </div>
  </div>
</template>

<script setup lang="ts">
/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { ref } from 'vue';
import { useMessageStore } from 'stores/message';
// import { Capacitor } from '@capacitor/core';
import { Message } from './models';
import { useQuasar } from 'quasar';

// VARIABLES
interface MessageProps {
  messages?: Message[];
};
const $q = useQuasar();
const props = withDefaults(defineProps<MessageProps>(), {
  messages: () => ([]),
});
const platform = $q.platform;

let messageStore: any = null, messagesFeed: Ref<Message[]> = ref([]), prefs: any = null;

// DECLARATIONS
// console.log('Props Message !');
// console.log(props.messages);
messagesFeed = ref(props.messages);
// const length = props.messages.length;
// const messages = props.messages;
// if (length){
//   messagesFeed.value = messages;
// }

if (platform.is.desktop) {
  messageStore = useMessageStore();
  messagesFeed.value = messageStore.getMessages;
} else {
  // console.log('platform' + platform);
  (async ()=> {
    prefs = await import('cap/storage/preferences');
    prefs.getPref('message')
      .then((res) => {
        messagesFeed.value = res.messages;
        // console.log(`Messages Feed --> `);
        // console.log(messagesFeed.value);
      });
  })();
}

// FUNCTIONS
function resetMessages() {
  // messages.value = [];
  if (platform.is.desktop){
    messageStore.deleteMessages();
    messageStore.setMessagesVisibility(false);
  }
  else{
    prefs.removePref('message');
    prefs.setPref('message', {messages: [], messagesVisibility: false});
  }
  messagesFeed.value = [];
};
</script>
