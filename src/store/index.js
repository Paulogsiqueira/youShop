import { createStore } from "vuex";

export default createStore({
  state: {
    productDetails: {
      name: "",
      description: "",
      price: 0,
      code: 0
    },
    purchaseDetails: {
      freight: 0,
      address: "",
      city: "",
      state: "",
      cep: "",
      number: "",
      complement: "",
    },
    paymentDetails:{
      method:"",
      titular: '',
      cpf: '',
      number: '',
      validity: '',
      code: '',
      portionItem: '',
    },
    orderCode: 0,
    purchaseComplete: false,
  },
  mutations: {
    SET_PAYMENT_DETAILS(state, payload) {
      state.paymentDetails = payload;
    },
    SET_PRODUCT_DETAILS(state, productDetails) {
      state.productDetails = productDetails;
    },
    updateFreight(state, newFreight) {
      state.purchaseDetails.freight = newFreight;
    },
    setOrderCode(state, newOrderCode) {
      state.orderCode = newOrderCode;
    },
    setPurchaseComplete(state, status) {
      state.purchaseComplete = status;
    },
    updatePurchaseDetails(state, details) {
      state.purchaseDetails = {
        ...state.purchaseDetails,
        ...details,
      };
    },
  },
  actions: {
    setProductDetails({ commit }, productDetails) {
      commit("SET_PRODUCT_DETAILS", productDetails);
    },
    updatePurchaseComplete({ commit }, status) {
      commit("setPurchaseComplete", status);
    },
    updateOrderCode({ commit }, status) {
      commit("setOrderCode", status);
    },
    updateFreight({ commit }, newFreight) {
      commit("updateFreight", newFreight);
    },
    updatePaymentDetails({ commit }, paymentDetails) {
      commit('SET_PAYMENT_DETAILS', paymentDetails);
    },
  },
});
