"use client";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { motion } from "motion/react";
export type StaggerListProps={items?:string[];speed?:number;reduceMotion?:boolean;};
export function StaggerList({items=["Craft the idea","Shape the interface","Make it move"],speed=1,reduceMotion=false}:StaggerListProps){
  const off=useReducedMotion()||reduceMotion;
  return <motion.ul className="mx-auto w-full max-w-xs space-y-2" initial={off?false:"hidden"} animate="show" variants={{hidden:{},show:{transition:{staggerChildren:off?0:.13/speed}}}}>
    {items.map((item,i)=><motion.li key={`${item}-${i}`} variants={{hidden:{opacity:0,y:off?0:15},show:{opacity:1,y:0}}}
      transition={{duration:off?0:.45/speed}} className="flex items-center gap-3 rounded-xl border border-[#e9eef7] bg-white px-4 py-3 text-sm font-medium text-[#263145] shadow-sm">
      <span className="flex size-6 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">{i+1}</span>{item}</motion.li>)}
  </motion.ul>;
}
