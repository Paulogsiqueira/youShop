<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card max-width="600">
      <div class="modal-card">
        <img src="/check.png" alt="Purchase Completed" class="modal-img" />
        <h1>PEDIDO FINALIZADO COM SUCESSO</h1>
        <p>
          Em alguns minutos você receberá o código de rastreio do pedido por SMS
        </p>
        <p>Seu pedido deverá ser entregue em até 8 dias</p>
      </div>
      <template v-slot:actions>
        <v-row class="submit-row">
          <v-btn
            class="me-4 submit-btn"
            text="Confirmar"
            @click="closeDialog"
          ></v-btn>
        </v-row>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const dialog = computed({
  get() {
    return store.state.purchaseComplete;
  },
  set(value) {
    store.commit("setPurchaseComplete", value);
  },
});
const closeDialog = () => {
  dialog.value = false;
};

watch(
  () => store.state.purchaseComplete,
  (newValue) => {
    dialog.value = newValue;
  }
);
</script>

<style scoped>
.modal-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.modal-card h1 {
  color: #939594;
}
.modal-card p {
  color: #5c5c5c;
}

.modal-img {
  width: 50%;
}

.submit-row {
  justify-content: center;
  margin-bottom: 20px;
}

.submit-btn {
  margin-top: 3%;
  background-color: #71c5a7;
  color: #ffffff;
  font-weight: bold;
}
</style>