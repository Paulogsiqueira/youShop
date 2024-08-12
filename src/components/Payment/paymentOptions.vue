<template>
  <div class="payment-methods">
    <h2>Método de Pagamento</h2>
    <v-radio-group
      v-model="selectedPaymentMethod"
      class="payment-options__group"
      @change="emitPaymentMethod"
    >
      <v-radio label="Pix" value="pix"></v-radio>
      <v-radio label="Boleto" value="ticket"></v-radio>
      <v-radio label="Cartão de Crédito" value="card"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPaymentMethod: null,
    };
  },
  methods: {
    emitPaymentMethod() {
      this.$emit('selectPaymentMethod', this.selectedPaymentMethod);
    }
  }
};
</script>

<style scoped>
.payment-methods {
  background-color: white;
  width: 100%;
  padding: 1% 2%;
  border:2px solid #71c5a7;
}

.payment-methods h2 {
  color: #71c5a7;
  font-size: 20px;
}

.v-selection-control-group {
  flex-direction: row !important;
}
</style>
