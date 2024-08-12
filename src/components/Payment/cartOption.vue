<template>
  <v-card class="cart-option">
    <v-card-item>
      <v-card-title class="cart-title">Cartão de Crédito</v-card-title>
    </v-card-item>

    <div class="cart-form__div">
      <form @submit.prevent="submit" class="cart-form">
        <v-text-field
          v-model="titular"
          :error-messages="titularError"
          required
          label="Titular"
        ></v-text-field>

        <v-text-field
          v-model="cpf"
          :counter="16"
          :error-messages="cpfError"
          required
          label="CPF/CNPJ"
        ></v-text-field>

        <v-text-field
          v-model="number"
          :error-messages="numberError"
          :counter="16"
          required
          label="Número do Cartão"
        ></v-text-field>

        <v-text-field
          v-model="validity"
          :error-messages="validityError"
          :counter="7"
          required
          label="Validade (MM/AAAA)"
        ></v-text-field>

        <v-text-field
          v-model="code"
          :error-messages="codeError"
          :counter="3"
          required
          label="Código (CVV)"
        ></v-text-field>

        <v-select
          v-model="portionItem"
          :error-messages="portionError"
          :items="items"
          label="Parcela"
        ></v-select>

        <v-row class="submit-row">
          <v-btn class="me-4 submit-btn" type="submit">
            Confirmar pagamento
          </v-btn>
        </v-row>
      </form>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  validateCPFCNPJ,
  validateValidity,
  validateCardHolderName,
  validateNumber,
  validateCode,
} from "@/utils/validators";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const store = useStore();

const productDetails = computed(() => store.state.productDetails);
const purchaseDetails = store.state.purchaseDetails;

const titular = ref("");
const cpf = ref("");
const number = ref("");
const validity = ref("");
const code = ref("");
const portionItem = ref(
  `1x de R$${parseFloat(productDetails.value.price).toFixed(2)} à vista`
);

const items = ref([
  `1x de R$${parseFloat(productDetails.value.price).toFixed(2)} à vista`,
  `2x de R$${(parseFloat(productDetails.value.price) / 2).toFixed(2)}`,
  `3x de R$${(parseFloat(productDetails.value.price) / 3).toFixed(2)}`,
  `4x de R$${(parseFloat(productDetails.value.price) / 4).toFixed(2)}`,
  `5x de R$${(parseFloat(productDetails.value.price) / 5).toFixed(2)}`,
]);

const titularError = ref("");
const cpfError = ref("");
const numberError = ref("");
const validityError = ref("");
const codeError = ref("");
const portionError = ref("");

const submit = async () => {
  let valid = true;

  if (!validateCardHolderName(titular.value)) {
    titularError.value =
      "O nome deve conter apenas letras e ter mais de 10 caracteres.";
    valid = false;
  } else {
    titularError.value = "";
  }

  if (!validateCPFCNPJ(cpf.value)) {
    cpfError.value = "Digite um CPF ou CNPJ válido.";
    valid = false;
  } else {
    cpfError.value = "";
  }

  if (!validateNumber(number.value)) {
    numberError.value = "O número do cartão deve conter exatamente 16 números.";
    valid = false;
  } else {
    numberError.value = "";
  }

  if (!validateValidity(validity.value)) {
    validityError.value =
      "Digite uma data válida que seja posterior à data atual.";
    valid = false;
  } else {
    validityError.value = "";
  }

  if (!validateCode(code.value)) {
    codeError.value = "O código deve conter exatamente 3 números.";
    valid = false;
  } else {
    codeError.value = "";
  }

  if (!portionItem.value) {
    portionError.value = "Selecione uma parcela.";
    valid = false;
  } else {
    portionError.value = "";
  }

  if (valid) {
    const portionNumber = portionItem.value.split("x")[0].trim();

    const paymentDetails = {
      method: "Cartão de Crédito",
      titular: titular.value,
      cpf: cpf.value,
      number: number.value,
      validity: validity.value,
      code: code.value,
      portionItem: portionNumber,
    };

    store.dispatch("updatePaymentDetails", paymentDetails);

    const response = await axios.post(
      `https://api.deepspacestore.com/offers/${productDetails.value.code}/create_order`,
      {
        productDetails: productDetails.value,
        purchaseDetails: purchaseDetails.value,
        paymentDetails: paymentDetails.value,
        cpf: cpf.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.error == "CPF_INVALIDO") {
      cpfError.value = "Digite um CPF ou CNPJ válido.";
      alert("CPF inválido");
      return;
    }

    cpfError.value = "";
    const orderCode = response.data.order.orderId;
    await store.dispatch("updateOrderCode", orderCode);
    await store.dispatch("updatePurchaseComplete", true);
    router.push("/purchaseCompleted");
  }
};
</script>

<style scoped>
.cart-option {
  margin-top: 2%;
  width: 75%;
  margin-right: 25%;
}

.cart-title {
  color: #71c5a7;
  font-size: 20px;
  font-weight: bold;
}

.cart-form__div {
  width: 80%;
  display: flex;
  justify-content: center;
}

.cart-form {
  width: 80%;
  padding: 2%;
  border: 1px solid rgb(197, 197, 197);
  border-radius: 2%;
  margin-bottom: 2%;
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

@media (max-width: 1000px) {
  .cart-option {
    width: 95%;
    margin-right: 5%;
  }

  .cart-form__div {
    width: 90%;
  }
  .cart-form {
    width: 90%;
  }
}

@media (max-width: 650px) {
  .cart-option {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 2% auto;
  }
}
</style>
