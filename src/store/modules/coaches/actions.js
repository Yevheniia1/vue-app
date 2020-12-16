import axios from 'axios';

export default {

    async registration(context, data) {
        const userId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        let coachData = {
            firstName: data.firstName,
            lastName: data.lastName,
            hourlyRate: data.rate,
            areas: data.areas,
            description: data.desc,
            picture: data.picture
        }

        try {
            await axios.put(`https://newapp-b4422.firebaseio.com/coaches/${userId}.json?auth=` + token, coachData);
            coachData.id = userId;
            context.commit('addCoach', coachData)
        } catch(error) {
            throw new Error(error.message || 'Failed to send coach')
        }
    },
    async loadCoaches(context) {
        try {
            const response = await axios.get('https://newapp-b4422.firebaseio.com/coaches.json');
            const coachesData = response.data;
            const coaches = [];

            for(const key in coachesData) {
                const coach = {
                    id: key,
                    firstName: coachesData[key].firstName,
                    lastName: coachesData[key].lastName,
                    hourlyRate: coachesData[key].hourlyRate,
                    areas: coachesData[key].areas,
                    description: coachesData[key].description,
                    picture: coachesData[key].picture
                }

                coaches.push(coach)
            }

            context.commit('setCoaches', coaches)

        } catch(error) {
            throw new Error(error.message || 'Failed to fetch coaches')
        }
    }
}