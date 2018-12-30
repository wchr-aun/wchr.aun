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
          <td>
            <span id="displayName" v-if="!showChange" class="is-tooltip-right" data-tooltip="Changed">{{displayName}}</span>
            <div v-if="showChange" class="field has-addons">
              <div class="control">
                <div class="control has-icons-left">
                  <input v-model="changeDN" class="input" placeholder="Display Name">
                  <span class="icon is-left">
                    <i class="fas fa-signature"></i>
                  </span>
                </div>
              </div>
              <div class="control">
                <a id="changebutton" class="button is-primary is-outlined" @click="changeDisplayName">Change</a>
              </div>
            </div>
          </td>
          <td>
            <a v-if="!showChange" class="button is-small" @click="showChange = !showChange">Change</a>
            <a v-if="showChange" class="button is-small" @click="showChange = !showChange">Cancel</a>
          </td>
        </tr>
        <tr>
          <td><i class="fas fa-envelope"></i> Email</td>
          <td>{{email}}</td>
          <td><a class="button is-small tooltip" data-tooltip="Show/Hide email in the peek page" @click="showEmail">Show / Hide</a></td>
        </tr>
        <tr>
          <td><i class="fas fa-plus-square"></i> Created At</td>
          <td>{{helper.timeStampToText(Number(created))}}</td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fas fa-clock"></i> Last Login At</td>
          <td>{{helper.timeStampToText(Number(lastLogin))}}</td>
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
          <td>
            <router-link v-bind:to="{name: 'peekuser', params: {uid: uid}}">/peekuser/{{uid}}</router-link>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div id="uploadPhoto" class="modal">
      <div class="modal-background" @click="untoggle('uploadPhoto')"></div>
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
import helper from './helper'
export default {
  name: 'user',
  data () {
    return{
      uid: '',
      displayName: '',
      changeDN: '',
      showChange: false,
      email: '',
      verified: 'Not Verified',
      created: 0,
      lastLogin: 0,
      photoFile: '',
      photoURL: '',
      helper: helper
    }
  },
  created () {
    if(firebase.auth().currentUser) {
      document.title = 'User | Azwraith.me'
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
    toggle (id) {
      document.querySelector('#' + id).classList.add('is-active')
      document.querySelector('html').classList.add('is-clipped')
    },
    untoggle (id) {
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
        document.querySelector('#changebutton').classList.add('is-loading')
        this.displayName = this.changeDN
        return firebase.auth().currentUser.updateProfile({
          displayName: this.displayName
        }).then(() => {
          firebase.firestore().collection("users").doc(this.uid).update({
            displayName: this.displayName
          }).then(() => {
            $.when(this.showChange = false).then(() => {
              document.querySelector('#displayName').classList.add('tooltip')
              document.querySelector('#displayName').classList.add('is-tooltip-active')
              setTimeout(function(){
                  document.querySelector('#displayName').classList.remove('is-tooltip-active')
              }, 1000)
            })
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
        let uploadTask = firebase.storage().ref('images/photo_of_' + this.uid).put(this.photoFile)
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
    },
    showEmail () {
      firebase.firestore().collection("users").doc(this.uid).get().then(doc => {
        if (doc.exists) return doc.data().email
      }).then(emailExist => {
        if (emailExist === null || emailExist === undefined) {
          firebase.firestore().collection("users").doc(this.uid).update({
            email: this.email
          }).catch(err => {
            console.log("Error happened: " + err)
          })
        }
        else {
          firebase.firestore().collection("users").doc(this.uid).update({
            email: null
          }).catch(err => {
            console.log("Error happened: " + err)
          })
        }
      }).catch(err => {
        console.log("Error happened: " + err)
      })
    }
  }
}
</script>

