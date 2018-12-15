<template>
  <div class="container">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="title is-4">Register</div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input id="email" v-model="email" class="input" type="email" placeholder="Email" @keydown="checkEmail" autocomplete="off">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input id="password" v-model="password" class="input" type="password" placeholder="Password" @keydown="checkPassword" @keydown.enter="register">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="buttons is-centered">
          <a class="button is-info" @click="register">Register</a>
          <router-link to="/" class="button is-grey">Cancel</router-link>
        </div>
        
      </div>
    </div>
    
  </div>
</template>

<script>
import firebase from './firebase'
export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
        alert('Success Creating the Account')
        this.$router.push('/')
        this.$router.go()
      },
      err => {
        alert(err.message)
      })
    },
    checkEmail () {
      let patt = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      if(!patt.test(this.email)) document.querySelector('#email').classList.add('is-danger')
      else{
        document.querySelector('#email').classList.remove('is-danger')
        document.querySelector('#email').classList.add('is-success')
      }
    },
    checkPassword () {
      if(this.password.length < 5) document.querySelector('#password').classList.add('is-danger')
      else{
        document.querySelector('#password').classList.remove('is-danger')
        document.querySelector('#password').classList.add('is-success')
      }
    }
  }
}
</script>

