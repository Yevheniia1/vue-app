import axios from 'axios';

export default {
    async createRequest(context, payload) {
        const userId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const newRequest = {
            coachId: userId,
            email: payload.email,
            message: payload.message
        }
        try {
            const response = await axios.post(`https://newapp-b4422.firebaseio.com/requests/${userId}.json?auth=` + token, {
                email: payload.email,
                message: payload.message
            })
            newRequest.id = response.data.name;
            context.commit('addRequest', newRequest)
        } catch(error) {
            throw new Error(error.message || 'Failed to send request')
        }
    },
    async loadRequests(context) {
        const userId = context.rootGetters.userId;

        try {
            const response = await axios.get(`https://newapp-b4422.firebaseio.com/requests/${userId}.json`);
            const requestsData = response.data;
            const requests = [];

            for(let key in requestsData) {
                const request = {
                    id: key,
                    coachId: userId,
                    email: requestsData[key].email,
                    message: requestsData[key].message
                }

                requests.push(request)
            }

            context.commit('setRequests', requests)
        } catch(error) {
            throw new Error(error.message || 'Failed to fetch requests')
        }
    }
}