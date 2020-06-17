export const actionTypes = {
    CHANGE_STATE: 'CHANGE_STATE',
    SET_STATE: 'SET_STATE',
    NAVIGATE_TO: 'NAVIGATE_TO',
    SET_SESSION: "SET_SESSION",
    ADD_SESSION: "ADD_SESSION",
    REMOVE_SESSION: "REMOVE_SESSION"
}

const DEFAULT_STATE = {
    domremove: "",
    domadd: "",
    modal: false,
    actual_session: {
        name: "",
        asaltos: 1,
        descanso: 60,
        combate: 240,
        get_ready:0,
        sounds_preaviso:5,
        sounds_asalto:0,
        sounds_descanso:4,
        sounds_fincombate:1,
        
    },
    location: "main",
    sessions: {
        standar: {
            name: "standar",
            asaltos: 4,
            descanso: 60,
            combate: 240
        },
        training: {
            name: "training",
            asaltos: 6,
            descanso: 30,
            combate: 120
        },
        combate: {
            name: "combate",
            asaltos: 3,
            descanso: 60,
            combate: 180
        }
    },
};

//ACTIONS ///////////////////////////////////////////////////////
export const actions = {
    changeState(key, value) {
        return {
            type: actionTypes.CHANGE_STATE,
            payload: { key, value },
        };
    },
    setState(key, value) {
        return {
            type: actionTypes.SET_STATE,
            payload: { key, value },
        };
    },
    navigateTo(target) {
        return {
            type: actionTypes.NAVIGATE_TO,
            payload: target
        };
    },

    setSession(a) {
        console.log("aqui si",a)
        return {
            type: actionTypes.SET_SESSION,
            payload: a
        };
    },
    addSession(a) {
        return {
            type: actionTypes.ADD_SESSION,
            payload: a
        };
    },
    removeSession(a) {
        return {
            type: actionTypes.REMOVE_SESSION,
            payload: a
        };
    }
}

//REDUCER ///////////////////////////////////////////////////////
export default function reducer(state = DEFAULT_STATE, action) {

    const check_session = (mysesion) => {
        for (var propt in Object.keys(state.sessions)) {
            let temp = Object.keys(state.sessions)[propt];
            if (mysesion.asaltos == state.sessions[temp].asaltos &&
                mysesion.combate == state.sessions[temp].combate &&
                mysesion.descanso == state.sessions[temp].descanso
            ) {
                return temp;
            }
        }
        return false
    }
    switch (action.type) {
        case actionTypes.CHANGE_STATE:
            let session_name = check_session({ ...state.actual_session, [action.payload.key]: action.payload.value + state.actual_session[action.payload.key] });
            return {
                ...state,
                actual_session: { ...state.actual_session, name: session_name, [action.payload.key]: action.payload.value + state.actual_session[action.payload.key] }
            }
        case actionTypes.SET_STATE:
            console.log("cambio ",action.payload.key,action.payload.value)
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        case actionTypes.NAVIGATE_TO:
            return {
                ...state,
                location: action.payload
            }
        case actionTypes.SET_SESSION:
            console.log( "set ",action.payload)
            let carga =action.payload

           return {
                ...state,
                actual_session:action.payload,
            }
        case actionTypes.ADD_SESSION:

            return {
                ...state,
                sessions: {
                    ...state.sessions,
                    [action.payload]: { ...state.actual_session, name: action.payload }
                }
            }
        case actionTypes.REMOVE_SESSION:
            //   const filtrado = state.sessions.filter((s)=> s!= state.sessions[action.payload]) ;

            const filtered = state.sessions;
            delete filtered[action.payload];
            return {
                ...state,
                sessions: filtered
            }

        default:
            return state;
    }
}