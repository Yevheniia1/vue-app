<template>
    <form class="p-grid p-fluid" @submit.prevent="submitForm">
        <span class="p-field p-my-2 p-col-5">
            <label for="firstname" class="p-ml-1">First Name</label>
           <InputText
              id="firstname"
              type="text"
              v-model.trim="firstName.value"
              aria-describedby="firstname-help"
              @blur="clearValidity('firstName')"
              :class="{'p-invalid': !firstName.isValid}" />
            <small id="firstname-help" class="p-invalid" v-if="!firstName.isValid">First Name must not be empty.</small>
        </span>

        <span class="p-field p-my-2 p-col-5">
            <label for="lastname" class="p-ml-1">Last Name</label>
            <InputText
              id="lastname"
              type="text"
              aria-describedby="lastname-help"
              :class="{'p-invalid': !lastName.isValid}"
              @blur="clearValidity('lastName')"
              v-model.trim="lastName.value" />
            <small id="lastname-help" class="p-invalid" v-if="!lastName.isValid">Last Name must not be empty.</small>
        </span>

        <span class="p-field p-my-2 p-col-2">
            <label for="hourlyrate" class="p-ml-1">Rate</label>
            <InputNumber
              id="hourlyrate"
              aria-describedby="hourlyrate-help"
              v-model.number="hourlyRate.value"
              :class="{'p-invalid': !hourlyRate.isValid}"
              @blur="clearValidity('hourlyRate')"
              :min="0"
              :max="100" />
            <small id="hourlyrate-help" class="p-invalid" v-if="!hourlyRate.isValid">Rate must be greater than 0</small>
        </span>

        <span class="p-field p-my-2 p-col-12">
            <label for="picture" class="p-ml-1">Picture</label>
            <InputText
              id="picture"
              type="url"
              aria-describedby="picture-help"
              @blur="clearValidity('picture')"
              :class="{'p-invalid': !picture.isValid}"
              v-model.trim="picture.value" />
            <small id="picture-help" class="p-invalid" v-if="!desc.isValid">Picture must be url.</small>
        </span>

        <span class="p-field p-my-1 p-col-12">
            <label for="desc" class="p-m-1">Description</label>
            <Textarea
              aria-describedby="desc-help"
              v-model.trim="desc.value"
              :autoResize="true"
              :class="{'p-invalid': !desc.isValid}"
              @blur="clearValidity('desc')"
              rows="5"
              cols="30"
              id="desc" />
            <small id="desc-help" class="p-invalid" v-if="!desc.isValid">Description must not be empty.</small>
        </span>

        <div class="container p-col-12">
            <h3>Areas of Expertise</h3>
            <div class="p-d-flex p-flex-column">
                <span class="p-my-2">
                    <Checkbox id="frontend" name="area" value="frontend" v-model="areas.value"/>
                    <label for="frontend" class="p-ml-2">Frontend Development</label>
                </span>
                <span class="p-my-2">
                    <Checkbox id="backend" name="area" value="backend" v-model="areas.value"/>
                    <label for="backend" class="p-ml-2">Backend Development</label>
                </span>
                <span class="p-my-2">
                    <Checkbox id="career" name="area" value="career" v-model="areas.value"/>
                    <label for="career" class="p-ml-2">Career Advisory</label>
                </span>
            </div>
            <small id="areas-help" class="p-invalid" v-if="!areas.isValid">At least one expertise must be selected.</small>
        </div>
        <Button label="Register" type="submit" class="p-m-2"/>
    </form>
</template>

<script>
export default {
    data() {
        return {
            firstName: {
                value: '',
                isValid: true
            },
            lastName: {
                value: '',
                isValid: true
            },
            hourlyRate: {
                value: null,
                isValid: true
            },
            desc: {
                value: '',
                isValid: true
            },
            areas: {
                value: [],
                isValid: true
            },
            picture: {
                value: '',
                isValid: true
            },
            isValid: true
        }
    },
    methods: {
        clearValidity(input) {
            this[input].isValid = true
        },
        validateData() {
            this.isValid = true

            if(this.firstName.value === ''){
                this.firstName.isValid = false
                this.isValid = false
            } 
            if(this.lastName.value === ''){
                this.lastName.isValid = false
                this.isValid = false
            } 
            if(this.desc.value === ''){
                this.desc.isValid = false
                this.isValid = false
            }
            if(this.areas.value.length === 0){
                this.areas.isValid = false
                this.isValid = false
            } 
            if(this.picture.value === ''){
                this.picture.isValid = false            
                this.isValid = false
            } 
            if(this.hourlyRate.value < 0 || this.hourlyRate.value === null){
                this.hourlyRate.isValid = false
                this.isValid = false
            }
        },
        submitForm() {
            this.validateData();

            if(!this.isValid) return 

            const data = {
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                rate: this.hourlyRate.value,
                desc: this.desc.value,
                areas: this.areas.value,
                picture: this.picture.value
            }

            this.$emit('set-data', data)
        }
    }
}
</script>

<style scoped>
</style>