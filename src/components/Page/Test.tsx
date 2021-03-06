import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";

import * as actionsStatus from 'store/actions/status';
import * as actionsAuth from 'store/actions/auth';

import * as actionsNotification from 'store/actions/notification';

import styles from './Test.module.scss';



type PropsTest = {};

function Test({}: PropsTest) {
  
    const dispatch = useDispatch();     


    const onClick_AddTestingBanner = useCallback(
        (codeSituation:string) => {
        dispatch(actionsNotification.return__ADD_DELETE_BANNER({
            codeSituation: codeSituation
        }) );
        }, []
    );

    useEffect( ()=>{

        const root = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL_BACK}/portal/`);
                alert(JSON.stringify(res.data, null,4));
                console.log(res.data);
            }
            catch (error){
                alert(JSON.stringify(error, null,4));
                console.log(error);
            }

            //alert(res.data);
        }
        root();
        
    },[]);


  const onClick_TestAxios = useCallback(
    async () => {

        const bodyRequest = {
            email: 's', 
            password: 's'
        };

        try {
            const res = await fetch(`${process.env.REACT_APP_URL_BACK}/auth/log-in`, {
                method: 'POST', // or 'PUT'
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyRequest)
            })
            
            // console.log(codeSituation);
            console.log(res.json())
            alert(res.json());

        }
        catch(error) {
            alert(error);
        }
        

    }, []
  );
  
  return (

    <div className={`${styles['root']}`} >
        <div className={`${styles['content']}`} >


        <div className={`${styles['search']}`}>
            <input type='text' />
        </div>

        <div>
            <FormattedMessage id={`Page.Test_Welcome`} />
        </div>
        
        <div> 
          <button
            onClick={event=>onClick_AddTestingBanner('Test1__S')}
          > test 1 
          </button>
        </div>
        
        <div> 
          <button
            onClick={event=>onClick_AddTestingBanner('Test2__H')}
          > test 2 
          </button>
        </div>

        <div> 
          <button
            onClick={event=>onClick_TestAxios()}
          > test axios 
          </button>
        </div>


        </div>
    </div>
  );
}

Test.defaultProps = {};

export default Test;

