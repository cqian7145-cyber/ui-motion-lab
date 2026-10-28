"use client";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
export type PageStep={label:string;title:string;body:string;accent:string};
export type PageTransitionProps={speed?:number;reduceMotion?:boolean;pages?:PageStep[];};
const screens=[{label:"01 — Discover",title:"Discover",body:"Explore thoughtful interactions.",accent:"#dce9ff"},{label:"02 — Create",title:"Create",body:"Turn inspiration into components.",accent:"#e8e2ff"},{label:"03 — Share",title:"Share",body:"Move faster on your next project.",accent:"#d8f3ec"}];
export function PageTransition({speed=1,reduceMotion=false,pages=screens}:PageTransitionProps){
  const [page,setPage]=useState(0);const off=useReducedMotion()||reduceMotion;
  if(pages.length===0)return null;
  return <div className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-[#e6eaf3] bg-white p-3">
    <div className="relative h-34 overflow-hidden rounded-xl">
      <AnimatePresence mode="wait"><motion.div key={page} initial={off?false:{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={off?{opacity:0}:{opacity:0,x:-24}} transition={{duration:off?0:.3/speed}}
        style={{background:pages[page]?.accent}} className="absolute inset-0 flex flex-col justify-center px-6 text-left">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{pages[page]?.label}</span>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{pages[page]?.title}</h3>
        <p className="mt-1 text-xs text-slate-600">{pages[page]?.body}</p>
      </motion.div></AnimatePresence>
    </div>
    <div className="mt-3 flex items-center justify-between px-1"><span className="text-xs text-slate-500">{page+1} / {pages.length}</span>
      <button type="button" onClick={()=>setPage(x=>(x+1)%pages.length)} className="flex items-center gap-1 rounded-full bg-[#151b2a] px-4 py-2 text-xs font-semibold text-white">Next <ArrowRight size={13}/></button></div>
  </div>;
}
