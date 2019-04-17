<template>
  <v-container>
    <v-layout align-center justify-center row fill-height>
      <v-flex lg4>
        <v-data-table
          :headers="headers"
          :items="carts"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.price }}</td>
            <td class="text-xs-center"><v-icon @click="removeFromCart(props.item)">delete</v-icon></td>
          </template>
          <template v-slot:footer>
            <td :colspan="headers.length">
              <strong>Total: Rp {{ totalPrice }}</strong>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['carts', 'role'],
  data() {
    return {
      headers: [
        {text: "Product", value: "name"},
        {text: "Price", value: "price"},
        {text: "Option", value: 'name', sortable: false}
      ]
    }
  },
  methods: {
    removeFromCart (product) {
      this.$emit('removeFromCart', product)
    }
  },
  computed: {
    totalPrice() {
      let result = 0
      this.carts.forEach(item => {
        result += item.price
      })
      return result
    }
  },
}
</script>
