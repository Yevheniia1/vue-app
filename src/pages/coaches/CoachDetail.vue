<template>
    <div class="container">
        <section class="p-shadow-3 p-d-flex p-flex-column p-m-2">
            <header class="p-d-flex p-jc-between">
                <div>
                    <h2>{{ fullName }}</h2> 
                    <p>${{ rate }}/hour</p>
                </div>
                <div class="coach-picture-container">
                    <p class="coach-picture-wrapper">
                        <img
                          :src="pictureLink"
                          :alt="fullName"
                          class="coach-picture">
                    </p>
                </div>
            </header>
        </section>
        <section class="p-shadow-3 p-d-flex p-flex-column p-m-2">
            <p>Interesed? Reach out now!</p>
            <LinkButton
              type="p-button-outlined"
              :to="contactLink"
              label="Contact" />

            <router-view v-slot="slotProps">
                <transition name="route" mode="out-in">
                    <component :is="slotProps.Component"></component>
                </transition>
            </router-view>
            
        </section>
        <section class="p-shadow-3 p-d-flex p-flex-column p-m-2">
            <ul class="coach-areas-list p-d-flex">
                <li
                v-for="area in areas"
                :key="area"
                class="p-mx-1">
                    <span class="p-tag p-tag-success">{{ area }}</span>
                </li>
            </ul>
            <p>{{ description }}</p>
        </section>  
    </div>
</template>

<script>
export default {
    props: ['id'],
    date() {
        return {
            coachSelected: null
        }
    },
    computed: {
        fullName() {
            return this.coachSelected.firstName + ' ' + this.coachSelected.lastName
        },
        rate() {
            return this.coachSelected.hourlyRate
        },
        areas() {
            return this.coachSelected.areas
        },
        description() {
            return this.coachSelected.description
        },
        pictureLink() {
            return this.coachSelected.picture
        },
        contactLink() {
            return '/coaches' + '/' + this.id + '/contact';
        }
    },
    created() {
        this.coachSelected = this.$store.getters['coaches/coaches'].find( 
            coach => coach.id === this.id
        );
    }
}
</script>

<style scoped>
    .container {
        width: 80%;
        max-width: 500px;
        margin: 0 auto;
    }

    .coach-picture-container {
        width: 100px;
    }
</style>