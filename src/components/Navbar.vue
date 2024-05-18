<template>
  <header class="header" id="header">
    <nav class="header__navbar container">
      <router-link
        :to="{
          name: 'Home',
        }"
        class="header__brand"
        >example site</router-link
      >
      <div class="header__menu" id="menu" v-if="isLoggedIn">
        <ul class="header__menu-list">
          <li class="header__menu-item">
            <router-link
              :to="{
                name: 'Home',
              }"
              class="header__menu-link"
              :class="{
                'header__menu-link--active': isActiveRoute('Home'),
              }"
            >
              <font-awesome-icon
                class="header__menu-icon"
                :icon="['fas', 'fa-house']"
              />
              <span class="header__menu-name">Home</span>
            </router-link>
          </li>
          <li class="header__menu-item">
            <router-link
              :to="{
                name: 'Chats',
              }"
              class="header__menu-link"
              :class="{
                'header__menu-link--active': isActiveRoute('Chats'),
              }"
            >
              <font-awesome-icon
                class="header__menu-icon"
                :icon="['fas', 'comment']"
              />
              <span class="header__menu-name">Chat</span>
            </router-link>
          </li>
          <li class="header__menu-item">
            <router-link
              :to="{
                name: 'PostsIndex',
              }"
              class="header__menu-link"
              :class="{
                'header__menu-link--active': isActiveRoute('PostsIndex'),
              }"
            >
              <font-awesome-icon
                class="header__menu-icon"
                :icon="['fas', 'pen-nib']"
              />
              <span class="header__menu-name">Posts</span>
            </router-link>
          </li>
          <li class="header__menu-item">
            <router-link
              :to="{
                name: 'ItemsIndex',
              }"
              class="header__menu-link"
              :class="{
                'header__menu-link--active': isActiveRoute('ItemsIndex'),
              }"
            >
              <font-awesome-icon
                class="header__menu-icon"
                :icon="['fas', 'cart-shopping']"
              />
              <span class="header__menu-name">Items</span>
            </router-link>
          </li>
          <li class="header__menu-item">
            <router-link
              :to="{
                name: 'EditProfile',
              }"
              class="header__menu-link"
              :class="{
                'header__menu-link--active': isActiveRoute('EditProfile'),
              }"
            >
              <font-awesome-icon
                class="header__menu-icon"
                :icon="['fas', 'user']"
              />
              <span class="header__menu-name">Account</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { axios } from "@/libs/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const navOpen = ref(false);
const isLoggedIn = ref(false);

const toggleNav = () => (navOpen.value = !navOpen.value);

const logout = async () => {
  try {
    await axios.post("/logout");
    router.push({ name: "SignIn" });
  } catch (error) {}
};

const route = useRoute();
const isActiveRoute = (routeName) => route.name === routeName;

onMounted(() => {
  // isLoggedIn.value = true;
});
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

.container {
  max-width: 75rem;
  height: auto;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 100;

  &__brand {
    font-family: "Poppins", sans-serif;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.15;
    color: var(--color-orange-800);
  }

  &__navbar {
    display: flex;
    justify-content: space-between;
    background-color: var(--color-white);
    align-items: center;
    width: 100%;
    height: 4rem;
    margin: 0 auto;
  }

  &__menu {
    position: fixed;
    left: 0;
    bottom: 0;
    display: grid;
    align-content: center;
    width: 100%;
    height: 5rem;
    padding: 0 1rem;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    background: var(--color-white);
    box-shadow: var(--shadow-medium);

    &-list {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    &-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: none;
      outline: none;
      color: var(--color-black);

      &--active {
        position: relative;
        color: var(--color-orange-800);
        transition: all 0.35s ease;
      }
    }

    &-icon {
      font-size: 1.35rem;
      line-height: 1;
      margin: 5px;
      color: inherit;
    }

    &-name {
      display: none;
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25;
      visibility: hidden;
      text-transform: capitalize;
      margin-bottom: 10px;
    }
  }
}

@media only screen and (min-width: 360px) {
  .header__menu-name {
    font-weight: 700;
    display: block;
    visibility: visible;
  }
}

@media only screen and (min-width: 576px) {
  .header__menu-list {
    justify-content: center;
    column-gap: 3rem;
  }
}

@media only screen and (min-width: 768px) {
  .header {
    background: var(--color-white);
    box-shadow: var(--shadow-medium);
    transition: all 0.35s ease-in-out;
  }

  .header__menu {
    position: relative;
    top: 0;
    right: 0;
    width: auto;
    height: auto;
    background: none;
    box-shadow: none;

    &-link {
      &--active::before {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        width: 2rem;
        height: 2px;
        border: none;
        outline: none;
        background: var(--color-orange-800);
      }

      &:hover {
        color: var(--color-orange-800);
        transition: all 0.35s ease;
      }
    }

    &-icon {
      display: none;
      visibility: hidden;
    }

    &-name {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5;
      margin-bottom: 0.2rem;
    }
  }
}
</style>
