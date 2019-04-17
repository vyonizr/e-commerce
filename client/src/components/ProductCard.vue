<template>
  <v-flex lg2 mx-4>
    <v-card>
      <v-img
        :src="product.image"
        height="125"
        contain
      ></v-img>

      <v-card-title primary-title>
        <div>
          <h4 class="headline mb-0">{{ product.name }}</h4>
          <p>Rp {{ product.price }}</p>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="carts.findIndex(item => item._id === product._id) === -1"
          flat
          color="primary"
          @click="addToCart(product)">
          Add to cart
        </v-btn>
        <v-btn v-else color="info" @click="removeFromCart(product)">Added to cart</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['product', 'carts'],
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
