"use client";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
export type AnimatedToastProps={speed?:number;reduceMotion?:boolean;title?:string;description?:string;};
export function AnimatedToast({speed=1,reduceMotion=false,title="Changes saved",description="Your animation is ready to use."}:AnimatedToastProps){
  const [visible,setVisible]=useState(false); const off=useReducedMotion()||reduceMotion;
  return <div className="relative mx-auto flex min-h-32 w-full max-w-xs items-start justify-center pt-2">
    <button type="button" onClick={()=>setVisible(v=>!v)} className="rounded-full bg-[#151b2a] px-5 py-2.5 text-xs font-semibold text-white">{visible?"Dismiss toast":"Show notification"}</button>
    <AnimatePresence>{visible&&<motion.div role="status" aria-live="polite" initial={off?false:{opacity:0,y:15,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={off?{opacity:0}:{opacity:0,y:10,scale:.97}} transition={{duration:off?0:.3/speed}}
      className="absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-xl border border-[#d5eadc] bg-white px-3 py-3 shadow-xl">
      <span className="rounded-full bg-green-100 p-1.5 text-green-600"><Check size={15}/></span><div className="flex-1 text-left"><div className="text-xs font-semibold">{title}</div><div className="text-[11px] text-slate-500">{description}</div></div>
      <button type="button" aria-label="Dismiss notification" onClick={()=>setVisible(false)} className="p-1 text-slate-400"><X size={15}/></button>
    </motion.div>}</AnimatePresence>
  </div>;
}
