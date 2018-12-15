<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link to="/" class="navbar-item"><h5 class="title is-5 has-text-white-ter">Azwraith.me</h5></router-link>
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
      <div class="navbar-item"><router-link to="/" class="has-text-white-ter">About Me</router-link></div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-light" @click="toggle">Login</a>
        </div>
      </div>
    </div>
  </div>

  <div class="modal has-text-black">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="notification has-background-white-ter">
        <div class="is-size-4">Login</div>
        <input class="input" type="text" placeholder="Email">
        <input class="input" type="text" placeholder="Password">
        <br><br>
        <a class="button is-info is-fullwidth">Login <i class="fas fa-sign-in-alt"></i></a>or
        <a class="button is-primary is-fullwidth">Sign Up <i class="fas fa-user-plus"></i></a>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="untoggle"></button>
  </div>
</nav>
</template>

<script>
export default {
  methods: {
    toggle () {
        document.querySelector('.modal').classList.add('is-active')
        document.querySelector('html').classList.add('is-clipped')
    },
    untoggle () {
        document.querySelector('.modal').classList.remove('is-active');
        document.querySelector('html').classList.remove('is-clipped');
    }
  }
}
</script>
