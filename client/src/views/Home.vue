<template>
  <v-container grid-list-lg>
    <v-layout align-center justify-center row wrap>
      <ProductCard
        v-for="product of products"
        :key = "product._id"
        :product="product"
        :carts="carts"
        :role="role"
        :thousandSeparator="thousandSeparator"
        @addTocart="addToCart"
        @removeFromCart="removeFromCart"
      />
    </v-layout>
  </v-container>
</template>

<script>
import ProductCard from '../components/ProductCard'

export default {
  props: ['products', 'carts', 'role', 'thousandSeparator'],
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
