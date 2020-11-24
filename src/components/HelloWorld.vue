<template>
  <el-button v-on:click="hhh">沈征宇永远的神</el-button>
</template>

<script>
  export default {
    name: 'HelloWorld',
    methods: {
      hhh() {
        this.axios({
          url:  "/api/addPerson",
          method: "post",
          params: {
            name:""
          }
        }).then(res => {
          console.log(res)
        })
      }
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
