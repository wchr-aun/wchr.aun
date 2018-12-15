<template>
  <div class="container">
    {{currentUser}}
  </div>
</template>

<script>
import firebase from './firebase'
export default {
  name: 'user',
  data () {
    return{
      currentUser: false
    }
  },
  created () {
    if(firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser
    }
  }
}
</script>

