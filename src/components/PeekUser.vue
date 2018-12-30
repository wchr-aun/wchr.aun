<template>
  <div class="container">
    <table class="table is-fullwidth is-hoverable is-striped">
      <thead>
        <tr>
          <th width="20%">Column <i class="fas fa-columns"></i></th>
          <th>Detail <i class="fas fa-info-circle"></i></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><i class="fas fa-signature"></i> Display Name</td>
          <td>
            <span style="color: #ffa22c; font-weight: bold;" v-if="uid === 'xRHdHzjgJdWFvn8l9pFGvkKo4QX2'">
                {{displayName}} <i class="fas fa-users" ></i>
              </span>
              <span style="font-weight: bold;" v-if="uid === 'FoHQDtaFkYWGX2Das3p6GkRSXnS2'">
                {{displayName}} <i class="fas fa-user"></i>
              </span>
              <span v-if="uid !== 'xRHdHzjgJdWFvn8l9pFGvkKo4QX2' && uid !== 'FoHQDtaFkYWGX2Das3p6GkRSXnS2'">
                {{displayName}}
              </span>
          </td>
          <td></td>
        </tr>
        <tr v-if="email !== ''">
          <td><i class="fas fa-envelope"></i> Email</td>
          <td>{{email}}</td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fas fa-plus-square"></i> Created At</td>
          <td>{{timeStampToText(Number(created))}}</td>
          <td></td>
        </tr>
        <tr v-if="photoURL !== ''">
          <td><i class="fas fa-image"></i> Photo</td>
          <td>
            <img v-bind:src="photoURL" width="300">
          </td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fas fa-comments"></i> Recent Comments</td>
          <td>
            <div v-for="comment in comments" v-bind:key="comment.id">
              <div class="notification is-white">
                <div class="columns is-multiline is-vertical-center">
                  <div class="column is-3">
                    <div class="has-text-weight-semibold">#{{comment.id}}</div>
                    <div class="is-size-7">{{timeStampToText(comment.postedat)}}</div>
                  </div>
                  <div class="column">
                    <input type="checkbox" class="read-more-state" v-bind:id="'peek-'+comment.id" style="display: none">
                    <p class="read-more-wrap" style="white-space: pre-line">{{comment.post.slice(0,149)}}<span class="read-more-target">{{comment.post.slice(149)}}</span></p>
                    <label class="is-size-7 has-text-weight-bold has-text-grey read-more-trigger" v-if="comment.post.length > 150" v-bind:for="'peek-'+comment.id"></label>
                  </div>
                  <hr>
                </div>
              </div>
            </div>
          </td>
          <td></td>
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
      uid: '',
      displayName: '',
      photoURL: '',
      created: 0,
      email: '',
      comments: []
    }
  },
  beforeRouteEnter (to, from, next) {
    firebase.firestore().collection("users").doc(to.params.uid).get().then(doc => {
      if (doc.exists) {
        next(vm => {
          vm.uid = doc.id
          vm.displayName = doc.data().displayName
          vm.photoURL = doc.data().photoURL || ''
          vm.created = doc.data().createdAt
          vm.email = doc.data().email || ''
          document.title = 'Peeking - ' + vm.displayName + ' | Azwraith.me'
          firebase.firestore().collection("comments").where("postedby", "==", to.params.uid).orderBy("postedat", "desc").limit(3).get().then(query => {
            query.forEach(doc => {
              let comment = {id: doc.id, post: doc.data().post, postedat: doc.data().postedat.seconds * 1000 + doc.data().postedat.nanoseconds / 1000000}
              vm.comments.push(comment)
            })
          })
        })
      }
    })
  },
  methods: {
    timeStampToText (time) {
      let timeStamp = new Date(time)
      let Day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
      let Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return Day[timeStamp.getDay()] + ', ' + Month[timeStamp.getMonth()] + ' ' + timeStamp.getDate()  + ',' + timeStamp.getFullYear() + ' at ' + ('0' + timeStamp.getHours()).slice(-2) + ':' + ('0' + timeStamp.getMinutes()).slice(-2) + ':' + ('0' + timeStamp.getSeconds()).slice(-2)
    },
  }
}
</script>

<style>
.is-vertical-center {
  display: flex;
  align-items: center;
}
</style>

