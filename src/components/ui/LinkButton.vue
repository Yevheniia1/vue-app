<template>
    <router-link :to="to" class="link-btn">
        <Button :class="type" :label="label"/>
    </router-link>
</template>

<script>

export default {
    props: ['to', 'type', 'label']
}
</script>

<style scoped>
    .link-btn {
        text-decoration: none;
        width: 100%;
    }
</style>