<template>
  <ModalContainer v-model="model">
    <h3>Test modal</h3>
    <br />
    <button @click="onConfirm()">Confirm</button>
  </ModalContainer>
</template>

<script setup>
import ModalContainer from "@/components/ModalContainer.vue";
import Button from "@/components/Button.vue";
const model = defineModel(false);

const onConfirm = () => {
  model.value = false;
};
</script>

<style lang="scss" scoped></style>
