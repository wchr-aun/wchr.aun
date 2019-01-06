<template>
  <div class="container">
    <div id="loading" class="pageloader is-light is-active"><span class="title">Redirecting to my resume...</span></div>
  </div>
</template>


<script>
export default {
  created () {
    setTimeout(function () {
      window.location = "https://firebasestorage.googleapis.com/v0/b/azwraith-ab64b.appspot.com/o/Resume.pdf?alt=media&token=b7db7978-a025-43b4-bec7-144252588315"
    }, 1500)
    
  }
}
</script>
