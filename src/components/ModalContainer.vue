<template>
  <VueFinalModal
    v-model="model"
    class="modal"
    content-class="modal__content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <slot />
  </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from "vue-final-modal";

const model = defineModel(false);
</script>

<style lang="scss">
.modal {
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    text-align: center;
    align-items: center;
    width: 335px;
    padding: 25px 15px;
    min-width: fit-content;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 0.5rem;
  }
}
</style>
