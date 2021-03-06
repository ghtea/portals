import { call, select, put, getContext } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";

import axios from "axios";
import queryString from 'query-string';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsStack from "store/actions/stack";
import * as actionsPortal from "store/actions/portal";

//import * as actionsTheme from "../../actions/theme";




function* visitStack(action: actionsStack.type__VISIT_STACK) {
    
    try {
        const readyUser =  yield select( (state:StateRoot) => state.status.ready.user); 
        const idUserInApp =  yield select( (state:StateRoot) => state.auth.user?.id); 

        const listStack =  yield select( (state:StateRoot) => state.stack.listStack); 
        const stackVisiting = listStack.find((stack:actionsStack.Stack) => stack.id === action.payload.id)

        const stringSearching = action.payload.stringSearching;
        
        const {
            id,

            idUser,

            kind,
            name,

            listTag,
            listPortal,

            dateCreated,
            dateUpdated,
        } = stackVisiting;
        
        for (var i = 0; i < listPortal.length; i++){

            const idPortalEach = listPortal[i]['id'];
            yield put(actionsPortal.return__VISIT_PORTAL({
                id: idPortalEach,
                stringSearching: stringSearching
            }));
        }

        const date = Date.now();
        
        yield put(actionsStack.return__MANIPULATE_STACK({
            kind: 'update',
            draft: {
                dateVisited: date
            },
            id: id,
            idOwner: idUser,
        }));

    } catch (error) {
        
        console.log(error);
        console.log('visitStack has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'VisitStack_UnknownError__E'
        }) );
    }
}

export default visitStack;
