<template>
    <TheHeader />
    <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
   </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
export default {
    components: {
        TheHeader
    },
    props: ['slotProps']
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap");

    * {
    box-sizing: border-box;
    }

    html {
    font-family: "Roboto", sans-serif;
    }

    section {
        padding: 1rem;
    }

    a {
        color: #0078D4;
        text-decoration: none;
    }
  
    .route-enter-from {
    opacity: 0;
    transform: translateY(-20px);
    }

    .route-leave-to {
    opacity: 0;
    transform: translateY(20px);
    }

    .route-enter-active {
    transition: all 0.3s ease-out;
    }

    .route-leave-active {
    transition: all 0.3s ease-in;
    }

    .route-enter-to,
    .route-leave-from {
    opacity: 1;
    transform: translateY(0);
    }

    .p-progress-spinner {
        display: block!important;
    }


</style>