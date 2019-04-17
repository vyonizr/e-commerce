<template>
  <v-toolbar app dark color="#404040">
    <v-toolbar-title class="mr-3">
      <span style="font-family: 'Volkhov', serif; font-size: 2rem">
        <router-link to="/" style="text-decoration: none; color: inherit;">Divenire</router-link>
      </span>
    </v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn to="/catalogues" flat>
        CATALOGUES
      </v-btn>
      <v-btn to="/add-product" flat v-show="role === 'admin' && token !== null">
        ADD PRODUCT
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn icon v-show="role === 'user' && token !== null">
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <v-btn to="/" @click="logout()" flat v-show="token !== null">
        LOGOUT
      </v-btn>
      <v-btn to="/users/login" flat v-show="token === null">
        LOGIN
      </v-btn>
      <v-btn to="/users/register" flat v-show="token === null">
        REGISTER
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: ['token', 'role'],
  data: () => ({
  }),
  methods: {
    logout () {
      this.$emit('logout')
    }
  }
}
</script>
