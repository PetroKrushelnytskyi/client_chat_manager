import {
    StateTabs,
    UsersActiveTabs
  } from '@client/enum';
 
  import { useNavigate } from 'react-router-dom';
  
  type NavigateToParams = {
    pathname: string;
    resetScroll?: boolean;
  };
  
  export function useNavigateTo() {
    const navigate = useNavigate();
  
    return function navigateTo({
      pathname,
      resetScroll = true
    }: NavigateToParams): void {

  
      navigate(`${pathname}?`, { replace: false });
  
      if (resetScroll) {
        window.scrollTo(0, 0);
      }
    };
  }
  
  export const NONE_PARAMETER = 0;
  
  type GenerateUrlParams = {
    url: string;
    activeTab?:
      | UsersActiveTabs
    state?: StateTabs;
    id?: number | typeof NONE_PARAMETER | string;
    subId?: number;
  };
  
  export function generateUrlParams({
    url,
    activeTab,
    state,
    id = NONE_PARAMETER,
    subId
  }: GenerateUrlParams) {
    if (!activeTab) return `${url}/${id}`;
  
    if (!state) return `${url}/${id}/${activeTab}`;
  
    if (!subId) {
      return `${url}/${id}/${activeTab}/${state}`;
    }
    return `${url}/${id}/${activeTab}/${state}/${subId}`;
  }
  