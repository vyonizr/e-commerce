<template>
  <v-container grid-list-lg>
    <v-layout align-center justify-center row wrap>
      <ProductCard
        v-for="product of this.$store.state.products"
        :key = "product._id"
        :product="product"
        :carts="carts"
        :role="role"
        :updateProductModal="updateProductModal"
        :thousandSeparator="thousandSeparator"
        @addTocart="addToCart"
        @removeFromCart="removeFromCart"
        @showUpdateProductModal="showUpdateProductModal"
      />
    </v-layout>

    <UpdateProductDialog
      v-if="updateProductModal"
    />
  </v-container>
</template>

<script>
import ProductCard from '../components/ProductCard'
import UpdateProductDialog from '../components/UpdateProductDialog'

export default {
  props: ['products', 'carts', 'role', 'thousandSeparator'],
  data: () => {
    return  {
      updateProductModal: false
    }
  },
  mounted() {
    this.$store.dispatch('getAllProducts')
  },
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
    },
    showUpdateProductModal() {
      this.updateProductModal = !this.updateProductModal
    }
  }
}
</script>
