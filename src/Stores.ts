import create from 'zustand';

interface CheckMobileState{
  isMobile:boolean
  checkIsMobile: ()=>void
}

export const useCheckMobile = create<CheckMobileState>(set => ({
  isMobile: matchMedia("screen and (max-width:720px)").matches,
  checkIsMobile: ()=>set(state => ({isMobile:matchMedia("screen and (max-width:720px)").matches}))    
}));