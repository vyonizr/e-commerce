<template>
  <v-form
    ref="addProductForm"
    v-model="valid"
    lazy-validation
    style="width: 300px;"
    @submit.prevent="validate; createAproduct(); reset"
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

    <v-btn
      :disabled="!valid"
      color="success"
      type="submit"
    >
      Submit
    </v-btn>
  </v-form>
</template>

<script>
import axios from '../api/axios'
import Swal from 'sweetalert2'

export default {
  data: () => ({
    valid: true,
    productName: '',
    productNameRules: [
      v => !!v || 'Product name is required'
    ],
    productPrice: '',
    productPriceRules: [
      v => v > 0 || 'No zero or negative value',
      v => String(v)[0] !== '0' || 'Price should not start with zero'
    ],
    productStock: '',
    productStockRules: [
      v => v > 0 || 'No zero or negative value',
      v => String(v)[0] !== '0' || 'Stock should not start with zero'
    ],
    formData: null
  }),

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },

    createAproduct () {
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
          axios.post('/products', this.formData, {
            headers: {
              'authentication': localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'New product created',
                showConfirmButton: false,
                timer: 1500
              })
              this.$store.dispatch('getAllProducts')
              this.$router.push({ name: 'home' })
            })
            .catch(err => {
              console.log(err)
            })
        }
      } else {
        this.formData = new FormData()
        this.formData.set('name', this.productName)
        this.formData.set('price', this.productPrice)
        this.formData.set('stock', this.productStock)

        axios.post('/products', this.formData, {
            headers: {
              'authentication': localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'New product created',
                showConfirmButton: false,
                timer: 1500
              })
              this.$store.dispatch('getAllProducts')
              this.$router.push({ name: 'home' })
            })
            .catch(err => {
              console.log(err)
            })
      }
    },

    onFileChange (fieldName, file) {
      let imageFile = file[0]
      let formData = new FormData()
      formData.append('image', imageFile)

      this.formData = formData
    },

    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>
