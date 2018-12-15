<template>
  <div class="container">
    <div class="subtitle is-5 has-text-left">
       &emsp;&emsp;Well, hi, I am a currently a third year computer engineering student studying at <a href="http://www2.kmutt.ac.th/">KMUTT</a>, 
       yes, the website sucks, who have nothing to do, so I created the website using 
      <a href="https://vuejs.org/">VueJS</a>, <a href="https://bulma.io/">BulmaCSS</a>, and <a href="https://firebase.google.com/">Firebase</a>.
      This website is created to collect all of websites that're mine or my project group. My contact is down below at the footer of every page
      or, just in case:<br>
    </div>
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Name <i class="fas fa-signature"></i></th>
          <th>GitHub <i class="fab fa-github"></i></th>
          <th>Email <i class="fas fa-envelope"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Watcharin Sirinaovakul</td>
          <td><a href="https://github.com/anaunz">anaunz</a></td>
          <td>wchr.aun@gmail.com</td>
        </tr>
      </tbody>
    </table>
    <hr>
    <div class="subtitle is-6">
      The section below has nothing to do with the information above, I just want to do a comment section.
    </div>
    <br>

    <div class="title is-4 has-text-left">Comment Section</div>
    <div id="commentSection" class="box" v-if="isLoggedIn">
      <div class="field">
        <div class="control">
          <textarea v-model="post" v-if="verified" class="textarea" placeholder="Text Area"></textarea>
          <textarea v-model="post" v-if="!verified" class="textarea" placeholder="Please Verify Your Email to Comment" disabled></textarea>
        </div>
      </div>
      <div class="columns">
        <div class="column is-3 is-offset-8">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">DisplayName:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" type="text" v-model.trim="displayName" disabled>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-1">
          <a class="button is-primary" v-if="verified" @click="postComment">Post</a>
          <a class="button is-primary" v-if="!verified" @click="postComment" disabled>Post</a>
        </div>
      </div>
    </div>
    <div v-if="!isLoggedIn" class="box">— Please Login to Comment —</div>
    <hr>
    <div v-for="comment in comments" v-bind:key="comment.id">
      <div class="box">
        <div class="has-text-left">
          #{{comment.id}} | 
          <small>Posted by:
            <span style="color: #ffa22c; font-weight: bold;" v-if="comment.data().postedbyDisplayName === 'admin'">
              {{comment.data().postedbyDisplayName}} <i class="fas fa-users" ></i>
            </span>
            <span style="font-weight: bold;" v-if="comment.data().postedbyDisplayName === 'anaunz'">
              {{comment.data().postedbyDisplayName}} <i class="fas fa-user"></i>
            </span>
            <span v-if="comment.data().postedbyDisplayName !== 'admin' && comment.data().postedbyDisplayName !== 'anaunz'">
              {{comment.data().postedbyDisplayName}}
            </span>
            &lt;{{comment.data().postedbyEmail}}&gt;
          </small>
          <div class="is-size-7">Posted at: {{timeStampToText(comment.data().postedat)}}</div>
        </div><hr>
        <div class="columns">
          <div class="column is-1 has-text-right is-hidden-touch">Context:</div>
          <div class="column is-10 has-text-left">{{comment.data().post}}</div>
        </div>
      </div><small></small>
    </div>

  </div>
</template>

<script>
import firebase from './firebase'
export default {
  name: 'about',
  data () {
    return {
      displayName: '',
      email: 'undefined',
      post: '',
      comments: [],
      isLoggedIn: false,
      verified: false
    }
  },
  created () {
    if(firebase.auth().currentUser) {
      this.isLoggedIn = true
      this.email = firebase.auth().currentUser.email
      this.displayName = firebase.auth().currentUser.displayName
      this.verified = firebase.auth().currentUser.emailVerified
    }
    firebase.firestore().collection("comments").orderBy("postedat", "desc").limit(5).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        return this.comments.push(doc)
      })
    })
  },
  methods: {
    postComment () {
      firebase.firestore().collection("comments").add({
        post: this.post,
        postedbyEmail: this.email,
        postedbyDisplayName: this.displayName,
        postedat: new Date()
      }).then(() => {
        this.$router.go()
        return null
      }).catch(err => {
        alert('Error adding document: ' + err)
      })
    },
    timeStampToText (time) {
      let timeStamp = new Date(time.seconds * 1000 + time.nanoseconds / 1000000)
      let Day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
      let Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return Day[timeStamp.getDay()] + ', ' + Month[timeStamp.getMonth()] + ' ' + timeStamp.getDate()  + ',' + timeStamp.getFullYear() + ' at ' + ('0' + timeStamp.getHours()).slice(-2) + ':' + ('0' + timeStamp.getMinutes()).slice(-2) + ':' + ('0' + timeStamp.getSeconds()).slice(-2)
    }
  }
}
</script>

