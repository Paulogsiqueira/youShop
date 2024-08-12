<template>
  <div class="delivery-form">
    <h1>Formulário de Compra</h1>
    <div class="delivery-content">
      <div class="user-form">
        <UserForm />
      </div>
      <div class="cart-card">
        <ResumeCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import UserForm from "@/components/userForm.vue";
import ResumeCard from "@/components/Cards/resumeCard.vue";
</script>
<style scoped>
.delivery-content {
  display: flex;
  width: 90%;
}
.cart-card {
  width: 25%;
}

.delivery-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.delivery-form h1 {
  color: #71c5a7;
  margin-bottom: 50px;
}

.user-form {
  padding: 2%;
  border: 2px solid #71c5a7;
  width: 70%;
  margin: 0 auto;
  background-color: white;
}

@media (max-width: 1000px) {
  .user-form {
    width: 60%;
  }

  .cart-card {
    width: 35%;
  }
}

@media (max-width: 860px) {
  .user-form {
    width: 80%;
  }

  .cart-card {
    width: 60%;
    margin-left: 2%;
    margin-top: 4%;
  }

  .delivery-content {
    flex-direction: column;
    align-items: center;
  }
}
</style>
