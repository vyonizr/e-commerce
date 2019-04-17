<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex lg12>
        <LoginForm
        @login="login"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

export default {
  props: ['token', 'role'],
  components: {
    LoginForm
  },
  methods: {
    login () {
      this.$emit('login')
    }
  }
}
</script>
