<template>
  <v-flex lg3 ma-3>
    <v-card>
      <v-img
        :src="product.image"
        height="125"
        contain
      ></v-img>

      <v-card-title primary-title class="blue-grey lighten-4">
        <div>
          <h4 class="headline mb-0 heebo">{{ product.name }}</h4>
          <p>Rp {{ thousandSeparator(product.price) }}</p>
        </div>
      </v-card-title>

      <v-card-actions v-if="role === 'admin'" class="grey lighten-3">
        <v-btn
          :to="{ name: 'productDetail', params: { productId: product._id}}"
          flat
          color="secondary"
          >Details
        </v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="updateDialog"
          width="400"
        >
          <template v-slot:activator="{ on }">
            <v-btn color="primary" outline dark v-on="on" @click="editProduct(product)">EDIT</v-btn>
          </template>
          <v-card style="padding: 30px; border-radius: 10px;">
            <v-form
              ref="updateProductForm"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="productName"
                :rules="productNameRules"
                label="Product name"
                required
              ></v-text-field>

              <input type="file" @change="onFileChange($event.target.name, $event.target.files)">

              <v-text-field
                v-model="productPrice"
                :rules="productPriceRules"
                label="Price"
                type="number"
                prefix="Rp "
                required
              ></v-text-field>

              <v-text-field
                v-model="productStock"
                :rules="productStockRules"
                label="Quantity"
                type="number"
                suffix="pcs"
                required
              ></v-text-field>
            </v-form>

            <v-card-actions class="justify-center">
              <v-btn outline color="grey" @click="updateDialog = false">CANCEL</v-btn>
              <v-btn color="success" @click="validate; updateAProduct(product._id)">UPDATE</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn mx-1 flat color="red" @click="removeProduct(product)">Delete</v-btn>
      </v-card-actions>
      <v-card-actions v-else-if="role !== 'admin'" class="grey lighten-3">
        <v-btn
          :to="{ name: 'productDetail', params: { productId: product._id}}"
          flat
          color="secondary"
          >Details
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          to="/users/login"
          flat
          color="primary"
          v-if="role === null"
          >Add to cart
        </v-btn>
        <v-btn v-else-if="carts.findIndex(item => item._id === product._id) === -1 && role !== 'admin'"
          flat
          color="primary"
          @click="addToCart(product)">
          Add to cart
        </v-btn>
        <v-btn v-else-if="role !== 'admin'" color="info" @click="removeFromCart(product)">Added to cart</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<style>
  @import "../assets/css/index.css";
</style>

<script>
import axios from '../api/axios'
import Swal from 'sweetalert2'

export default {
  props: ['product', 'carts', 'role', 'thousandSeparator', 'showUpdateProductModal'],
  data() {
    return {
      updateDialog: false,
      valid: true,
      productName: "",
      productNameRules: [
        v => !!v || 'Product name is required'
      ],
      productPrice: "",
      productPriceRules: [
        v => v > 0 || 'No zero or negative value',
        v => String(v)[0] !== '0' || 'Price should not start with zero'
      ],
      productStock: "",
      productStockRules: [
        v => v > 0 || 'No zero or negative value',
        v => String(v)[0] !== '0' || 'Stock should not start with zero'
      ],
      formData: null,
      addedTocart: false
    }
  },
  methods: {
    validate () {
      if (this.$refs.loginForm.validate()) {
        this.snackbar = true
      }
    },
    addToCart (product) {
      this.$emit('addTocart', product)
    },
    removeFromCart (product) {
      this.$emit('removeFromCart', product)
    },
    removeProduct (product) {
      this.$store.dispatch('removeProduct', product)
    },
    editProduct(product) {
      this.$emit('showUpdateProductModal')
      this.$store.dispatch('editProduct', product)
      this.productName = product.name
      this.productPrice = product.price
      this.productStock = product.stock
    },

    updateAProduct (productId) {
      if (this.formData !== null) {
        if (!this.formData.get('image').type.match('image.*')) {
          Swal.fire({
            type: 'error',
            text: 'Please choose an image file'
          })
        } else if (this.formData.get('image').size > 1048576) {
          Swal.fire({
            type: 'error',
            title: 'Your file is too big!',
            text: 'Please select an image under 1MB'
          })
        } else {
          this.formData.append('name', this.productName)
          this.formData.append('price', this.productPrice)
          this.formData.append('stock', this.productStock)
          axios.patch(`/products/${productId}`, this.formData, {
            headers: {
              'authentication': localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Product updated',
                showConfirmButton: false,
                timer: 1500
              })

              this.updateDialog = false
              this.$store.dispatch("getAllProducts")
              // this.$router.push({ name: 'home' })
            })
            .catch(err => {
              console.log(err)
            })
        }
      } else {
        Swal.fire({
          type: 'error',
          text: 'You must upload an image'
        })
      }
    },

    onFileChange (fieldName, file) {
      let imageFile = file[0]
      console.log(imageFile)
      let formData = new FormData()
      formData.append('image', imageFile)

      console.log(formData)
      this.formData = formData
    },
  },
}
</script>
