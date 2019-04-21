<template>
  <v-toolbar app dark color="#404040">
    <v-toolbar-title class="mr-3">
      <span style="font-family: 'Volkhov', serif; font-size: 2rem">
        <router-link to="/" class="playfair-display" style="text-decoration: none; color: inherit;">Divenire</router-link>
      </span>
    </v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down">
      <!-- <v-btn to="/catalogues" flat>
        CATALOGUES
      </v-btn> -->
      <v-btn to="/add-product" flat :ripple="false" v-show="role === 'admin' && token !== null">
        <span class="oswald subheading">ADD PRODUCT</span> 
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn to="/carts" icon :ripple="false" v-show="role === 'user' && token !== null">
        <v-badge left color="deep-orange darken-2">
          <template v-slot:badge v-if="carts.length > 0">
            <span>{{ carts.length }}</span>
          </template>
          <v-icon>shopping_cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn to="/" @click="logout()" flat :ripple="false" v-show="token !== null">
        <span class="oswald subheading">LOGOUT</span>
      </v-btn>
      <v-btn to="/users/login" flat :ripple="false" v-show="token === null">
        <span class="oswald subheading">LOGIN</span>
      </v-btn>
      <v-btn to="/users/register" flat :ripple="false" v-show="token === null">
        <span class="oswald subheading">REGISTER</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<style>
  @import "../assets/css/index.css";
</style>


<script>
export default {
  props: ['token', 'role', 'carts'],
  data: () => ({
  }),
  methods: {
    logout () {
      this.$emit('logout')
    }
  }
}
</script>
