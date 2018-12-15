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
          <td>{{displayName}}</td>
          <td><a class="button is-small" @click="toggle('changeDisplayName')">Change</a></td>
        </tr>
        <tr>
          <td><i class="fas fa-envelope"></i> Email</td>
          <td>{{email}}</td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fas fa-plus-square"></i> Created At</td>
          <td>{{timeStampToText(Number(created))}}</td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fas fa-clock"></i> Last Login At</td>
          <td>{{timeStampToText(Number(lastLogin))}}</td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fas fa-check-circle"></i> Email Verified</td>
          <td>{{verified}}</td>
          <td><a class="button is-small" @click="toggle('verifyEmail')">Verify</a></td>
        </tr>
        <tr>
          <td><i class="fas fa-image"></i> Photo</td>
          <td>{{photoURL}}</td>
          <td><a class="button is-small" @click="toggle('uploadPhoto')">Upload</a></td>
        </tr>
      </tbody>
    </table>
    <div id="changeDisplayName" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="notification">
          <div class="field has-addons">
            <div class="control has-icons-left has-icons-right is-expanded">
              <input v-model="changeDN" class="input" type="email" placeholder="Display Name">
              <span class="icon is-small is-left">
                <i class="fas fa-signature"></i>
              </span>
            </div>
            <div class="control">
              <a class="button is-warning" @click="changeDisplayName">Change <i class="fas fa-exchange-alt"></i></a>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="untoggle('changeDisplayName')"></button>
    </div>
    <div id="verifyEmail" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <!-- Any other Bulma elements you want -->
      </div>
      <button class="modal-close is-large" aria-label="close" @click="untoggle('verifyEmail')"></button>
    </div>
    <div id="uploadPhoto" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <!-- Any other Bulma elements you want -->
      </div>
      <button class="modal-close is-large" aria-label="close" @click="untoggle('uploadPhoto')"></button>
    </div>
  </div>
</template>

<script>
import firebase from './firebase'
export default {
  name: 'user',
  data () {
    return{
      displayName: '',
      changeDN: '',
      email: '',
      verified: false,
      created: 0,
      lastLogin: 0,
      photoURL: ''
    }
  },
  created () {
    if(firebase.auth().currentUser) {
      let c = firebase.auth().currentUser
      this.displayName = c.displayName
      this.changeDN = c.displayName
      this.email = c.email
      this.verified = c.emailVerified
      this.created = c.metadata.a
      this.lastLogin = c.metadata.b
      this.photoURL = c.photoURL
    }
  },
  methods: {
    timeStampToText (time) {
      let timeStamp = new Date(time)
      let Day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
      let Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return Day[timeStamp.getDay()] + ', ' + Month[timeStamp.getMonth()] + ' ' + timeStamp.getDate()  + ',' + timeStamp.getFullYear() + ' at ' + timeStamp.getHours() + ':' + ('0' + timeStamp.getMinutes()).slice(-2) + ':' + ('0' + timeStamp.getSeconds()).slice(-2)
    },
    toggle (id) {
      document.querySelector('#' + id).classList.add('is-active')
      document.querySelector('html').classList.add('is-clipped')
    },untoggle (id) {
      document.querySelector('#' + id).classList.remove('is-active')
      document.querySelector('html').classList.remove('is-clipped')
    },
    changeDisplayName () {
      if (this.changeDN.toLowerCase() === 'anaun' || this.changeDN.toLowerCase() === 'anaunz' || this.changeDN.toLowerCase() === 'admin') {
        alert('You can\'t change to that name')
        this.changeDisplayName = this.displayName
        return 0
      }
      else {
        this.displayName = this.changeDN
        return firebase.auth().currentUser.updateProfile({
          displayName: this.displayName
        }).then(() => {
          alert('Changed Display Name')
          this.untoggle('changeDisplayName')
        }).catch(err => {
          alert('Error happened: ' + err)
        })
      }
    }
  }
}
</script>

