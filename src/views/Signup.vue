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
                  :src="profileImage || '/user.png'"
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
                </div>
                <input
                  type="file"
                  ref="fileInputRef"
                  class="sign-up__file-input"
                  accept="image/png, image/jpeg"
                  @change="handleFileSelect"
                />
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
            <button
              type="submit"
              :disabled="isSubmitting"
              class="sign-up__submit-button"
            >
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
