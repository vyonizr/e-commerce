<template>
  <v-form
    ref="addProductForm"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="productName"
      :rules="productNameRules"
      label="Product name"
      required
    ></v-text-field>

    <v-text-field
      v-model="productPrice"
      :rules="productPriceRules"
      label="Price"
      type="number"
      required
    ></v-text-field>

    <v-text-field
      v-model="productStock"
      :rules="productStockRules"
      label="stock"
      type="number"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      Submit
    </v-btn>

    <v-btn
      color="error"
      @click="reset"
    >
      Reset Form
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Product name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    productPrice: 0,
    productPriceRules: [
      v => v > 0 || 'No zero or negative value'
    ],
    productStock: 0,
    productStockRules: [
      v => v > 0 || 'No zero or negative value'
    ]
  }),

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
