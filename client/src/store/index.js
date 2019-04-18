import axios from '../api/axios'
import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    editedProduct: {}
  },

  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setEditedProduct(state, payload) {
      state.editProduct = payload
    }
  },

  actions: {
    getAllProducts (context) {
      axios.get('/products')
        .then(({ data }) => {
          context.commit("setProducts", data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    removeProduct(context, product) {
      console.log(product);
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.value) {
          return axios.delete(`products/${product._id}`, {
            headers: {
              "authentication": localStorage.getItem("token")
            }
          })
        }
        else {
          return null
        }
      })
      .then(response => {
        if (response !== null) {
          Swal.fire({
            type: 'success',
            text: "Product has been removed"
          })
        }
        context.dispatch('getAllProducts')
      })
      .catch(err => {
        console.log(err);
      })
    },

    editProduct(context, product) {
      context.commit('setEditedProduct', product)
    }
  }
})