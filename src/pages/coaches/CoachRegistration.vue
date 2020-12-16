<template>
    <section>
        <h1>Register as a coach now!</h1>
        <CoachForm @set-data="registration" />
    </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
    components: {
        CoachForm
    },
    methods: {
        registration(data) {
            this.$store.dispatch('coaches/registration', data)
            this.$router.replace('/coaches')
        }
    }
}
</script>
