<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            id="completeName"
            v-model="completeName"
            :error-messages="completeNameError"
            label="Nome completo"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            id="phone"
            v-model="phone"
            :counter="11"
            :error-messages="phoneError"
            label="Telefone"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            id="email"
            v-model="email"
            :error-messages="emailError"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            id="cep"
            v-model="cep"
            :error-messages="cepError"
            label="CEP"
            required
          ></v-text-field>
        </v-col>
        <v-btn class="me-4 cep-btn" @click="fetchAddress">Buscar</v-btn>
      </v-row>

      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="address"
            label="Endereço"
            :error-messages="addressError"
            required
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="number"
            label="Número"
            :error-messages="numberError"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="complement"
            :error-messages="complementError"
            label="Complemento"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="city"
            label="Cidade"
            :error-messages="cityError"
            required
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="state"
            label="Estado"
            :error-messages="stateError"
            required
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="submit-row">
        <v-btn class="me-4 delivery-btn" type="submit">Ir para pagamento</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

const store = useStore();
const router = useRouter();

const completeName = ref("");
const email = ref("");
const phone = ref("");
const cep = ref("");
const address = ref("");
const complement = ref("");
const number = ref("");
const city = ref("");
const state = ref("");

const completeNameError = ref("");
const emailError = ref("");
const phoneError = ref("");
const cepError = ref("");
const addressError = ref("");
const complementError = ref("");
const numberError = ref("");
const cityError = ref("");
const stateError = ref("");

const fetchAddress = async () => {
  const cepValue = cep.value;
  const cepNumber = cepValue.replace(/\D/g, "");

  if (cepNumber.length === 8) {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${cepNumber}/json/`
      );
      const data = response.data;

      if (!data.erro) {
        address.value = data.logradouro;
        city.value = data.localidade;
        state.value = data.uf;

        const minFreight = 7.5;
        const maxFreight = 15.0;
        const randomFreight = (
          Math.random() * (maxFreight - minFreight) +
          minFreight
        ).toFixed(2);

        store.dispatch("updateFreight", parseFloat(randomFreight));
      } else {
        address.value = "";
        city.value = "";
        state.value = "";
        alert("CEP não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      address.value = "";
      city.value = "";
      state.value = "";
      alert("Erro ao buscar endereço");
    }
  } else {
    alert("CEP inválido");
  }
};

const validateName = (value) => {
  return /^[A-Za-z\s]+$/.test(value) && value.length > 10;
};

const validatePhone = (value) => {
  return /^\d{11}$/.test(value);
};

const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const validateCep = (value) => {
  const cleanedValue = value.replace(/\D/g, "");
  return /^\d{8}$/.test(cleanedValue);
};

const validateAddress = (value) => {
  return value.length > 2;
};

const submit = () => {
  let valid = true;

  if (!validateName(completeName.value)) {
    completeNameError.value = "O nome deve ter mais de 10 caracteres.";
    valid = false;
  } else {
    completeNameError.value = "";
  }

  if (!validatePhone(phone.value)) {
    phoneError.value = "Digite um telefone válido";
    valid = false;
  } else {
    phoneError.value = "";
  }

  if (!validateEmail(email.value)) {
    emailError.value = "Digite um email válido";
    valid = false;
  } else {
    emailError.value = "";
  }

  if (!validateCep(cep.value)) {
    cepError.value = "Digite um CEP válido";
    valid = false;
  } else {
    cepError.value = "";
  }

  if (!validateAddress(address.value)) {
    addressError.value = "Busque pelo CEP";
    valid = false;
  } else {
    addressError.value = "";
  }

  if (valid) {
    store.commit("updatePurchaseDetails", {
      address: address.value,
      city: city.value,
      state: state.value,
      cep: cep.value,
      number: number.value,
      complement: complement.value,
    });

    router.push("/payment");
  }
};
</script>

<style scoped>
.cep-btn {
  margin-top: 30px;
  margin-left: 10px;
}

.submit-row {
  justify-content: end;
}

.delivery-btn {
  margin-top: 3%;
  background-color: #71c5a7;
  color: #ffffff;
  font-weight: bold;
}
</style>
