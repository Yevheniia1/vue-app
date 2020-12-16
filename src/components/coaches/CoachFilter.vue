<template>
    <div class="container">
        <span class="input-field">
            <Checkbox id="frontend" name="area" value="frontend" v-model="areas" @change="$emit('set-filter', areas)"/>
            <label for="frontend">Frontend</label>
        </span>
        <span class="input-field">
            <Checkbox id="backend" name="area" value="backend" v-model="areas" @change="$emit('set-filter', areas)"/>
            <label for="backend">Backend</label>
        </span>
        <span class="input-field">
            <Checkbox id="career" name="area" value="career" v-model="areas" @change="$emit('set-filter', areas)"/>
            <label for="career">Career</label>
        </span>
    </div>
</template>

<script>

export default {
    data() {
        return {
            areas: ['frontend', 'backend', 'career']
        }
    },
    emits: ['set-filter']
}
</script>

<style scoped>
    .input-field {
        margin: 0 .5rem;
    }

    .input-field:first-child {
        margin-left: 0;
    }

    .input-field:last-child {
        margin-left: 0;
    }

    label {
        margin-left: .5rem;
    }

    .container {
        border-bottom: 1px solid #ccc;
        width: 100%;
        padding: 1.5rem 0;
    }
</style>