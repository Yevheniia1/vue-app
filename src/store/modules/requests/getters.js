export default {
    getRequests(state, getters, rootState, rootGetters) {
        const userId = rootGetters.userId;
        return state.requests.filter( req => req.coachId === userId)
    },
    hasRequests(state, getters, rootState, rootGetters) {
        const userId = rootGetters.userId;
        const requests = state.requests.filter( req => req.coachId === userId)
        return requests && requests.length > 0
    }
}