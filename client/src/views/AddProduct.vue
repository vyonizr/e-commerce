<template>
  <v-container grid-list-lg>
    <v-layout align-center justify-center row wrap>
      <v-flex d-flex lg4>
        <AddProductForm
        @getAllProducts="getAllProducts"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AddProductForm from '../components/AddProductForm.vue'

export default {
  props: ['role'],
  components: {
    AddProductForm
  },

  methods: {
    getAllProducts () {
      this.$emit('getAllProducts')
    }
  }
}
</script>
