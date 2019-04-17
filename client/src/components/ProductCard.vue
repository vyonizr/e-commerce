<template>
  <v-flex lg3 ma-3>
    <v-card>
      <v-img
        :src="product.image"
        height="125"
        contain
      ></v-img>

      <v-card-title primary-title>
        <div>
          <h4 class="headline mb-0">{{ product.name }}</h4>
          <p>Rp {{ thousandSeparator(product.price) }}</p>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="carts.findIndex(item => item._id === product._id) === -1 && role !== 'admin'"
          flat
          color="primary"
          @click="addToCart(product)">
          Add to cart
        </v-btn>
        <v-btn v-else-if="role !== 'admin'" color="info" @click="removeFromCart(product)">Added to cart</v-btn>
        <v-btn v-else-if="role === 'admin'" color="info">Edit product</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['product', 'carts', 'role', 'thousandSeparator'],
  methods: {
    addToCart (product) {
      this.$emit('addTocart', product)
    },
    removeFromCart (product) {
      this.$emit('removeFromCart', product)
    }
  },
  data: () => ({
    addedTocart: false
  })
}
</script>
