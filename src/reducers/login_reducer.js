export default function (state = null, action) {
    switch (action.type) {
        case 'LOGIN_CLICKED':
            return action.payload.data.response;
    }
    return state;
}
