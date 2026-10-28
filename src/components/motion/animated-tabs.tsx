"use client";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useId, useState, type KeyboardEvent } from "react";
import { motion } from "motion/react";
export type TabItem={name:string;heading:string;detail:string};
export type AnimatedTabsProps={speed?:number;reduceMotion?:boolean;items?:TabItem[];};
const tabs=[{name:"Overview",heading:"Clarity in motion",detail:"A fluid underline carries your attention."},{name:"Motion",heading:"Built to feel alive",detail:"Shared layout makes every change feel connected."},{name:"Details",heading:"Every pixel counts",detail:"Subtle motion, distinct interaction states."}];
export function AnimatedTabs({speed=1,reduceMotion=false,items=tabs}:AnimatedTabsProps){
  const [active,setActive]=useState(0);const uid=useId().replace(/:/g,"");const off=useReducedMotion()||reduceMotion;
  const keys=(e:KeyboardEvent<HTMLButtonElement>,i:number)=>{
    if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft"&&e.key!=="Home"&&e.key!=="End") return;
    e.preventDefault(); const next=e.key==="Home"?0:e.key==="End"?items.length-1:(i+(e.key==="ArrowRight"?1:-1)+items.length)%items.length;
    setActive(next); (e.currentTarget.parentElement?.querySelectorAll("button")[next] as HTMLButtonElement)?.focus();
  };
  if(items.length===0)return null;
  return <div className="mx-auto w-full max-w-sm rounded-2xl border border-[#e6ebf5] bg-white p-3 shadow-sm">
    <div role="tablist" aria-label="Demo sections" className="flex gap-1 border-b border-[#e9edf6]">
      {items.map((tab,i)=><button key={tab.name} id={`${uid}-tab-${i}`} type="button" role="tab" aria-selected={active===i} aria-controls={`${uid}-panel`} tabIndex={active===i?0:-1}
        onKeyDown={e=>keys(e,i)} onClick={()=>setActive(i)} className={`relative flex-1 px-2 py-2.5 text-xs font-semibold transition-colors ${active===i?"text-blue-600":"text-slate-400 hover:text-slate-700"}`}>
        {tab.name}{active===i&&<motion.span layoutId={`${uid}-underline`} transition={{duration:off?0:.28/speed}} className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-blue-600"/>}</button>)}
    </div>
    <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="min-h-25 p-4 text-left">
      <h3 className="text-sm font-semibold">{items[active]?.heading}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{items[active]?.detail}</p>
    </div>
  </div>;
}
