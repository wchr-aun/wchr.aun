<template>
  <div class="container">
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
                  <input class="input" type="text" v-model.trim="showDisplayName" disabled>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-1">
          <a class="button is-primary" v-if="verified" @click="postComment">Post</a>
          <a class="button is-primary" v-if="!verified" disabled>Post</a>
        </div>
      </div>
    </div>
    <div v-if="!isLoggedIn" class="box">— Please Login to Comment —</div>
    <div class="is-divider" data-content="PINNED COMMENT" v-if="allDone && pinned != null"></div>
    <div class="box" style="background-color: #fafafa" v-if="allDone && pinned != null">
      <div class="is-size-7 is-pulled-right" v-if="admin">
        <a class="has-text-info" @click="unpinComment()"><small>UNPIN THIS COMMENT <i class="fas fa-thumbtack"></i></small></a>
      </div>
      <div class="has-text-left">
        <i class="fas fa-thumbtack"></i> #{{pinned.id}} | 
        <small>Posted by:
          <router-link v-bind:to="{name: 'peekuser', params: {uid: pinned.uid}}" style="color:inherit;">
            <span style="color: #ffa22c; font-weight: bold;" v-if="pinned.uid === 'xRHdHzjgJdWFvn8l9pFGvkKo4QX2'">
              {{pinned.postedby}} <i class="fas fa-users" ></i>
            </span>
            <span style="font-weight: bold;" v-if="pinned.uid === 'FoHQDtaFkYWGX2Das3p6GkRSXnS2'">
              {{pinned.postedby}} <i class="fas fa-user"></i>
            </span>
            <span v-if="pinned.uid !== 'xRHdHzjgJdWFvn8l9pFGvkKo4QX2' && pinned.uid !== 'FoHQDtaFkYWGX2Das3p6GkRSXnS2'">
              {{pinned.postedby}}
            </span>
          </router-link>
        </small>
        <div v-if="pinned != null" class="is-size-7">Posted at: {{helper.timeStampToText(pinned.postedat.seconds*1000 + pinned.postedat.nanoseconds/1000000)}}</div>
      </div><hr>
      <div class="columns">
        <div class="column is-1 has-text-right is-hidden-touch">Context:</div>
        <div class="column is-10 has-text-left">
          <input type="checkbox" class="read-more-state" v-bind:id="'pinned-'+pinned.id" style="display: none">
          <p class="read-more-wrap" style="white-space: pre-line">
            <span v-html="pinned.post.slice(0,299)"></span>
            <span v-html="pinned.post.slice(299)" class="read-more-target"></span>
          </p>
          <label class="is-size-7 has-text-weight-bold has-text-grey read-more-trigger" v-if="pinned.post.length > 300" v-bind:for="'pinned-'+pinned.id"></label>
        </div>
      </div>
    </div>

    <div class="is-divider" data-content="COMMENTS"></div>
    <div v-if="!(allDone && comments.length != 0)">
      <div class="button is-white is-small is-loading"></div><span class="is-centered">Loading...</span>
    </div>
    <div v-if="allDone && comments.length != 0" v-for="comment in comments" v-bind:key="comment.id">
      <div class="box">
        <div class="is-size-7 is-pulled-right" v-if="admin">
          <a class="has-text-primary" @click="pinComment(comment)"><small>PIN THIS COMMENT <i class="fas fa-thumbtack"></i></small></a> | 
          <a class="has-text-danger" @click="deleteComment(comment.id)"><small>DELETE THIS COMMENT <i class="fas fa-trash-alt"></i></small></a>
        </div>
        <div class="has-text-left">
          #{{comment.id}} | 
          <small>Posted by:
            <router-link v-bind:to="{name: 'peekuser', params: {uid: comment.uid}}" style="color:inherit;">
              <span style="color: #ffa22c; font-weight: bold;" v-if="comment.uid === 'xRHdHzjgJdWFvn8l9pFGvkKo4QX2'">
                {{comment.postedby}} <i class="fas fa-users" ></i>
              </span>
              <span style="font-weight: bold;" v-if="comment.uid === 'FoHQDtaFkYWGX2Das3p6GkRSXnS2'">
                {{comment.postedby}} <i class="fas fa-user"></i>
              </span>
              <span v-if="comment.uid !== 'xRHdHzjgJdWFvn8l9pFGvkKo4QX2' && comment.uid !== 'FoHQDtaFkYWGX2Das3p6GkRSXnS2'">
                {{comment.postedby}}
              </span>
            </router-link>
          </small>
          <div v-if="pinned != null" class="is-size-7">Posted at: {{helper.timeStampToText(comment.postedat.seconds*1000 + comment.postedat.nanoseconds/1000000)}}</div>
        </div><hr>
        <div class="columns">
          <div class="column is-1 has-text-right is-hidden-touch">Context:</div>
          <div class="column is-10 has-text-left">
            <input type="checkbox" class="read-more-state" v-bind:id="'comment-'+comment.id" style="display: none">
            <p class="read-more-wrap" style="white-space: pre-line">
              <span v-html="comment.post.slice(0,299)"></span>
              <span v-html="comment.post.slice(299)" class="read-more-target"></span>
            </p>
            <label class="is-size-7 has-text-weight-bold has-text-grey read-more-trigger" v-if="comment.post.length > 300" v-bind:for="'comment-'+comment.id"></label>
          </div>
        </div>
      </div><small></small>
    </div>
  </div>
