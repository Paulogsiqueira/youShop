<template>
  <v-card
    :disabled="loading"
    :loading="loading"
    class="mx-auto my-12 product-card"
    max-width="374"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="teal-lighten-2"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="img"
      cover
    ></v-img>

    <v-card-item>
      <v-card-title class="text--teal-lighten-2">{{ name }}</v-card-title>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="4.5"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>

        <div class="text-grey ms-4">4.5 (413)</div>
      </v-row>
      <v-row class="mx-0 text-green price-text">R${{ price }}</v-row>

      <div class="mt-4 product-card__description">{{ description }}</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Métodos de Pagamento</v-card-title>

    <div class="px-4 mb-2">
      <div class="productCard-methods">
        <v-chip>Pix</v-chip>

        <v-chip>Boleto</v-chip>

        <v-chip>Cartão de Crédito</v-chip>
      </div>
    </div>

    <v-card-actions>
      <v-btn class="productCard-btn"
        color="teal-lighten-2"
        text="Comprar"
        block
        border
        @click="reserve"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';

const loading = ref(false);
const store = useStore();
const router = useRouter(); 


const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
});

const reserve = () => {
  loading.value = true;
  setTimeout(() => {
    store.dispatch('setProductDetails', {
      name: props.name,
      description: props.description,
      price: props.price,
      code: props.code,
    });
    loading.value = false;
    router.push({ name: 'Product', params: { code: props.code } });
  }, 2000);
};
</script>


<style scoped>
.product-card__description {
  height: 60px;
}

.price-text {
  font-size: 20px;
  font-weight: bold;
}

.productCard-methods{
  display: flex;
  gap:6px;
}

.productCard-btn{
  font-weight: bold;
}

.productCard-btn:hover{
  background-color: #dcdedd;
}
</style>



