<template>
  <div class="flex justify-center">
    <button
      class="bg-white text-gray-800 p-4 border rounded-md"
      v-if="!loggedIn"
      v-on:click="login()"
    >
      Login with Google
    </button>
    <button
      class="bg-white text-gray-800 p-4 border rounded-md"
      v-if="loggedIn"
      v-on:click="logout()"
    >
      Log Out
    </button>
  </div>
</template>

<script lang="ts">
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { defineComponent } from "vue";

export default defineComponent({
  created() {
    auth.onAuthStateChanged((user) => {
      if (!user) return;
      this.loggedIn = true;
    });
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    login() {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result);
          this.loggedIn = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      this.loggedIn = false;
      auth.signOut();
    },
  },
});
</script>
