import React, { useEffect, useRef, useCallback } from 'react';

export const useClickOutside=(callback:()=>void,ref)=>{
  useEffect(() => {

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);

    return () => {      
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export const useInterval=(callback:()=>void, delay:number)=>{
  const intervalRef = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  //delay변경 시 다시 선언
  useEffect(() => {
    const tick = () => savedCallback.current();
    intervalRef.current = window.setInterval(tick, delay);
    //언마운트 시 interval 삭제
    return () => window.clearInterval(intervalRef.current);
    
  }, [delay]);
  return intervalRef;
}

export const useDebouncedEffect = (callback:()=>void, delay:number, deps:React.DependencyList) => {
  const cb = useCallback(callback, deps);

  //디펜던시 변경될 때마다 settimeout 재선언
  useEffect(() => {
    const timer = setTimeout(() => {
      cb();
    }, delay);

    //cleanup function으로 컴포넌트 언마운트 시 timeout clear하기
    return () => {
      clearTimeout(timer);
    };
  }, [cb, delay]);
};

export const useEventListener=(eventName:string, handler, element = window)=>{
  
  const savedHandler = useRef(handler);
  
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      
      const eventListener = (event) => savedHandler.current(event);
      
      element.addEventListener(eventName, eventListener);
      
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element]
  );
}