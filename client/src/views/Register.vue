<template>
  <v-container>
    <v-layout>
      <v-flex lg12>
        <RegistrationForm/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RegistrationForm from '../components/RegistrationForm.vue'

export default {
  props: ['role'],
  components: {
    RegistrationForm
  }
}
</script>
