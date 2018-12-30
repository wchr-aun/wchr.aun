<template>
  <div class="container">
    <div class="subtitle is-5 has-text-left">
       &emsp;&emsp;Well, hi, I am a currently a third year computer engineering student studying at <a href="http://www2.kmutt.ac.th/">KMUTT</a> 
      (the website sucks) who have nothing to do, so I created the website using 
      <a href="https://vuejs.org/">VueJS</a>, <a href="https://bulma.io/">BulmaCSS</a>, <a href="https://wikiki.github.io/">Bulma-Extension</a>, <a href="https://fontawesome.com/">FontAwesome</a>, and <a href="https://firebase.google.com/">Firebase</a>.
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
    <br>
    <div class="is-divider" data-content="The section below has nothing to do with the information above, I just want to do a comment section."></div>
    <br>

    <div class="title is-4 has-text-left">Comment Section</div>
    <Comments/>
  </div>
</template>

<script>
import Comments from './Comments'
export default {
  name: 'about',
  components: {
    Comments
  }
}
</script>

