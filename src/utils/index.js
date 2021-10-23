import { useEffect, useState, useLayoutEffect, useRef } from 'react'

const THRESHOLD_FROM_BOTTOM = 50;

export function debounce(fn, time = 0){
  let prevTimer = null;
  return function(){
    clearInterval(prevTimer);
    let context = this, args = arguments
    let calledFn = () => { 
      fn.apply(context, args);
    }
    prevTimer = setTimeout(calledFn,time);
  }
}

export function flattenStyle(stylesArray){
  let styles = stylesArray.reduce((acc,style) => {
    if(acc){
      acc = `${acc} ${style}`;
    }
    else {
      acc = style;
    }
    return acc;
  },'')

  return styles;
} 

export function useMaxWidth(width = 600){
  const [passed, setPassed] = useState();

  useEffect(() => {
    const listener = ()=>{
      if(width < window.innerWidth){
        setPassed(true)
      }
      else {
        setPassed(false)
      }
    }
    window.addEventListener('resize',listener);
    listener();

    return () => {
      window.removeEventListener('resize',listener);
    }
  }, [width])
  return passed
} 


export function useBottomReached(node, from_bottom = THRESHOLD_FROM_BOTTOM) {
  let lastKnownScrollPosition = useRef(0);
  let ticking = useRef(false);
  let waitToSetIsBottomReached = useRef(false);
  let [isBottomReached, setIsBottomReached] = useState(false);

  useLayoutEffect(() => {
    console.log(node);
    function calculateIfScrollIsReacedAtBottom(scrollPos) {
      let atBottom =
        node.current.clientHeight -
          (window.innerHeight + scrollPos + from_bottom) <=
        0
          ? true
          : false;
      if (atBottom) {
        if (!waitToSetIsBottomReached.current) {
          waitToSetIsBottomReached.current = true;
          setIsBottomReached(true);
        }
      } else {
        if (waitToSetIsBottomReached.current) {
          waitToSetIsBottomReached.current = false;
          setIsBottomReached(false);
        }
      }
    }
    function listnerFunction() {
      lastKnownScrollPosition.current = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          calculateIfScrollIsReacedAtBottom(lastKnownScrollPosition.current);
          ticking.current = false;
        });
        ticking.current = true;
      }
    }
    node.current && document.addEventListener("scroll", listnerFunction);
    return () => {
      document.removeEventListener("scroll", listnerFunction);
    };
  }, []);

  return [isBottomReached];
}
