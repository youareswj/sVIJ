<template>
  <div>player-{{id}}</div>
</template>

<script>
  export default {
    name: 'player',
    data(){
      return{
        id:this.$route.query.id
      }
    }
  }
</script>

<style scoped>

</style>
