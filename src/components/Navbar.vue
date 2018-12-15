<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link to="/" class="navbar-item"><h5 class="title is-5 has-text-white-ter">Azwraith.me</h5></router-link>
    <a id="burgerd" role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="dropdown">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu has-text-white">
    <div class="navbar-start">
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">Projects</a>
        <div class="navbar-dropdown">
          <a class="navbar-item" href="https://vcabb.azwraith.me">VC-ABB</a>
          <a class="navbar-item" href="https://sgws.azwraith.me">SGWS</a>
        </div>
      </div>
      <router-link to="/about" class="navbar-item">About Me</router-link>
    </div>

    <div class="navbar-end">
      <router-link to="/user" v-if="isLoggedIn" class="navbar-item">{{currentUser.email}}</router-link>
      <div class="navbar-item">
        <div class="buttons">
          <a v-if="!isLoggedIn" class="button is-light" @click="toggle">Login</a>
          <a v-if="isLoggedIn" class="button is-light" @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </div>

  <div class="modal has-text-black">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="notification has-background-white-ter">
        <div class="is-size-4">Login</div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="email" class="input" type="email" placeholder="Email" autocomplete="off">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input v-model="password" class="input" type="password" placeholder="Password" @keydown.enter="login">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <a class="button is-info is-fullwidth" @click="login">Login <i class="fas fa-sign-in-alt"></i></a>or
        <router-link to="/register" style="text-decoration: none;"><div class="button is-primary is-fullwidth" @click="untoggle">Register <i class="fas fa-user-plus"></i></div></router-link>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="untoggle"></button>
  </div>
</nav>
</template>

<script>
import firebase from './firebase'
export default {
  data () {
    return {
      isLoggedIn: false,
      currentUser: false,
      email: '',
      password: ''
    }
  },
  created () {
    if(firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser
      this.isLoggedIn = true
    }
  },
  methods: {
    toggle () {
        document.querySelector('.modal').classList.add('is-active')
        document.querySelector('html').classList.add('is-clipped')
    },
    untoggle () {
        document.querySelector('.modal').classList.remove('is-active');
        document.querySelector('html').classList.remove('is-clipped');
    },
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
        this.untoggle()
        this.$router.go()
      },
      err => {
        alert(err.message)
      })
    },
    logout () {
      firebase.auth().signOut().then(noData => {
        this.$router.go()
      })
    },
    dropdown () {
      if ($('#burgerd').hasClass('is-active')){
        document.querySelector('.navbar-burger').classList.remove('is-active')
        document.querySelector('.navbar-menu').classList.remove('is-active')
      }
      else{
        document.querySelector('.navbar-burger').classList.add('is-active')
        document.querySelector('.navbar-menu').classList.add('is-active')
      }
    }
  }
}
</script>
