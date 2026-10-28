"use client";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Modal } from "@/components/ui/modal";
import { X, SlidersHorizontal } from "lucide-react";
export type BottomSheetProps={speed?:number;reduceMotion?:boolean;triggerLabel?:string;title?:string;description?:string;actionLabel?:string;children?:ReactNode;};
export function BottomSheet({speed=1,reduceMotion=false,triggerLabel="Open bottom sheet",title="Customize your view",description="A gesture-friendly sheet for mobile workflows. Drag down or press Escape to close.",actionLabel="Apply changes",children}:BottomSheetProps){
  const [open,setOpen]=useState(false); const off=useReducedMotion()||reduceMotion;
  return <>
    <button type="button" onClick={()=>setOpen(true)} className="mx-auto flex items-center gap-2 rounded-full border border-[#dce6f6] bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-sm focus-visible:outline-2 focus-visible:outline-blue-500"><SlidersHorizontal size={17}/> {triggerLabel}</button>
    <AnimatePresence>{open&&<Modal label="Demo bottom sheet" onClose={()=>setOpen(false)}><div className="fixed inset-0 z-[110]">
      <motion.button type="button" tabIndex={-1} aria-label="Close sheet" className="absolute inset-0 bg-[#0b1530]/55" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)}/>
      <motion.div  initial={off?false:{y:"100%"}} animate={{y:0}} exit={off?{opacity:0}:{y:"100%"}}
        drag={off?false:"y"} dragConstraints={{top:0,bottom:0}} dragElastic={{top:0,bottom:.2}}
        onDragEnd={(_e,info)=>{if(info.offset.y>100||info.velocity.y>550)setOpen(false);}}
        transition={off?{duration:0}:{type:"spring",stiffness:340*speed,damping:35}}
        className="absolute max-h-[90dvh] overflow-y-auto inset-x-0 bottom-0 mx-auto w-full max-w-xl rounded-t-[30px] bg-white px-6 pb-9 pt-3 shadow-2xl">
        <div className="mx-auto h-1.5 w-10 rounded-full bg-slate-200"/>
        <div className="mt-6 flex justify-between"><h2 className="text-xl font-bold">{title}</h2><button aria-label="Close" type="button" onClick={()=>setOpen(false)}><X size={20}/></button></div>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        {children}<button type="button" onClick={()=>setOpen(false)} className="mt-7 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white">{actionLabel}</button>
      </motion.div>
    </div></Modal>}</AnimatePresence>
  </>;
}
