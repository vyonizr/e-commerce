<template>
  <v-container>
    <v-layout align-center justify-center fill-height>
      <ProductCard
        :products="products"
        v-for="product of products"
        :key = "product._id"
        :product="product"
      />
    </v-layout>
  </v-container>
</template>

<script>
import ProductCard from '../components/ProductCard'

export default {
  props: ['products'],
  components: {
    ProductCard
  }
}
</script>
