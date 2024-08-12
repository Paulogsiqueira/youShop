<template>
  <div class="products-container">
    <div
      v-for="(product, index) in productsList"
      :key="index"
      class="product-item"
    >
      <ProductCard
        :name="product.name"
        :description="product.description"
        :img="product.img"
        :price="product.price"
        :code="product.code"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ProductCard from "@/components/Cards/productCard.vue";

const productsList = ref([]);

const fetchProducts = async () => {
  try {
    const response = await axios.get("https://api.deepspacestore.com/offers");
    productsList.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.product-item {
  flex: 1 1 calc(33.333% - 16px); /* 3 items per row */
  box-sizing: border-box;
}
</style>
