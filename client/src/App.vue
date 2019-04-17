<template>
  <v-app>
    <Navbar
      :role="role"
      :token="token"
      @logout="logout"
    />

    <v-content>
      <router-view
        :role="role"
        :token="token"
        @login="login"
        :products="products"
      />
    </v-content>
  </v-app>
</template>

<style>
  @import "./assets/css/index.css";
</style>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      products: [{
        _id: '1',
        name: 'Azure',
        image: '',
        price: 50000,
        stock: 30
      }, {
        _id: '2',
        name: 'Google Vision',
        image: '',
        price: 100000,
        stock: 20
      }, {
        _id: '3',
        name: 'Compute Engine',
        image: '',
        price: 150000,
        stock: 5
      }],
      carts: [

      ]
    }
  },
  methods: {
    login () {
      this.token = localStorage.getItem('token')
      this.role = localStorage.getItem('role')
      this.$router.push({ name: 'home' })
    },
    logout () {
      localStorage.clear()
      this.token = null
      this.role = null
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
