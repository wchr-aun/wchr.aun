<template>
  <div class="container">
    <table class="table is-fullwidth is-hoverable is-striped">
      <thead>
        <tr>
          <th>Column <i class="fas fa-columns"></i></th>
          <th>Detail <i class="fas fa-info-circle"></i></th>
          <th>More <i class="fas fa-chevron-circle-down"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><i class="fas fa-signature"></i> Display Name</td>
          <td>{{currentUser.displayName}}</td>
          <td><a class="button is-small">Change</a></td>
        </tr>
        <tr>
          <td><i class="fas fa-envelope"></i> Email</td>
          <td>{{currentUser.email}}</td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fas fa-plus-square"></i> Created At</td>
          <td>{{timeStampToText(Number(currentUser.metadata.a))}}</td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fas fa-clock"></i> Last Login At</td>
          <td>{{timeStampToText(Number(currentUser.metadata.b))}}</td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fas fa-check-circle"></i> Email Verified</td>
          <td>{{currentUser.emailVerified}}</td>
          <td><a class="button is-small">Verify</a></td>
        </tr>
        <tr>
          <td><i class="fas fa-image"></i> Photo</td>
          <td>{{currentUser.photoURL}}</td>
          <td><a class="button is-small">Upload</a></td>
        </tr>
      </tbody>
    </table>
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
  },
  methods: {
    timeStampToText (time) {
      let timeStamp = new Date(time)
      let Day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
      let Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return Day[timeStamp.getDay()] + ', ' + Month[timeStamp.getMonth()] + ' ' + timeStamp.getDate()  + ',' + timeStamp.getFullYear() + ' at ' + timeStamp.getHours() + ':' + ('0' + timeStamp.getMinutes()).slice(-2) + ':' + ('0' + timeStamp.getSeconds()).slice(-2)
    }
  }
}
</script>

