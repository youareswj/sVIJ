<template>
  <div id="app">
    <router-view>
      <SongerList></SongerList>
    </router-view>
  </div>
</template>

<script>
  import SongerList from '@/components/SongerList'

  export default {
    data (){
    return {}
  },
  components: {SongerList},

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
