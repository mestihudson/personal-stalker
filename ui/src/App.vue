<template>
  <div id="app">
    <app-menu/>
    <router-view></router-view>
  </div>
</template>

<script>
import AppMenu from '@/components/Menu'

export default {
  components: { AppMenu }
}
</script>
