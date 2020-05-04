<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <navbar />
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from "./components/Navbar";
export default {
  name: "app",
  components: {
    navbar
  }
};
</script>
