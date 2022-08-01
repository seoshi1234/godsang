import { useEffect, useRef } from 'react';

export const useClickOutside=(cb:()=>void,ref)=>{
  useEffect(() => {

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
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
  useEffect(() => {
    const tick = () => savedCallback.current();
    intervalRef.current = window.setInterval(tick, delay);
    return () => window.clearInterval(intervalRef.current);
    
  }, [delay]);
  return intervalRef;
}