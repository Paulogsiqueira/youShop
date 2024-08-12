<template>
  <div class="product-container">
    <div class="product-card">
      <div class="product-images">
        <img
          class="product-image__principal"
          :src="productItem.img"
          alt="Product Image"
        />
        <div class="additional-images">
          <img
            v-for="(image, index) in productItem.anothersImg"
            :key="index"
            :src="image"
            :alt="'Additional Image ' + index"
            class="product-image__additional"
            @click="updateMainImage(image)"
          />
        </div>
      </div>
      <div class="product-info">
        <h2 class="product-name">{{ productItem.name }}</h2>
        <p class="product-brand">{{ productItem.brand }}</p>
        <p class="product-description">{{ productItem.description }}</p>
        <p class="product-price">R$ {{ productItem.price }}</p>
        <v-row class="submit-row">
          <v-btn class="me-4 submit-btn" @click="handleDeliveryRedirect">
            Comprar
          </v-btn>
        </v-row>
      </div>
    </div>
  </div>
</template>
    
  <script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();


const handleDeliveryRedirect = () => {
  router.push("/delivery");
};

const productItem = ref({
  name: "",
  description: "",
  img: "",
  price: "",
  brand: "",
  paymentMethods: [],
  installmentsNumber: 0,
  anothersImg: [],
});

const fetchProductDetails = async (code) => {
  try {
    const response = await fetch(`https://api.deepspacestore.com/offers/${code}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    productItem.value = data;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }
};

onMounted(() => {
  const code = route.params.code;
  fetchProductDetails(code); 
});

const updateMainImage = (imageUrl) => {
  productItem.value.img = imageUrl;
};
</script>
    
  <style scoped>
.product-card {
  width: 80%;
  background: white;
  margin: 5% auto;
  border: 2px solid #71c5a7;
  color: #818181;
  display: flex;
}

.product-images {
  width: 55%;
  padding: 3%;
}

.additional-images {
  display: flex;
  justify-content: space-between;
}

.product-image__additional {
  margin-top: 1%;
  width: 20%;
}

.product-image__additional:hover {
  cursor: pointer;
  scale: 1.2;
}

.product-info {
  width: 40%;
  padding-top: 3%;
}

.product-name {
  color: #71c5a7;
}

.product-brand {
  font-size: 14px;
}

.product-description {
  margin-top: 2%;
}

.product-price {
  color: green;
  font-weight: bold;
  font-size: 22px;
  margin-top: 5%;
}

.product-image__principal {
  width: 100%;
  max-height: 500px;
}

.submit-row {
  justify-content: end;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-top: 5%;
}

.submit-btn {
  margin-top: 3%;
  background-color: #71c5a7;
  color: #ffffff;
  font-weight: bold;
}

@media (max-width: 860px) {
  .product-description {
    font-size: 14px;
  }
}

@media (max-width: 720px) {
  .product-description {
    font-size: 12px;
  }
}

@media (max-width: 600px) {
  .product-card {
    width: 90%;
  }

  .submit-row {
    margin-right: 10px;
  }
}
</style>
  