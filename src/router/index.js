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
  {
    path: '/:pathMatch(.*)*', 
    redirect: '/', 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const productDetailsEmpty = store.state.productDetails.name === "";
  const purchaseDetailsEmpty = store.state.purchaseDetails.address === "";
  const paymentDetailsEmpty = store.state.paymentDetails.method === "";

  if (to.name === 'PurchaseCompleted' && (productDetailsEmpty && purchaseDetailsEmpty && paymentDetailsEmpty)) {
    next('/');
  } else if (to.name === 'Payment' && (productDetailsEmpty && purchaseDetailsEmpty)) {
    next('/');
  } else if (to.name === 'Delivery' && productDetailsEmpty) {
    next('/');
  } else if (to.name === 'Product' && productDetailsEmpty) {
    next('/');
  } else {
    next();
  }
});

export default router;
