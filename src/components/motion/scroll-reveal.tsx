"use client";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useRef } from "react";
import { motion } from "motion/react";
export type ScrollRevealProps={speed?:number;reduceMotion?:boolean;items?:string[];};
export function ScrollReveal({speed=1,reduceMotion=false,items=["A little movement","A clearer message","A better experience"]}:ScrollRevealProps){
  const root=useRef<HTMLDivElement>(null); const off=useReducedMotion()||reduceMotion;
  return <div ref={root} tabIndex={0} aria-label="Scrollable animation demonstration" className="mx-auto h-48 w-full max-w-xs overflow-y-auto rounded-2xl border border-[#e7ecf5] bg-white p-3 focus-visible:outline-2 focus-visible:outline-blue-500">
    <div className="flex h-28 items-center justify-center text-xs text-slate-400">Scroll inside this panel ↓</div>
    {items.map((line,i)=><motion.div key={line}
      initial={off?false:{opacity:0,y:25}} whileInView={{opacity:1,y:0}}
      viewport={{root,amount:.5,once:false}}
      transition={{duration:off?0:.55/speed,delay:off?0:i*.035}}
      className="mb-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-5 text-center text-sm font-semibold text-blue-900">{line}</motion.div>)}
    <div className="h-12"/>
  </div>;
}
