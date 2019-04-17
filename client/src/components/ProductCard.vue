<template>
  <v-flex lg3>
    <v-card>
      <v-img
        src="https://www.google.co.id/logos/doodles/2019/indonesia-elections-2019-5911987744669696-l.png"
        aspect-ratio="2.75"
      ></v-img>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ product.name }}</h3>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="primary">Add to cart</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['products']
}
</script>
