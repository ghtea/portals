import produce from 'immer';
import {handleActions} from 'redux-actions';

import * as actionsStatus from 'store/actions/status';

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';
//import defaultUsingColorAssignment from '../../styles/defaultUsingColorAssignment'


// https://react-etc.vlpt.us/07.typescript-redux.html

export type State = typeof stateInitial;



const stateInitial = {
  
  loading: {
    user: false,
    listPortal: false,
    listStack: false
  },
  
  ready: {
    user: false,
    listPortal: false,
    listStack: false
  },
  
  current: {
    
    language: '',   // en, ko, ja    , it should be blank at first check cookie first (call DETECT_LANGUAGE)
    
    
    theme: {
      option: 'always-light',
      name: 'light'
    },

    portal: {
        open: '',
        editing: '',
        addingToStack: '',
        sorting: {
            property: 'hp' as 'hp' | 'dateVisited', 
            direction: {
                hp: 'ascending' as 'ascending' | 'descending', 
                dateVisited: 'ascending' as 'ascending' | 'descending', 
            }
        },
        hiding: {
            inStacks: false,
        },
    },

    stack: {
        open: '',
        editing: '',
        sorting: {
            property: 'name' as 'name' | 'dateVisited', 
            direction: {
                name: 'ascending' as 'ascending' | 'descending', 
                dateVisited: 'ascending' as 'ascending' | 'descending', 
            }
        },
    },
  },
  
  showing: {

    nav: false,

    modal: {
        setting: false,
        myProfile: false,
        creatingPortal: false,
        editingPortal: false,
            
        addingPortalToStack: false,
        creatingStack: false,
        editingStack: false,

        searching: false,
    }
  }
  
  
};



const reducerStatus = handleActions<State, any>({
  
  [actionsStatus.name__REPLACE]: (statePrevious, action: actionsStatus.type__REPLACE) => {
    
    return produce(statePrevious, stateNew => {
      if (action.payload === undefined) { 
        return;
      }
      else {
        const listKey: (string | number)[] = action.payload.listKey;
        
        try { putValueToNestedObject(stateNew, listKey, action.payload.replacement); 
          
        }
        catch {
          return;
        }
        
      }
      
    });
  }
  
}, stateInitial);


export default reducerStatus;

// key??? ???????????? ???????????? list??? ???????????? object access ??????!
// https://medium.com/better-programming/4-ways-to-safely-access-nested-objects-in-vanilla-javascript-8671d09348a8

/*
const reducerStatus = (statePrevious: typeState = stateInitial, action: any): typeState => {
  switch (action.type) {
    
    case status.REPLACE:
      
      return produce(statePrevious, stateNew => {
        if (action.payload === undefined) { 
          return;
        }
        else {
          const listKey: string[] = action.payload.listKey;
          if (Array.isArray(listKey)) {
            
            console.log(stateNew);
            
            const location = listKey.reduce( (obj: any, key: string) => {
              return obj[key]; 
            }, stateNew);
            
          }
      }
      
    });
    
    
    default:
      return statePrevious;
  }
}

*/


/*
const statusReducer = handleActions({
  
  
  [status.REPLACE_STATUS]: (state, action) => {
    //console.log('hiiii');
    
    const location = action['payload']['location'] || [];
    
    if (!location || location.length === 0) {
      return state;
    }
    else {
      return state.setIn(location, Immutable.fromJS(action['payload']['replacement']) );
    }
    
  },
  
  
}, stateInitial);

*/







