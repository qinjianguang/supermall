<template>
  <div><h3>{{iid}}</h3></div>
</template>

<script>
  export default {
    name: "Detail",
    data() {
      return {
        iid: null
      }
    },
    created() {
      console.log(this.$router.params.iid);
      this.iid = this.$router.params.iid
      console.log(this.iid);
    }
  }
</script>

<style scoped>

</style>
