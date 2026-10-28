"use client";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Modal } from "@/components/ui/modal";
import { ArrowUpRight, X } from "lucide-react";
export type MorphCardProps={speed?:number;reduceMotion?:boolean;eyebrow?:string;title?:string;summary?:string;detail?:string;};
export function MorphCard({speed=1,reduceMotion=false,eyebrow="Case Study / 001",title="Ideas in motion.",summary="Click to expand the story",detail="The same card transforms into a full detail view while preserving visual continuity. Use this for project previews, galleries, and product details."}:MorphCardProps){
  const [open,setOpen]=useState(false); const uid=useId(); const off=useReducedMotion()||reduceMotion;
  const transition={duration:off?0:.43/speed,ease:[.2,.8,.2,1] as [number,number,number,number]};
  return <>
    <motion.button type="button" aria-label="Open detailed card" onClick={()=>setOpen(true)} layoutId={`${uid}-card`} transition={transition}
      className="mx-auto block w-full max-w-xs overflow-hidden rounded-2xl border border-[#dde6f5] bg-[#ecf3ff] p-3 text-left shadow-sm focus-visible:outline-2 focus-visible:outline-blue-500">
      <span className="flex items-center justify-between text-xs font-bold text-blue-700"><span>{eyebrow}</span><ArrowUpRight size={16}/></span>
      <span className="mt-7 block text-lg font-bold text-[#17243e]">{title}</span>
      <span className="mt-1 block text-xs text-slate-600">{summary}</span>
    </motion.button>
    <AnimatePresence>{open&&<Modal label="Case study detail" onClose={()=>setOpen(false)}><div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.button type="button" tabIndex={-1} aria-label="Close detail" className="absolute inset-0 bg-[#0b1530]/55" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)}/>
      <motion.div  layoutId={`${uid}-card`} transition={transition} className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-[#ecf3ff] p-7 shadow-2xl">
        <button type="button" onClick={()=>setOpen(false)} className="absolute right-5 top-5 rounded-full bg-white p-2 focus-visible:outline-2 focus-visible:outline-blue-500" aria-label="Close"><X size={18}/></button>
        <div className="text-xs font-bold uppercase tracking-widest text-blue-700">{eyebrow}</div>
        <h2 className="mt-14 text-4xl font-bold tracking-tight text-[#17243e]">{title}</h2>
        <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">{detail}</p>
        <button type="button" onClick={()=>setOpen(false)} className="mt-8 rounded-full bg-blue-600 px-6 py-3 text-xs font-semibold text-white">Back to gallery</button>
      </motion.div>
    </div></Modal>}</AnimatePresence>
  </>;
}
