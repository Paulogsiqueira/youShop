<template>
  <div class="purchase-completed">
    <h1>Pedido Finalizado</h1>

    <div class="resume-card">
      <PurchaseResume />
    </div>
  </div>
</template>

<script setup>
import PurchaseResume from "../components/purchaseResume.vue";
</script>
<style scoped>
.resume-card {
  width: 60%;
}

.purchase-completed {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.purchase-completed h1 {
  color: #71c5a7;
  margin-bottom: 50px;
}

@media (max-width: 860px) {
  .cart-card {
    width: 80%;
  }
}

@media (max-width: 500px) {
  .cart-card {
    width: 90%;
  }
}
</style>
