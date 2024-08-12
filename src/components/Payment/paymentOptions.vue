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

<script setup>
import { ref, defineEmits } from 'vue';

const selectedPaymentMethod = ref(null);

const emit = defineEmits(['selectPaymentMethod']);

const emitPaymentMethod = () => {
  emit('selectPaymentMethod', selectedPaymentMethod.value);
};
</script>

<style scoped>
.payment-methods {
  background-color: white;
  width: 100%;
  padding: 1% 2%;
  border: 2px solid #71c5a7;
}

.payment-methods h2 {
  color: #71c5a7;
  font-size: 20px;
}

.v-selection-control-group {
  flex-direction: row !important;
}
</style>
