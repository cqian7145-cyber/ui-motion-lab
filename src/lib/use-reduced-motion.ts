"use client";
import { useSyncExternalStore } from "react";

const query="(prefers-reduced-motion: reduce)";
const snapshot=()=>window.matchMedia(query).matches;
const serverSnapshot=()=>false;
function subscribe(notify:()=>void){
  const media=window.matchMedia(query);
  media.addEventListener("change",notify);
  return ()=>media.removeEventListener("change",notify);
}

// Match server HTML during hydration, then subscribe to the actual preference.
export function useReducedMotion(){
  return useSyncExternalStore(subscribe,snapshot,serverSnapshot);
}
