import axios from 'axios';

export default {
    async auth(context, payload) {
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANZpqxEsbrteOTbVyFHF0Z3Ocn7LZfGUI';

        if(payload.mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANZpqxEsbrteOTbVyFHF0Z3Ocn7LZfGUI'
        }

        axios.interceptors.response.use(
            res => res,
            err => {
              if (err.response.status === 400) {
                throw new Error(`Authentication error`);
              }
              throw err;
            }
          );
 
        const { data } = await axios.post(url, 
            {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })


        localStorage.setItem('data', data.idToken)

        context.commit('setUser', {
            userId: data.localId,
            token: data.idToken,
            tokenExpiration: data.expiresIn
        })   
    },
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    logout(context) {
        context.commit('setUser', {
            token: null,
            userId: null, 
            tokenExpiration: null
        })
    }
}