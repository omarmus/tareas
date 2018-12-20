<template>
  <div class="home" id="app">
    <div class="header">📚<em>Vuello</em></div>
    <Listado />
  </div>
</template>

<script>
// @ is an alias to /src
import Listado from '@/components/Listado.vue'

export default {
  name: 'home',
  components: {
    Listado
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.header {
  background-color: darken($info, 15%);
  color: lighten($info, 20%);
  height: 40px;
  line-height: 40px;
  font-size: 1.3rem;
  text-align: center;
  font-weight: 600;
}
</style>
