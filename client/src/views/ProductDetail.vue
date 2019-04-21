<template>
  <v-container align-content-center>
    <v-layout row wrap align-center justify-center>
      <v-flex>
        <router-link to="/" style="text-decoration: none; color: inherit;">
          <span class="title">
            <v-icon>arrow_back</v-icon> Back
          </span>
        </router-link>
      </v-flex>
      <v-flex xs12 text-xs-center my-3>
        <span class="display-2">{{ productDetail.name }}</span>
      </v-flex>
      <v-flex xs3 align-self-end mx-2>
        <v-img
          :src="productDetail.image"
        />
      </v-flex>
      <v-flex xs4 mx-2>
        <v-layout row wrap align-center>
          <v-flex xs12>
            <span class="display-1">Price: Rp {{ thousandSeparator(productDetail.price) }}</span>
          </v-flex>
          <v-flex xs12>
            <span class="display-1">Stock available: {{ productDetail.stock }}</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '../api/axios'

export default {
  props: ['thousandSeparator'],
  data() {
    return {
      productDetail: {}
    }
  },
  created() {
    this.getProductDetail()
  },
  methods: {
    getProductDetail() {
      axios.get(`/products?productId=${this.$route.params.productId}`)
      .then(({ data }) => {
        this.productDetail = data
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>