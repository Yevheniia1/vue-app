<template>
    <Dialog header="Error" v-if="!!error" class="dialog">
        <p>{{ error }}</p>
        <template #footer>
            <Button label="Ok" icon="pi pi-check" @click="handleError" autofocus />
        </template>
    </Dialog>
    <form class="p-flex p-fluid p-flex-column p-shadow-4 p-p-5 form-wrapper" @submit.prevent="submitForm">
        <h2>Login</h2>
        <div class="p-mb-2">
            <span class=" p-mt-4 p-float-label">
                <InputText
                id="email"
                type="email"
                v-model.trim="email.value"
                aria-describedby="email-help"
                @blur="clearValidity('email')"
                />
                <span class="decor-line"></span>
                <label for="firstname" class="p-ml-1">Email</label>
            </span>
            <small id="firstname-help" class="p-invalid" v-if="!email.isValid">Email must not be empty.</small>
        </div>
    
        <div class="p-mb-2">
            <span class="p-mt-4 p-float-label">
                <InputText
                    id="password"
                    type="password"
                    v-model.trim="password.value"
                    aria-describedby="password-help"
                    @blur="clearValidity('password')"
                    />
                <label for="password" class="p-ml-1">Password</label>
            </span>
            <small id="password-help" class="p-invalid" v-if="!password.isValid">Password must be at least 6 characters</small>
        </div>
         <div class="p-d-flex p-mt-4 p-align-center">
            <Button label="Login" type="submit" class="p-mt-3"/>
            <ProgressSpinner v-if="isLoading" class="p-ml-2" style="width:30px; height:30px"/>
         </div>
        <LinkButton to="/auth/registration" label="Signup" type="p-my-3 p-button-outlined" />
    </form>
</template>

<script>

export default {
    data() {
        return {
            password: {
                value: '',
                isValid: true
            },
            email: {
                value: '',
                isValid: true
            },
            formIsValid: true,
            isLoading: false,
            error: null
        }
    },
    components: {
    },
    methods: {
        validationForm(){
            this.formIsValid = true

            if(this.password.value.length <= 6) {
                this.password.isValid = false
                this.formIsValid = false 
            } if(!this.email.value.includes('@')){
                this.email.isValid = false
                this.formIsValid = false
            }
        },
        async submitForm() {
            this.validationForm()

            if(this.formIsValid) {

                this.isLoading = true;

                try {
                    await this.$store.dispatch('login', {
                        email: this.email.value,
                        password: this.password.value
                    })

                    this.$router.replace('/coaches')
                } catch (error) {
                    console.log(error + 'userLogin page')
                    this.error = error.message
                    console.log(this.error)
                }

                this.isLoading = false;
            }
        }, 
        clearValidity(input) {
            this[input].isValid = true
        },
        handleError() {
            this.error = null
        }
    }
}
</script>

<style scoped>
    /* form {
        background-color: black;
    }
    input {
        border: none;
        background-color: black;
    }

    .input-wrapper {
        width: 100%;
    }

    .input-wrapper:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(268.32deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 38.87%, #FFFFFF 60.53%, rgba(255, 255, 255, 0) 100%);
        right: 0;

    }

    .decor-line {
        width: 100%;
        display: block;
        background-image: linear-gradient(268.32deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 38.87%, #FFFFFF 60.53%, rgba(255, 255, 255, 0) 100%);
        height: 1px;
    }

    input:focus, input:active, input:hover {
        outline: none;
        border-color: transparent!important;
        box-shadow: none!important;
    } */
</style>