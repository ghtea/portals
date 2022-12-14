import React, { useCallback, useMemo, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsNotification from 'store/actions/notification';

import {Banner as TypeBanner} from 'store/reducers/notification';

import IconXCircle from 'svgs/basic/IconXCircle';

import IconSuccess from 'svgs/notification/IconSuccess';
import IconHint from 'svgs/notification/IconHint';
import IconError from 'svgs/notification/IconError';
import IconWarning from 'svgs/notification/IconWarning';


//import IconBanner from 'svgs/basic/IconBanner';

import styles from './Banner.module.scss';


type PropsBanner = {
    banner: TypeBanner
};


function Banner({
    banner
}: PropsBanner) {
  
  const dispatch = useDispatch();
  
  const onClick_DeleteBanner = useCallback(
    (id:string) => {
      dispatch(actionsNotification.return__DELETE_BANNER({
        id: id
      }) )
    }, []
  );
  
  
  // console.log(banner);
  
  return (
    
    <div className={`${styles['root']} ${styles[banner['kindSituation']]}`} >

        <div className={`${styles['left']}`}>
            {banner['kindSituation'] === 'success' &&  <IconSuccess className={`${styles['icon-success']}`}  /> }
            {banner['kindSituation'] === 'hint' &&  <IconHint className={`${styles['icon-hint']}`}  /> }
            {banner['kindSituation'] === 'error' &&  <IconError className={`${styles['icon-error']}`}  /> }
            {banner['kindSituation'] === 'warning' &&  <IconWarning className={`${styles['icon-warning']}`}  /> }
        </div>
            
        <div className={`${styles['middle']}`}>
            <div><FormattedMessage id={banner.idMessage} /> </div>
        </div>
      
        <div className={`${styles['right']}`}>
            <button className={`${styles['button-delete']}`} 
                onClick={()=>onClick_DeleteBanner(banner['id'])}
            >
                <IconXCircle className={`${styles['icon-x-circle']}`} kind={'light'}  />
                <IconXCircle className={`${styles['icon-x-circle']}`} kind={'solid'}  />
                
            </button>

        </div>
      
    </div>
  );
}

Banner.defaultProps = {
  
};

export default Banner;


/*
?????? ???????????? ???????????? ?????? ??? ????????? ?????????????????? ???????????? 

<Styled.Div__Banner_Guage
        className={banner['situation']}
        banner={banner}
      />
*/
