<template>
  <v-card class="purchase-card">
    <v-card-item class="purchase-title">
      <v-card-title> Resumo do Pedido </v-card-title>
    </v-card-item>

    <v-card-text>
      <div>
        <div class="purchase-resume">
          <p>
            <strong>Número do Pedido: {{ orderCode }}</strong>
          </p>
          <p><strong>Produto:</strong>{{ productDetails.name }}</p>
          <p>
            <strong>Descrição do Produto:</strong
            >{{ productDetails.description }}
          </p>
          <p><strong>Preço do Pedido:</strong> R$ {{ productDetails.price }}</p>
          <p>
            <strong>Preço do Frete:</strong> R$ {{ purchaseDetails.freight }}
          </p>
          <p>
            <strong>Preço Total:</strong> R$
            {{
              (
                parseFloat(productDetails.price) +
                (purchaseDetails.freight || 0)
              ).toFixed(2)
            }}
          </p>
          <p><strong>Data: </strong>09/09/2024</p>
          <br />
          <p>
            <strong>Endereço de entrega:</strong>
            {{ purchaseDetails.address }} - {{ purchaseDetails.number }}
          </p>
          <p>
            <strong>Cidade de entrega:</strong> {{ purchaseDetails.city }} -
            {{ purchaseDetails.state }}
          </p>
          <p><strong>CEP:</strong> {{ purchaseDetails.cep }}</p>
          <br />
          <p>
            <strong>Método de Pagamento:</strong> {{ paymentDetails.method }}
          </p>
          <p><strong>Parcela(s):</strong> {{ paymentDetails.portionItem }}</p>
          <p>
            <strong>Valor da Parcela:</strong> R$
            {{
              (
                (parseFloat(productDetails.price) + purchaseDetails.freight) /
                parseFloat(paymentDetails.portionItem)
              ).toFixed(2)
            }}
          </p>
          <div
            v-if="
              paymentDetails.method === 'Pix' ||
              paymentDetails.method === 'Boleto Bancário'
            "
          >
            <p>
              <strong>Código do Pagamento:</strong>
              {{ paymentDetails.code }}
            </p>
          </div>
          <div v-if="paymentDetails.method === 'Cartão de Crédito'">
            <p><strong>Titular:</strong> {{ paymentDetails.titular }}</p>
            <p><strong>CPF:</strong> {{ paymentDetails.cpf }}</p>
            <p><strong>Número:</strong> {{ paymentDetails.number }}</p>
            <p><strong>Validade:</strong> {{ paymentDetails.validity }}</p>
            <p><strong>Código:</strong> {{ paymentDetails.code }}</p>
          </div>
          <br />
          <p>
            <strong>Status do Pagamento: </strong>
            <span class="purchase-status">
              <span :class="statusClass"> {{ statusText }}</span></span
            >
          </p>
        </div>
      </div>
    </v-card-text>

    <v-row class="submit-row">
      <v-btn class="me-4 submit-btn" @click="handleHomeRedirect"
        >Tela de Início</v-btn
      >
    </v-row>
    <purchaseCompletedModal />
  </v-card>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import purchaseCompletedModal from "./Modal/purchaseCompletedModal.vue";

const router = useRouter();
const store = useStore();
const productDetails = store.state.productDetails;
const purchaseDetails = store.state.purchaseDetails;
const paymentDetails = computed(() => store.state.paymentDetails);
const orderCode =  store.state.orderCode;

const statusText = computed(() => {
  return paymentDetails.value.method === "Boleto Bancário"
    ? "Pendente"
    : "Concluído";
});

const statusClass = computed(() => {
  return {
    "status-pendente": paymentDetails.value.method === "Boleto Bancário",
    "status-concluido": paymentDetails.value.method !== "Boleto Bancário",
  };
});

const handleHomeRedirect = () => {
  router.push("/");
};
</script>

<style scoped>
.purchase-title {
  display: flex;
  justify-content: center;
}

.purchase-card {
  width: 100%;
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

.purchase-status {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}

.status-pendente {
  color: rgb(176, 176, 10);
  font-weight: bold;
}

.status-concluido {
  color: green;
  font-weight: bold;
}

.purchase-resume {
  border: 1px solid black;
  padding: 4%;
  line-height: 2;
}
</style>
