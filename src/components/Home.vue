<template>
  <div class="container">
    <div class="notification">
      <br><br>
      <div class="title is-2">Welcome to Azwraith.me,</div>
      <div class="subtitle is-3">You are now logging in as {{user}}</div>
      <br><br>
    </div>
  </div>
</template>

<script>
import firebase from './firebase'
export default {
  name: 'Home',
  data () {
    return {
      user: 'Guest User'
    }
  },
  created () {
    document.title = 'Home | Azwraith.me'
    if(firebase.auth().currentUser) {
      this.user = firebase.auth().currentUser.email
    }
  },
  methods: {

  }
}
</script>
