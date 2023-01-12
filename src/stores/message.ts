// import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
// import { useStorage } from '@vueuse/core';
import { cookieStorage } from 'app/src/stores/storage';

const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [],
    messagesVisibility: false,
  }),
  persist: {
    storage: cookieStorage,
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
    getMessagesVisibility(state) {
      return state.messagesVisibility;
    },
  },
  actions: {
    deleteMessages() {
      this.messages = [];
      this.messagesVisibility = false;
    },
    setMessagesVisibility(val: boolean) {
      this.messagesVisibility = val;
    },
  },
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot));
}

export { useMessageStore };
