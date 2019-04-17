<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <ProductCard
        v-for="product of products"
        :key = "product._id"
        :product="product"
        :carts="carts"
        @addTocart="addToCart"
        @removeFromCart="removeFromCart"
      />
    </v-layout>
  </v-container>
</template>

<script>
import ProductCard from '../components/ProductCard'

export default {
  props: ['products', 'carts'],
  components: {
    ProductCard
  },
  methods: {
    addToCart (product) {
      this.$emit('addTocart', product)
    },
    removeFromCart (product) {
      this.$emit('removeFromCart', product)
    }
  }
}
</script>
