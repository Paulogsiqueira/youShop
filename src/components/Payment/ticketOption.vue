<template>
  <v-card class="ticket-option">
    <v-card-item>
      <v-card-title class="ticket-title">Boleto Bancário </v-card-title>
    </v-card-item>

    <v-card-text>
      <div class="ticket-image">
        <p class="ticket-value__title">Boleto gerado com sucesso!</p>
        <p class="ticket-value__subtitle">
          Utilize o número do código de barras para realizar o pagamento da sua
          fatura
        </p>
        <img src="/ticket.png" alt="Ticket" />
        <p class="ticket-key__value" ref="ticketCode">
          38397897300000139800000191410000001374150801
        </p>
      </div>
    </v-card-text>
    <v-row class="submit-row">
      <v-btn class="me-4 submit-btn" @click="handleSubmit" type="submit"
        >Confirmar pagamento</v-btn
      >
    </v-row>
  </v-card>
</template>
  
<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import axios from "axios";

const router = useRouter();
const store = useStore();

const productDetails = computed(() => store.state.productDetails);
const purchaseDetails = store.state.purchaseDetails;
const paymentDetails = store.state.paymentDetails;

const ticketCode = ref(null);

const handleSubmit = async () => {
  const codeValue = ticketCode.value.textContent.trim();
  try {
    await store.dispatch("updatePaymentDetails", {
      method: "Boleto Bancário",
      code: codeValue,
      portionItem: "1",
    });

    const response = await axios.post(
      `https://api.deepspacestore.com/offers/${productDetails.value.code}/create_order`,
      {
        productDetails: productDetails.value,
        purchaseDetails: purchaseDetails.value,
        paymentDetails: paymentDetails.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const orderCode = response.data.order.orderId;
    await store.dispatch("updateOrderCode", orderCode);

    await store.dispatch("updatePurchaseComplete", true);
    router.push("/purchaseCompleted");
  } catch (error) {
    console.error("Error submitting order:", error);
  }
};
</script>

<style scoped>
.ticket-option {
  margin-top: 2%;
  width: 100%;
}

.ticket-title {
  color: #71c5a7;
  font-size: 20px;
  font-weight: bold;
}

.ticket-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2%;
}

.ticket-image img {
  min-width: 270px;
}

.ticket-value__title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2%;
  text-align: center;
}

.ticket-value__subtitle {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 2%;
  text-align: center;
}

.ticket-key__value {
  font-size: 16px;
  margin-top: 2%;
  display: block;
  word-break: break-all;
  overflow-wrap: break-word;
  text-align: center;
  padding: 5px;
}

.ticket-image img {
  width: 50%;
}

.submit-row {
  justify-content: end;
  margin-right: 20px;
  margin-bottom: 20px;
}

.submit-btn {
  margin-top: 3%;
  background-color: #71c5a7;
  color: #ffffff;
  font-weight: bold;
}

@media (max-width: 860px) {
  .submit-row {
    justify-content: center;
    margin-right: 0px;
    margin-bottom: 20px;
  }
}

@media (max-width: 560px) {
  .ticket-value__subtitle {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 2%;
    text-align: center;
  }
}
</style>
