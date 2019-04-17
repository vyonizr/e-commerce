<template>
  <v-container>
    <v-layout align-center justify-center column fill-height >
      <v-flex lg12>
        <h2>Welcome back</h2>
        <v-form
          ref="loginForm"
          v-model="valid"
          lazy-validation
          style="width: 300px;"
        >

          <v-text-field
            v-model="emailInput"
            :rules="emailInputRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="passwordInput"
            type="password"
            :rules="passwordInputRules"
            label="Password"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="primary"
            @click="validate; login()"
          >
            Login
          </v-btn>
        </v-form>
      </v-flex>
      <v-flex lg12>
        <span>Not a member? <router-link to="/users/register">Register</router-link></span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '../api/axios'
import Swal from 'sweetalert2'

export default {
  data: () => ({
    valid: true,
    emailInput: 'afit@mail.com',
    emailInputRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordInput: '123',
    passwordInputRules: [
      v => !!v || 'Password is required'
    ]
  }),

  methods: {
    validate () {
      if (this.$refs.loginForm.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.loginForm.reset()
    },
    resetValidation () {
      this.$refs.loginForm.resetValidation()
    },
    login () {
      axios.post('users/login', {
        email: this.emailInput,
        password: this.passwordInput
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          localStorage.setItem('name', data.name)
          localStorage.setItem('role', data.role)
          localStorage.setItem('authMethod', 'basic')

          this.$emit('login')

          Swal.fire({
            type: 'success',
            title: `Welcome, ${localStorage.getItem('name')}!`,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          let errorMessage = ''
          if (err.response.data.errors) {
            for (let key in err.response.data.errors) {
              errorMessage += err.response.data.errors[key] + '\n'
            }
          }
          Swal.fire({
            type: 'error',
            text: errorMessage,
            showConfirmButton: false,
            timer: 1000
          })
          console.log(err.response.data)
        })
    }
  }
}
</script>
