<template>
  <v-app>
    <Navbar
      :carts="carts"
      :role="role"
      :token="token"
      @logout="logout"
    />

    <v-content>
      <router-view
        :carts="carts"
        :products="products"
        :role="role"
        :token="token"
        :thousandSeparator="thousandSeparator"
        @addTocart="addToCart"
        @login="login"
        @removeFromCart="removeFromCart"
        @getAllProducts="getAllProducts"
      />
    </v-content>
  </v-app>
</template>

<style>
  @import "./assets/css/index.css";
</style>

<script>
import Navbar from './components/Navbar'
import axios from './api/axios'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      products: [],
      carts: []
    }
  },

  created () {
    this.getAllProducts()

    if (this.token !== null) {
      this.getCart()
    }
  },

  methods: {
    getAllProducts () {
      axios.get('/products')
        .then(({ data }) => {
          this.products = data
        })
        .catch(err => {
          console.log(err)
        })
    },

    getCart () {
      axios.get('/carts', {
        headers: {
          'authentication': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.carts = data
        })
        .catch(err => {
          console.log(err)
        })
    },

    login () {
      this.token = localStorage.getItem('token')
      this.role = localStorage.getItem('role')
      this.$router.push({ name: 'home' })
      this.getCart()
    },

    logout () {
      localStorage.clear()
      this.token = null
      this.role = null
      this.carts = []
      this.$router.push({ name: 'home' })
    },

    addToCart (product) {
      axios.post('/carts', {
        productId: product._id
      }, {
        headers: {
          'authentication': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.carts = data
        })
        .catch(err => {
          console.log(err)
        })

      // this.carts.push(product)
    },

    removeFromCart (product) {
      axios.delete(`/carts/${product._id}`, {
        headers: {
          'authentication': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.carts = data
        })
        .catch(err => {
          console.log(err)
        })
      // const targetIndex = this.carts.findIndex(item => item._id === product._id)
      // this.carts.splice(targetIndex, 1)
    },

    thousandSeparator (num) {
      num = String(num)
      return (
        num
          .replace('.', ',')
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      )
    }
  }
}
</script>
