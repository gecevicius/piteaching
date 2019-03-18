<template>
  <v-app>
    <div id="app">
      <Nav></Nav>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
  import Nav from './components/Nav'
  export default {
    name: 'App',
    components:{
      'Nav':Nav
    }
  }
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
