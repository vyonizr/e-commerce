<template>
  <v-dialog>
    <v-card>
      <v-form
        ref="updateProductForm"
        v-model="valid"
        lazy-validation
        style="width: 300px;"
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
        <v-btn outline color="grey" @click="updateAnArticleModal = false;">CANCEL</v-btn>
        <v-btn color="success" @click="updateAnArticleModal = false; updateAnArticle();">UPDATE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => {
    return {
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
    }
  },

  updateAProduct () {
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
        axios.patch('/products', this.formData, {
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
            this.$store.dispatch("getAllProducts")
            this.$router.push({ name: 'home' })
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

  methods: {
    onFileChange (fieldName, file) {
      console.log(imageFile)
      let formData = new FormData()
      formData.append('image', imageFile)

      this.formData = formData
    },
  }
}
</script>