</template>

<script>
import firebase from "./firebase"
import helper from "./helper"
import '../css/additional.css'
export default {
  data () {
    return {
      uid: '',
      showDisplayName: '',
      displayName: '',
      post: '',
      comments: [],
      isLoggedIn: false,
      verified: false,
      admin: false,
      pinned: null,
      allDone: false,
      helper: helper
    }
  },
  created (id) {
    console.log(id)
    if(firebase.auth().currentUser) {
      let c = firebase.auth().currentUser
      this.uid = c.uid
      this.isLoggedIn = true
      this.displayName = c.displayName
      this.showDisplayName = this.displayName
      this.verified = c.emailVerified
    }
    firebase.firestore().collection("comments").orderBy("postedat", "desc").limit(5).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if(doc.exists){
          let uid = doc.data().postedby
          let comment = {
            id: doc.id,
            uid: uid,
            post: doc.data().post.replace( /(https:\/\/[^\s]+)/gi , '<a href="$1">$1</a>' ),
            postedat: doc.data().postedat,
            postedby: ''
          }
          this.getDisplayName(uid).then(displayName => {
            comment.postedby = displayName
          })
          this.comments.push(comment)
        }
      })
    }).then(() => {
      firebase.firestore().collection("comments").doc("pinned").get().then(doc => {
        if(doc.exists){
          const pinnedby = doc.data().pinnedby
          firebase.firestore().collection("comments").doc(doc.data().path).get().then(pinned => {
            if(pinned.exists){
              let puid = pinned.data().postedby
              this.pinned = {
                id: pinned.id,
                uid: puid,
                post: pinned.data().post.replace( /(https:\/\/[^\s]+)/gi , '<a href="$1" target="_blank">$1</a>' ),
                postedat: pinned.data().postedat,
                pinnedby: pinnedby,
                postedby: ''
              }
              this.getDisplayName(puid).then(displayName => {
                this.pinned.postedby = displayName
                this.allDone = true
              })
            }
            else this.allDone = true
          })
        }
        else this.allDone = true
      }).then(() => {
        if(this.isLoggedIn){
          firebase.firestore().collection("users").doc(this.uid).get().then(doc => {
            this.admin = doc.data().admin
          }).catch(err => {
            console.log("Error happened in 181: " + err)
          })
        }
      }).catch(err => {
        console.log("Error happened in 185: " + err)
      })
    }).catch(err => {
      console.log("Error happened in 188: " + err)
    })
  },
  methods: {
    getDisplayName (id) {
      return firebase.firestore().collection("users").doc(id).get().then(doc => {
        if (doc.exists) return doc.data().displayName
      }).catch(err => {
        console.log("Error happened in getDisplayname: " + err)
      })
    },
    postComment () {
      if(this.post === "" || this.post.length < 3){
        alert("Comments must not be emptied and at least 3 characters.")
      }
      else{
        document.querySelector("#loading").classList.add("is-active")
        firebase.firestore().collection("comments").add({
          post: this.post,
          postedby: this.uid,
          postedat: new Date()
        }).then(() => {
          this.$router.go()
        }).catch(err => {
          document.querySelector("#loading").classList.remove("is-active")
          alert("Error adding document: " + err)
        })
      }
    },
    deleteComment (id) {
      if (this.admin){
        if (confirm("Are you sure to delete #" + id)) {
          firebase.firestore().collection("comments").doc(id).delete().then(() => {
            this.$router.go()
          })
        }
      }
      else alert("You do not have this permission.")
    },
    pinComment (comment) {
      document.querySelector("#loading").classList.add("is-active")
      firebase.firestore().collection("comments").doc("pinned").set({
        path: comment.id,
        pinnedby: this.uid
      }).then(() => {
        this.$router.go()
      }).catch(err => {
        document.querySelector("#loading").classList.remove("is-active")
        alert("Error adding document: " + err)
      })
    },
    unpinComment () {
      document.querySelector("#loading").classList.add("is-active")
      firebase.firestore().collection("comments").doc("pinned").delete().then(() => {
        this.$router.go()
      }).catch(err => {
        document.querySelector("#loading").classList.remove("is-active")
        alert("Error adding document: " + err)
      })
    }
  }
}
</script>
