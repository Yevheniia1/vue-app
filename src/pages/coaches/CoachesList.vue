<template>
    <div>
        <section v-if="error.state">
            <Message severity="error">{{ error.msg }}</Message>
        </section>
        <section v-else class="p-d-flex p-jc-center p-flex-column">
            <div class="p-d-flex">
                <CoachFilter @set-filter="addFilter"/>
            </div>
            <div class="p-d-flex p-jc-between p-mt-4">
            <Button
                class="p-button-outlined p-mb-2"
                icon="pi pi-undo"
                @click="loadCoaches" />

            <LinkButton
                to="/register"
                label="Register as Coach"
                type="p-button-outlined p-mb-2"
                v-if="isLoggedIn && !isCoach && !isLoading" />

            <LinkButton
                to="/auth/login"
                label="Login"
                type="p-button-outlined p-mb-2"
                v-if="!isLoggedIn && !isLoading" 
                class="btn-login"/>
            </div>
            <ProgressSpinner v-if="isLoading"/>
            <ul v-else-if="!isLoading && hasCoaches" class="coachesList p-grid">
                <li v-for="coach in coaches" :key="coach.id" class="p-col-12 p-sm-6 p-lg-3">
                <CoachItem
                    :id="coach.id"
                    :firstName="coach.firstName"
                    :lastName="coach.lastName"
                    :rate="coach.hourlyRate"
                    :areas="coach.areas"
                    :picture="coach.picture" />
                </li>
            </ul>
            <h3 v-else>No coaches found.</h3>
        </section>
    </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
    data() {
        return {
            activeFilters: ['frontend', 'backend', 'career'],
            isLoading: true,
            error: {
                state: false,
                msg: null
            }
        }
    },
    components: {
         CoachItem, CoachFilter
    },
    created() {
        this.loadCoaches()
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated
        },
        coaches() {
            const coaches = this.$store.getters['coaches/coaches'];
            const filteredCoaches = new Set();
            this.activeFilters.forEach( filter => {
                coaches.forEach( coach => {
                    if(!coach.areas.includes(filter)) return false
                    filteredCoaches.add(coach)
                })
            })
            return [...filteredCoaches]
        },
        hasCoaches() {
            if(this.coaches.length === 0) return false
            return this.$store.getters['coaches/hasCoaches']
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach']
        }
    },
    methods: {
        addFilter(filters){
            this.activeFilters = filters
        },
        async loadCoaches() {
            this.isLoading = true
            try {
                await this.$store.dispatch('coaches/loadCoaches')
            } catch(error) {
                this.error.state = true
                this.error.msg = 'Something went wrong. Please try again later'
                console.log(error)
            }
            this.isLoading = false
        }
    },
}
</script>

<style lang="css">
    .p-orderlist {
        width: 100%;
    }
    .link-btn, 
    .link-btn:focus, 
    .link-btn:active {
        text-decoration: none;
        color:#0078d4;
    }

    .coachesList {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .coachItem {
        width: 47%;
    }

    .btn-login {
        width: auto!important;
    }
</style>