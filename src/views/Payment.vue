<template>
  <div class="payment-form">
    <h1>Formulário de Compra</h1>
    <div class="payment-content">
      <div class="payment-options">
        <PaymentOptions @selectPaymentMethod="handlePaymentMethodSelection" />
        <PixOption v-if="paymentMethod === 'pix'" />
        <TicketOption v-else-if="paymentMethod === 'ticket'" />
        <CartOption v-else-if="paymentMethod === 'card'" />
      </div>
      <div class="cart-card">
        <ResumeCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PaymentOptions from "@/components/Payment/paymentOptions.vue";
import ResumeCard from "@/components/Cards/resumeCard.vue";
import PixOption from "../components/Payment/pixOption.vue";
import TicketOption from "../components/Payment/ticketOption.vue";
import CartOption from "../components/Payment/cartOption.vue";

const paymentMethod = ref("");

const handlePaymentMethodSelection = (method) => {
  paymentMethod.value = method;
};
</script>

<style scoped>
.payment-content {
  display: flex;
  width: 90%;
  justify-content: space-between;
}
.cart-card {
  width: 25%;
}

.payment-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 73%;
}

.payment-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 5%;
}

.payment-form h1 {
  color: #71c5a7;
  margin-bottom: 50px;
}

@media (max-width: 1000px) {
  .payment-options {
    width: 60%;
  }

  .cart-card {
    width: 35%;
  }
}

@media (max-width: 860px) {
  .payment-options {
    width: 80%;
  }

  .cart-card {
    width: 60%;
    margin-left:2%;
    margin-top: 4%;
  }

  .payment-content {
    flex-direction: column;
    align-items: center;
  }
}

</style>
