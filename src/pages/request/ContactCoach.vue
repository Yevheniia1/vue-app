<template>
    <form @submit.prevent="submitData" class="p-d-flex p-flex-column p-my-3">
        <span class="p-field p-my-2 p-d-flex p-flex-column">
            <label for="firstname" class="p-ml-1">Email</label>
            <InputText
                id="email"
                type="email"
                v-model.trim="email"/>
        </span>
        <span class="p-field p-my-1 p-d-flex p-flex-column">
            <label for="desc" class="p-m-1">Message</label>
            <Textarea
                v-model.trim="msg"
                :autoResize="true"
                rows="5"
                cols="30"
                id="desc" />
        </span>
        <small id="desc-help" class="p-invalid p-my-2" v-if="!formIsValidity"><i class="pi pi-times p-mr-2" style="font-size: 1em"></i>Please enter a valid email and non-empty message.</small>
        <Button type="submit" label="Submit" class="p-my-2"/>
    </form>
</template>

<script>

export default {
     data() {
         return {
            formIsValidity: true,
            email: '',
            msg: ''
        }
    },
    methods: {
        validateForm() {
            this.formIsValidity = true

            if(this.email === '' || this.msg === '' || !this.email.includes('@')) {
                this.formIsValidity = false
            } 
        },
         submitData() {
            this.validateForm()

            if(!this.formIsValidity) return

            this.$store.dispatch('requests/createRequest', {
                email: this.email,
                message: this.msg,
                id: this.$route.params.id
            })

            this.$router.replace('/requests')
         }
    }
}
</script>

<style scoped>
</style>