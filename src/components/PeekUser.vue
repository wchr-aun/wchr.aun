<template>
  <div class="container">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Column <i class="fas fa-columns"></i></th>
          <th>Detail <i class="fas fa-info-circle"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><i class="fas fa-signature"></i> Display Name</td>
          <td>{{displayName}}</td>
        </tr>
        <tr>
          <td><i class="fas fa-plus-square"></i> Created At</td>
          <td>{{timeStampToText(Number(created))}}</td>
        </tr>
        <tr>
          <td><i class="fas fa-image"></i> Photo</td>
          <td>
            <img v-bind:src="photoURL" width="300">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from './firebase'
export default {
  name: 'peekuser',
  data () {
    return{
      displayName: '',
      photoURL: '',
      created: 0
    }
  },
  beforeRouteEnter (to, from, next) {
    firebase.firestore().collection('users').doc(to.params.uid).get().then(doc => {
      if(doc.exists){
        next(vm => {
          vm.displayName = doc.data().displayName
          vm.photoURL = doc.data().photoURL
          vm.created = doc.data().createdAt
        })
      }
    })
  },
  methods: {
    timeStampToText (time) {
      let timeStamp = new Date(time)
      let Day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
      let Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return Day[timeStamp.getDay()] + ', ' + Month[timeStamp.getMonth()] + ' ' + timeStamp.getDate()  + ', ' + timeStamp.getFullYear() + ' at ' + ('0' + timeStamp.getHours()).slice(-2) + ':' + ('0' + timeStamp.getMinutes()).slice(-2) + ':' + ('0' + timeStamp.getSeconds()).slice(-2)
    }
  }
}
</script>

