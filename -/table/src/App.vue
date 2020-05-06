<template>
  <div id="app">
    <Players></Players>
  </div>
</template>
<script>
import Vue from "vue";
import Players from "./views/Players.vue"
export default Vue.extend({
  components:{
    Players
  }
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,body,#app{
	/* height: 100%; */
  background: #f2f2f2;
}
</style>
