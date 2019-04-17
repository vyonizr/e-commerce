<template>
  <v-container>
    <v-layout>
      <v-flex lg12>
        <AddProductForm/>
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
  }
}
</script>
