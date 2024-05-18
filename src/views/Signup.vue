<template>
  <section class="sign-up">
    <div class="sign-up__container">
      <div class="sign-up__form-container">
        <div class="sign-up__form-content">
          <form class="sign-up__form" @submit.prevent="signUp">
            <div class="sign-up__profile-image-container">
              <div class="sign-up__profile-image-wrapper">
                <img
                  class="sign-up__profile-image"
                  :src="profileImage || '/user-circle.svg'"
                  alt="profile image"
                />
                <div
                  class="sign-up__profile-image-overlay"
                  @click="openFilePicker"
                >
                  <font-awesome-icon
                    :icon="['fas', 'arrow-up-from-bracket']"
                    class="sign-up__icon"
                  />
                  <input
                    type="file"
                    ref="fileInputRef"
                    style="display: none"
                    accept="image/png, image/jpeg"
                    @change="handleFileSelect"
                  />
                </div>
              </div>
            </div>
            <div class="sign-up__field">
              <label for="username" class="sign-up__label">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                class="sign-up__input"
                placeholder="Jason"
                v-model="username"
                required
              />
            </div>
            <div class="sign-up__field">
              <label for="email" class="sign-up__label">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                class="sign-up__input"
                placeholder="jason@example.com"
                v-model="email"
                required
              />
            </div>
            <div class="sign-up__field">
              <label for="password" class="sign-up__label">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                class="sign-up__input"
                placeholder="••••••••"
                v-model="password"
                :autocomplete="false"
                required
              />
            </div>
            <div class="sign-up__field">
              <label for="confirm-password" class="sign-up__label"
                >Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                class="sign-up__input"
                placeholder="••••••••"
                v-model="confirmPassword"
                :autocomplete="false"
                required
              />
              <p class="sign-up__error" v-if="isPasswordMismatched">
                Please make sure your passwords match.
              </p>
            </div>
            <button type="submit" :disabled="isSubmitting" class="button">
              Submit
            </button>
            <p class="sign-up__login-link">
              You already have an account?
              <router-link
                class="sign-up__login-link--highlight"
                :to="{
                  name: 'SignIn',
                }"
              >
                Login here
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { axios } from "@/libs/axios";
import { ref, watch } from "vue";
import { useToastHelper } from "@/utils/toast";
import { useRouter } from "vue-router";
import Button from "@/components/Button.vue";

const router = useRouter();
const { showErrorToast, showSuccessToast } = useToastHelper();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const profileImage = ref("");
const isSubmitting = ref(false);

const signUp = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    await axios.post(`/signup`, {
      user_name: username.value,
      user_email: email.value,
      password: password.value,
      profile_image: profileImage.value,
    });
    showSuccessToast("User created!");
    router.push({
      name: "Home",
    });
  } catch {
    showErrorToast("Error");
  } finally {
    isSubmitting.value = false;
  }
};

const fileInputRef = ref();

const openFilePicker = () => {
  fileInputRef.value.click();
};

const handleFileSelect = (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result;
      profileImage.value = base64Data;
    };

    reader.readAsDataURL(selectedFile);
  }
};
</script>

<style scoped lang="scss">
$form-container-bg-color: white;
$form-input-label-color: black;
$form-input-bg-color: white;
$form-input-bg-color: white;
$form-input-placeholder-color: black;

.sign-up {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    margin: 0 auto;
  }

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    font-size: 2.25rem;
    font-weight: 600;
    color: $form-input-label-color;
    font-family: "Rubik", sans-serif;
  }

  &__logo {
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
  }

  &__title {
    color: $form-input-label-color;
  }

  &__form-container {
    width: 100%;
    border-radius: 0.5rem;
    max-width: 40rem;
  }

  &__form-content {
    padding: 1.5rem 1.5rem 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__heading {
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    color: $form-input-label-color;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
  }

  &__profile-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__profile-image-wrapper {
    position: relative;
    width: 6rem;
    height: 6rem;
  }

  &__profile-image {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }

  &__profile-image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.5s;
  }

  &__profile-image-overlay:hover {
    transition: background-color 0.5s;
    background-color: rgba(0, 0, 0, 0.3);
  }

  &__icon {
    display: none;
  }

  &__profile-image-overlay:hover .sign-up__icon {
    display: flex;
    height: 30px;
    color: $form-input-label-color;
    transition: color 0.5s;
    color: white;
  }

  &__file-input {
    display: none;
  }

  &__field {
    margin-bottom: 1rem;
  }

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: $form-input-label-color;
  }

  &__input {
    width: 100%;
    padding: 0.625rem;
    font-size: 0.875rem;
    border-radius: 0.375rem;
    border: 1px solid #4a4a4a;
    background-color: $form-input-bg-color;
    color: $form-input-label-color;
  }

  &__input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25);
  }

  &__error {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: #f87171;
  }

  &__submit-button {
    width: 100%;
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    background-color: #2563eb;
    color: $form-input-label-color;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  &__submit-button:hover {
    background-color: #1d4ed8;
  }

  &__submit-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &__login-link {
    font-size: 0.875rem;
    font-weight: 300;
    color: #9ca3af;
  }

  &__login-link--highlight {
    font-weight: 500;
    color: #2563eb;
    cursor: pointer;
    transition: color 0.2s;
  }

  &__login-link--highlight:hover {
    color: #1d4ed8;
  }
}
.button {
  width: 150px;
  min-width: fit-content;
  appearance: none;
  background-color: var(--color-orange-800);
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;

  &:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
  }

  &:hover {
    background-color: var(--color-orange-800);
  }

  &:focus {
    box-shadow: var(--color-orange-900);
    outline: none;
  }

  &:disabled {
    background-color: var(--color-orange-300);
    border-color: rgba(27, 31, 35, 0.1);
    color: rgba(255, 255, 255, 0.8);
    cursor: default;
  }

  &:active {
    background-color: var(--color-orange-900);
    box-shadow: rgba(20, 70, 32, 0.2) 0 1px 0 inset;
  }
}
</style>
