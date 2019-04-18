<template>
  <v-container grid-list-lg>
    <v-layout align-center justify-center row wrap>
      <ProductCard
        v-for="product of this.$store.state.products"
        :key = "product._id"
        :product="product"
        :carts="carts"
        :role="role"
        :thousandSeparator="thousandSeparator"
        @addTocart="addToCart"
        @removeFromCart="removeFromCart"
      />
    </v-layout>

    <UpdateProductDialog />
  </v-container>
</template>

<script>
import ProductCard from '../components/ProductCard'
import UpdateProductDialog from '../components/UpdateProductDialog'

export default {
  props: ['products', 'carts', 'role', 'thousandSeparator'],
  components: {
    ProductCard,
    UpdateProductDialog
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
