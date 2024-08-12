import { createRouter, createWebHistory } from 'vue-router';
import Checkout from '../views/Checkout.vue'; 
import Delivery from '../views/Delivery.vue';
import Payment from '../views/Payment.vue';
import PurchaseCompleted from '../views/PurchaseCompleted.vue';
import Product from '../views/Product.vue';
import store from '../store'; // Importe a store para acessar o state

const routes = [
  {
    path: '/',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/product/:code',
    name: 'Product',
    component: Product,
    props: true,
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: Delivery,
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
  },
  {
    path: '/purchaseCompleted',
    name: 'PurchaseCompleted',
    component: PurchaseCompleted,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.name === 'PurchaseCompleted' && (store.state.productDetails.name === "" && store.state.purchaseDetails.address === "" && store.state.paymentDetails.method === "")) {
    next('/');
  } else {
    next();
  }
});


router.beforeEach((to, from, next) => {
  if (to.name === 'Payment' && (store.state.productDetails.name === "" && store.state.purchaseDetails.address === "")) {
    next('/');
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Delivery' && store.state.productDetails.name === "") {
    next('/');
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Product' && store.state.productDetails.name === "") {
    next('/');
  } else {
    next();
  }
});

export default router;
