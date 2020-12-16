<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    data() {
        return {
            isLoading: false,
            error: null
        }
    },
    methods: {
        addLoader() {
            this.isLoading = true
        },
        addError(err) {
            this.error = err || 'An error occured.'
        }
    }
}
</script>

<style scoped>
 
</style>