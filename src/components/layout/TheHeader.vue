<template>
    <nav class="p-d-flex p-flex-wrap p-jc-between navigation">
        <h1 class="title"><router-link to="/" class="link-btn">Find a coach</router-link></h1>
        <TabMenu :model="items"/>
    </nav>
</template>

<script>
import TabMenu from 'primevue/tabmenu';

export default {
    components: {
        TabMenu
    },
    data() {
        return {
            items:[
                {
                    label: 'Coaches', 
                    icon: 'pi pi-fw pi-users', 
                    to: '/coaches'
                },
                {
                    label: 'Request', 
                    icon: 'pi pi-fw pi-envelope', 
                    to: '/requests',
                    visible: () => this.$store.getters.isAuthenticated
                },
                {
                    label: 'Login', 
                    icon: 'pi pi-fw pi-user', 
                    to: '/auth/login',
                    visible: () => !this.$store.getters.isAuthenticated
                },
                {
                    label: 'Logout', 
                    icon: 'pi pi-fw pi-user', 
                    // to: '/auth/login',
                    visible: () => this.$store.getters.isAuthenticated,
                    command: () => this.$store.dispatch('logout')
                },
            ]
        }
    }
}
</script>

<style lang="css">
    .navigation {
        padding: 1rem;

    }

    .title {
        margin: 0;
        display: flex;
        align-items: center;
        color:#0078d4;
    }
</style>