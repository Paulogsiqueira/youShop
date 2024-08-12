<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-item>
      <v-card-title>
        Resumo do Pedido
      </v-card-title>
    </v-card-item>

    <v-card-text>
      <div class="cart-item">
        <div class="cart-product">
          <h4>{{ productDetails.name }}</h4>
          <p>{{ productDetails.description }}</p>
        </div>
        <p class="cart-price">R$ {{ productDetails.price }}</p>
      </div>
    </v-card-text>

    <v-card-text class="cart-total">
      <p class="cart-subtotal">Subtotal: R$ {{ productDetails.price }}</p>
      <p class="cart-freight">Frete: R$ {{ purchaseDetails.freight || "0.00" }}</p>
      <p class="cart-totalPrice">
        Total: R$ {{ (parseFloat(productDetails.price) + (purchaseDetails.freight || 0)).toFixed(2) }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const productDetails = computed(() => store.state.productDetails);
const purchaseDetails = computed(() => store.state.purchaseDetails);

</script>

<style scoped>
.cart-item {
  display: flex;
}

.cart-product {
  width: 75%;
}

.cart-product p {
  font-size: 11px;
}

.cart-price {
  width: 23%;
  color: green;
  font-weight: bold;
  min-width: 75px;
}

.cart-total {
  font-weight: bold;
}

.cart-totalPrice {
  margin-top: 10px;
  font-size: 20px;
  color: rgb(28, 185, 28);
}
</style>
