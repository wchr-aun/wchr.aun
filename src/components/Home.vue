<template>
  <div class="container">
    <div class="notification">
      <br><br>
      <div class="title is-2">Welcome to Azwraith.me,</div>
      <div class="subtitle is-3">{{user}}</div>
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
    if(firebase.auth().currentUser) {
      this.user = firebase.auth().currentUser.email
    }
  },
  methods: {

  }
}
</script>
