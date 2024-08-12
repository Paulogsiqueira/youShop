<template>
  <v-card class="pix-option">
    <v-card-item>
      <v-card-title class="pix-title"> Pix </v-card-title>
    </v-card-item>

    <v-card-text>
      <div class="pix-image">
        <p class="pix-qrcode__title">QR Code para pagamento</p>
        <img src="/qrcode.png" alt="QR code pix" />
        <p class="pix-key__text">Pix Copia-e-cola:</p>
        <p class="pix-key__value" ref="pixCode">
          00020126360014BR.GOV.BCB.PIX0114+551499782000952040000530398654041.995802BR5901N6001C62110507YouShop63044BAF
        </p>
      </div>
    </v-card-text>
    <v-row class="submit-row">
      <v-btn class="me-4 pix-btn" @click="handleSubmit" type="submit"
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

const pixCode = ref(null);

const handleSubmit = async () => {
  const codeValue = pixCode.value.textContent.trim();

  try {
    await store.dispatch("updatePaymentDetails", {
      method: "Pix",
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
.pix-option {
  margin-top: 2%;
  width: 100%;
}

.pix-title {
  color: #71c5a7;
  font-size: 20px;
  font-weight: bold;
}

.pix-image {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pix-qrcode__title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 2%;
}

.pix-key__text {
  margin-top: 2%;
  font-weight: 600;
}

.pix-key__value {
  display: block;
  word-break: break-all;
  overflow-wrap: break-word;
  text-align: center;
  padding: 5px;
  margin: 0;
}

.pix-image img {
  width: 40%;
}

.submit-row {
  justify-content: end;
  margin-right: 20px;
  margin-bottom: 20px;
}

.pix-btn {
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
</style>
