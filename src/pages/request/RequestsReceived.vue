<template>
    <div>
        <section v-if="error.state">
            <Message severity="error">{{ error.msg }}</Message>
        </section>
        <section v-else>
            <header>
                <h2 class="p-text-center">Requests Received</h2>
            </header>
            <ProgressSpinner v-if="isLoading"/>
            <ul class="requests-list" v-else-if="hasRequests">
                <li v-for="request in requests" :key="request.id">
                <requestItem
                    :id="request.coachId"
                    :message="request.message"
                    :email="request.email" />
                </li>
            </ul>
            <h3 v-else>You haven't received any requests yet!</h3>
        </section>
    </div>
</template>


<script>
import requestItem from '../../components/requests/requestItem.vue'

export default {
    data() {
        return {
            isLoading: true,
            error: {
                state: false,
                msg: ''
            }
        }
    },
    components: {
        requestItem
    },
    created() {
        this.loadRequests()
    },
    computed: {
        requests() {
            return this.$store.getters['requests/getRequests']
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests']
        }
    },
     methods: {
        async loadRequests() {
            this.isLoading = true
            try {
                await this.$store.dispatch('requests/loadRequests')
            } catch(error) {
                this.error.state = true
                this.error.msg = 'Something went wrong. Please try again later'
                console.log(error)
            }
            this.isLoading = false
        }
     }
}
</script>

<style scoped>
    .requests-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
</style>