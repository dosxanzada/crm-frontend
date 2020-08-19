<template>

  <header class="main-header">
    <!-- Logo -->
    <router-link :to="{name: 'index'}" class="logo">
      <img src="./../../assets/design/icon_logo_name.png">
    </router-link>

    <nav class="navbar">
      <!-- Sidebar toggle button-->
      <!--<a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">-->
        <!--<span class="sr-only">Toggle navigation</span>-->
      <!--</a>-->

      <!-- <Navigation></Navigation> -->

      <!-- <Notifications></Notifications> -->
    </nav>
  </header>
</template>

<script>
  // import Navigation from './header/Navigation'
  // import Notifications from './header/Notifications'

  export default {
    components: {
      // Navigation,
      // Notifications,
    },
  }
</script>

<style lang="scss" scoped>
</style>