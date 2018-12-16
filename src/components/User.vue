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
          <td>
            <a class="button is-small" v-if="verified === 'Not Verified'" @click="verifyEmail">Verify</a>
            <a id="verifybutton" class="button is-small tooltip" data-tooltip="In case of can't comment due to permission denied" v-if="verified === 'Verified'" @click="retoken">Retoken</a>
          </td>
        </tr>
        <tr>
          <td><i class="fas fa-image"></i> Photo</td>
          <td>
            <img v-bind:src="photoURL" width="300">
          </td>
          <td><a class="button is-small" @click="toggle('uploadPhoto')">Upload</a></td>
        </tr>
        <tr>
          <td><i class="fas fa-eye"></i> Peek Yourself</td>
          <td><router-link v-bind:to="{name: 'peekuser', params: {uid: uid}}">/peekuser/{{uid}}</router-link></td>
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
    <div id="uploadPhoto" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="notification">
          <div class="file has-name is-right is-fullwidth">
            <label class="file-label">
              <input class="file-input" v-on:change="chooseFile" type="file" name="resume">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
              <span class="file-name">
                Photo name...
              </span>
            </label>
          </div>
          <br>
          <img src="#" id="previewPhoto" width="300" style="display: none"/>
          <progress class="progress is-info" id="uploader" value="0" max="100"></progress>
          <p class="buttons is-centered">
            <a id="uploadButton" class="button is-primary" @click="uploadFile('upload')">Upload</a>
            <a class="button" @click="uploadFile('cancel')">Cancel</a>
          </p>
        </div>
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
      uid: '',
      displayName: '',
      changeDN: '',
      email: '',
      verified: 'Not Verified',
      created: 0,
      lastLogin: 0,
      photoFile: '',
      photoURL: ''
    }
  },
  created () {
    if(firebase.auth().currentUser) {
      let c = firebase.auth().currentUser
      this.uid = c.uid
      this.displayName = c.displayName
      this.changeDN = c.displayName
      this.email = c.email
      if (c.emailVerified) {
        this.verified = 'Verified'
      }
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
      return Day[timeStamp.getDay()] + ', ' + Month[timeStamp.getMonth()] + ' ' + timeStamp.getDate()  + ', ' + timeStamp.getFullYear() + ' at ' + ('0' + timeStamp.getHours()).slice(-2) + ':' + ('0' + timeStamp.getMinutes()).slice(-2) + ':' + ('0' + timeStamp.getSeconds()).slice(-2)
    },
    toggle (id) {
      document.querySelector('#' + id).classList.add('is-active')
      document.querySelector('html').classList.add('is-clipped')
    },untoggle (id) {
      document.querySelector('#' + id).classList.remove('is-active')
      document.querySelector('html').classList.remove('is-clipped')
    },
    changeDisplayName () {
      if (this.changeDN.toLowerCase() === 'admin') {
        alert('You can\'t change to that name')
        this.changeDisplayName = this.displayName
        return false
      }
      else {
        this.displayName = this.changeDN
        return firebase.auth().currentUser.updateProfile({
          displayName: this.displayName
        }).then(() => {
          firebase.firestore().collection("users").doc(this.uid).update({
            displayName: this.displayName
          }).then(() => {
            alert('Changed Display Name')
            this.untoggle('changeDisplayName')
          }).catch(err => {
            alert('Error happened: ' + err)
          })
        }).catch(err => {
          alert('Error happened: ' + err)
        })
      }
    },
    verifyEmail () {
      document.querySelector('#verifybutton').disabled
      return firebase.auth().currentUser.sendEmailVerification().then(() => {
        alert('Verification email has been sent. If it\'s not appear, please kindly wait at least 1 min before trying again.')
      }).catch(err => {
        alert('Error happened: ' + err)
      })
    },
    chooseFile () {
      let input = document.querySelector('.file-input')
      let patt = new RegExp(/\.(jpeg|jpg|gif|png)$/)
      if (patt.test(input.files[0].name)) {
        if (input.files[0].size < 1048576) {
          let file = new FileReader()
          file.readAsDataURL(input.files[0])
          this.photoFile = input.files[0]
          document.querySelector('.file-name').innerHTML = this.photoFile.name
          document.getElementById('previewPhoto').style.display = 'inline'
          file.onload = function (e) {
            document.getElementById("previewPhoto").src = e.target.result
          }
        }
        else alert('The file must not larger than 1MB.')
      }
      else alert('The file is not a photo.')
    },
    uploadFile (command) {
      if (command === 'cancel') {
        document.querySelector('.file-input').value = ''
        this.photoFile = ''
        document.getElementById('previewPhoto').style.display = 'none'
        document.querySelector('.file-name').innerHTML = 'Photo name...'
      }
      else {
        document.querySelector('#uploadButton').classList.add('is-loading')
        let uploadTask = firebase.storage().ref('images/photo_of_' + this.email).put(this.photoFile)
        uploadTask.on('state_changed', snapshot => {
          let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100
          document.querySelector("#uploader").value = percentage
        }, err => {
          alert('Error happend: ' + err)
        }, () => {
          document.querySelector('#uploader').classList.remove('is-info')
          document.querySelector('#uploader').classList.add('is-primary')
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            return firebase.auth().currentUser.updateProfile({
              photoURL: url
            }).then(() => {
              firebase.firestore().collection("users").doc(this.uid).update({
                photoURL: url
              }).then(() => {
                document.querySelector('#uploadButton').classList.remove('is-loading')
                alert('Uploaded success!')
                this.$router.go()
              })
            }).catch(err => {
              alert('Error happened: ' + err)
            })
          })
        })
      }
    },
    retoken () {
      firebase.auth().currentUser.getIdToken(true).then(() => {
        this.$router.go()
        return 0
      })
    }
  }
}
</script>

