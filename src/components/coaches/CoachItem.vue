<template>
    <div class="p-shadow-5 p-d-flex p-flex-column p-p-2 coach-card">
        <p class="coach-picture-wrapper">
            <img :alt="fullName" :src="picture" class="coach-picture">
        </p>
        <div class="p-p-2">
            <h3>{{ fullName }}</h3>
            <p class="p-text-bold coach-rate">${{ rate }}/hour</p>
        </div>
        <ul class="coach-areas-list p-d-flex">
            <li
              v-for="area in areas"
              :key="area"
              class="p-mx-1">
                <span class="p-tag p-tag-success">{{ area }}</span>
            </li>
        </ul>
        <div class="p-d-flex p-flex-column coach-card-btns">
            <router-link :to="coachContactLink" class="link-btn p-mb-2"><Button label="Contact" class="p-button-outlined" style="width:100%"/></router-link>
            <router-link :to="coachDetailsLink" class="link-btn"><Button label="View details" style="width:100%" /></router-link>
        </div>
    </div>
</template>

<script>

export default {
    props: ['id', 'firstName', 'lastName', 'rate', 'areas', 'picture'],
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName
        },
        coachContactLink() {
            return this.$route.path + '/' + this.id + '/contact'
        },
        coachDetailsLink() {
            return this.$route.path + '/' + this.id
        }
    }
}
</script>

<style>

    .coach-picture {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .coach-picture-wrapper {
        position: relative;
        padding-bottom: 100%;
        overflow: hidden;
        margin: 0;
    }

    .coach-card {
        height: 100%;
    }

    .coach-card-btns {
        margin-top: auto;
    }

    .coach-areas-list {
        list-style-type: none;
        margin: 0 0 1rem;
        padding: 0;

    }

</style>