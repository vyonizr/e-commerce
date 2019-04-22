<template>
  <div>
    <router-view
    :thousandSeparator="thousandSeparator"
    />
  </div>
</template>

<script>
import ProductDetail from './ProductDetail'

export default {
  props: ['thousandSeparator']
}

</script>
