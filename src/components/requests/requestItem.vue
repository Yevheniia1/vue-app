<template>
    <Card class="request-card">
        <template #title>
            <a :href="emailLink" class="request-card-link">{{email}}</a>
        </template>
        <template #content>
            <p class="request-card-message">{{message}}</p>
        </template>
    </Card>
</template>

<script>
import Card from 'primevue/card';

export default {
    components: {
        Card
    },
    props: ['id', 'message', 'email'],
    computed: {
        emailLink() {
            return 'mailto:' + this.email
        }
    }
    
}
</script>

<style scoped>
    .request-card {
        width: 90%;
        max-width: 700px;
        margin: 0 auto;
    }

    .request-card-link {
        text-decoration: none;
        color: #0078D4;
        font-size: 1.1rem;
    }

    .request-card-message {
        margin: 0;
    }
</style>