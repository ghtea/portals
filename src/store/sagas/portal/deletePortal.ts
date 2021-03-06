import { call, select, put, getContext } from "redux-saga/effects";
import { firebaseFirestore, firebaseStorage } from "firebaseApp";

import axios from "axios";
import queryString from 'query-string';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsStatus from "store/actions/status";
import * as actionsNotification from "store/actions/notification";

import * as actionsPortal from "store/actions/portal";
//import * as actionsTheme from "../../actions/theme";





const requestDeletePortal = (id:string) => {
    return firebaseFirestore.collection("Portal_").doc(id).delete();
};
const requestDeleteImageIcon = (urlImageIcon:string) => {
    console.log(urlImageIcon);
    return firebaseStorage.refFromURL(urlImageIcon).delete()
}

function* deletePortal(action: actionsPortal.type__DELETE_PORTAL) {

    const readyUser =  yield select( (state:StateRoot) => state.status.ready.user); 
    const idUserInApp =  yield select( (state:StateRoot) => state.auth.user?.id); 
    
    const { id, idUser, urlImageIcon} = action.payload;
    
    try {

        if (!readyUser){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        }
        else if (idUser !== idUserInApp){
            yield put(actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: 'Portal_NotOwner__E'
                }));        }
        else {
            
            try {
                

                yield call( requestDeletePortal , id );

                
                if (urlImageIcon) {
                    yield call( requestDeleteImageIcon , urlImageIcon );
                }
                

                // dont forget these!!!
                yield put(actionsStatus.return__REPLACE({
                    listKey: ['showing', 'modal', 'editingPortal'], 
                    replacement: false
                }));            
                yield put(actionsStatus.return__REPLACE({
                    listKey: ['current', 'portal', 'editing'], 
                    replacement: ''
                })); 

                yield put(actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: 'DeletePortal_Succeeded__S'
                }));   
                yield put(actionsPortal.return__GET_LIST_PORTAL({
                    idUser: idUserInApp,
                    triggeringCheckAllPortals: false,
                }));
            
            }

            catch (error){ 
                
                console.log(error);
                console.log('error occurred in firebase server')
                yield put( actionsNotification.return__ADD_DELETE_BANNER({
                    codeSituation: 'DeletePortal_UnknownError__E'
                }) );
            }
              
        }

    } catch (error) {
        
        console.log(error);
        console.log('deletePortal has been failed');
        
        yield put( actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: 'DeletePortal_UnknownError__E'
        }) );
    }
}


export default deletePortal;
