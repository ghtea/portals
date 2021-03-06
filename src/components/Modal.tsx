import React, {useCallback} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import Setting from "./Modal/Setting";
import MyProfile from "./Modal/MyProfile";
import CreatingPortal from "./Modal/CreatingPortal";
import EditingPortal from "./Modal/EditingPortal";
import AddingPortalToStack from "./Modal/AddingPortalToStack";

import CreatingStack from "./Modal/CreatingStack";
import EditingStack from "./Modal/EditingStack";

import Searching from "./Modal/Searching";

// import styles from './Modal.module.scss';


type PropsModal = {};

function Modal({}: PropsModal) {
  
    const showingSetting = useSelector((state: StateRoot) => state['status']['showing']['modal']['setting']);
    const showingMyProfile = useSelector((state: StateRoot) => state['status']['showing']['modal']['myProfile']); 
    const showingCreatingPortal = useSelector((state: StateRoot) => state['status']['showing']['modal']['creatingPortal']);
    const showingEditingPortal = useSelector((state: StateRoot) => state['status']['showing']['modal']['editingPortal']);

    const showingAddingPortalToStack = useSelector((state: StateRoot) => state['status']['showing']['modal']['addingPortalToStack']);
    const showingCreatingStack = useSelector((state: StateRoot) => state['status']['showing']['modal']['creatingStack']);
    const showingEditingStack = useSelector((state: StateRoot) => state['status']['showing']['modal']['editingStack']);

    const showingSearching = useSelector((state: StateRoot) => state['status']['showing']['modal']['searching']);


    return (        
        <>
            {showingSetting && <Setting />}
            {showingMyProfile && <MyProfile />}
            {showingCreatingPortal && <CreatingPortal />}
            {showingEditingPortal && <EditingPortal />}

            {showingAddingPortalToStack && <AddingPortalToStack />}
            {showingCreatingStack && <CreatingStack />}
            {showingEditingStack && <EditingStack />}


            {showingSearching && <Searching />}
        </>
    );
}

export default Modal;

/*
<Route path="/sign-up" >
            <SignUp />
          </Route>
          <Route path="/log-in" >
            <LogIn />
          </Route>
*/

