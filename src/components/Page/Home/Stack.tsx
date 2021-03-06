import React, {useCallback, useMemo, useState, useEffect} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsPortal from 'store/actions/portal';
import * as actionsStack from 'store/actions/stack';

import { History } from 'history';
import history from 'historyApp'
import useInput from 'tools/hooks/useInput';
import { FormattedMessage, useIntl } from 'react-intl';

import styles from './Stack.module.scss';
import stylesPortal from './Portal.module.scss';

import IconMove from 'svgs/basic/IconFourArrows';
import IconEdit from 'svgs/basic/IconEdit';
import IconLayerPlus from 'svgs/basic/IconLayerPlus';

import IconStackEnter from 'svgs/others/IconPortalEnter';
import IconLinkExternal from 'svgs/basic/IconLinkExternal';


type PropsStack = {
    stack: actionsStack.Stack 
};

function Stack({
    stack
}: PropsStack) {
    
    const {
        id,
        idUser,   //  normal, search

        kind,    
        name: nameRaw,

        listTag,
        listIdPortalManual,
        listPortal: listPortalInThisStack,

        dateCreated,
        dateUpdated, 
        dateVisited,
    } = stack;

    const dispatch = useDispatch();

    const idStackOpen = useSelector((state: StateRoot) => state['status']['current']['stack']['open']);
    const listPoratlAll = useSelector((state: StateRoot) => state.portal.listPortal);

    const [open, setOpen] = useState(false); 

    const intl = useIntl();

    const inputSearch = useInput('');


    useEffect(()=>{
        if(idStackOpen !== id){
            setOpen(false);
        }
    },[idStackOpen]); 

    const onClick_Portal = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            const idPortal = event.currentTarget.getAttribute('data-idPortal') || '';
            dispatch(actionsPortal.return__VISIT_PORTAL({
                id: idPortal, 
                stringSearching: '',
            }));
        },[]
    );

    const [isIncludingSearching, setIsIncludingSearching] = useState(false);
    useEffect(()=>{
        for (const portal of listPortalInThisStack || []){
            if (portal?.kind === 'search') {
                setIsIncludingSearching(true);
            }
        }
    },[listPortalInThisStack])

    const stringVisitedLast = useMemo(()=>{
        const date = new Date(dateVisited); 

        var month = date.getUTCMonth() + 1; //months from 1-12
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();

        return `${year}.${month}.${day}`
    },[dateVisited]);

    const nameUsing = useMemo(()=>{
        if (kind === 'tag'){
            return listTag.join(', ');
        }
        else {
            return nameRaw;
        }
    },[kind, listTag, nameRaw]);

    const onClick_Face = useCallback(
        (side: string) => {
            if(open===false){
                setOpen(true);
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['current', 'stack', 'open'],
                    replacement: id
                }));
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['current', 'portal', 'open'],
                    replacement: ''
                }));
            }
            else {
                if (side === 'left') {
                    dispatch(actionsStack.return__VISIT_STACK({
                        id: id,
                        stringSearching: inputSearch.value
                    }));
                    setOpen(false);
                }
                else {  /// 'right'
                    setOpen(false);
                }
            }
        },[open, inputSearch, listIdPortalManual]
    );


    const onClick_Close = useCallback(
        () => {
            setOpen(false);
        },[]
    );

    const onClick_Action = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const {currentTarget: { value }} = event;
            if (value === 'edit'){
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['current', 'stack', 'editing'],
                    replacement: id
                }));
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['showing', 'modal', 'editingStack'],
                    replacement: true
                }));
            }
            else if (value === 'addToStack'){
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['current', 'stack', 'addingToStack'],
                    replacement: id
                }));
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['showing', 'modal', 'addingStackToStack'],
                    replacement: true
                }));
            }
        },[id, idUser]
    );
    

  return (
      
    <div className={`${styles['root']} ${stylesPortal['root']} open----${open} hue----grey`} >

        <div 
            className={`${stylesPortal['outside']}`} 
            onClick={()=>onClick_Close()}
        />

        <div className={`${styles['stack']} ${stylesPortal['portal']}`} >

            <div 
                className={`${stylesPortal['face']}`}
            >   
                <div 
                    className={`${stylesPortal['left']}`}
                    onClick={()=>onClick_Face('left')}
                >   
                    <div className={`${styles['icon']} number-portal----${listPortalInThisStack?.length}`} >
                        {listPortalInThisStack?.map((portal, index)=>{
                            const id = portal?.id
                            const hue = portal?.hue
                            return (
                                <div 
                                    key={`icon-in-stack-${index}`}
                                    className={`${styles['icon-of-each-portal']} hue----${hue}`}
                                />
                            )
                        })}
                    </div>
                    <div> <IconLinkExternal className={`${stylesPortal['icon-link-external']}`} kind='solid' /> </div>
                </div>
    
                <div 
                    className={`${stylesPortal['right']}`}
                    onClick={()=>onClick_Face('right')}
                >
                    <div className={`${stylesPortal['name']}`} > {nameUsing } </div> 
                    <div> Close </div>
                </div>

            </div>
            
            
            <div className={`${stylesPortal['body']}`}>

                { isIncludingSearching &&
                    <div className={`${stylesPortal['search']}`} >
                        <input type='text' value={inputSearch.value} onChange={inputSearch.onChange}/>
                    </div>
                }

                <div className={`${stylesPortal['name']}`} >   
                    <div> {nameUsing}</div>
                </div>

                <div className={`${stylesPortal['empty']}`} >   
                </div>

                <div className={`${stylesPortal['actions']}`}>
                    
                    <button 
                        value='edit'
                        onClick={onClick_Action}
                    >   <IconEdit className={`${stylesPortal['icon-edit']}`} kind='light' />
                    </button>

                </div>

                <div className={`${stylesPortal['others']}`}>

                    <ul className={`${styles['collection-portal']}`}>
                        {listPortalInThisStack?.map((portal, index)=>{
                            const id = portal?.id
                            const hue = portal?.hue
                            return (
                                <li
                                    key={`portal-${index}`}
                                    className={`${styles['portal']}`}
                                >
                                <a
                                    data-idPortal={id}
                                    onClick={onClick_Portal}
                                > 
                                    <div><div  className={`${styles['icon-of-each-portal']} hue----${hue}`} /> </div> 
                                    <div className={`${styles['name-of-each-portal']}`}> {portal?.name} </div>
                                </a>
                                </li>
                            )
                        })}
                    </ul>

                    <div
                        className={`${stylesPortal['last-visit']}`}
                    >  <div> {dateVisited && `last visit ${stringVisitedLast}`} </div>
                    </div>                   

                </div>

            </div>

        </div>

    </div>
      
  );
}

export default Stack;

/*
<Route path="/sign-up" >
            <SignUp />
          </Route>
          <Route path="/log-in" >
            <LogIn />
          </Route>
*/

