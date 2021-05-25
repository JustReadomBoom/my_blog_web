<template>
  <div id="app">
    <my-nav/>
    <router-view></router-view>
    <my-footer/>
  </div>
</template>

<script>

  import Nav from './components/nav';
  import Footer from './components/footer';

  export default {
    name: 'App',
    data() {
      return {
        title: ''
      }
    },

    components: {
      'my-nav': Nav,
      'my-footer': Footer
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
