"use client";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
export type RevealTextProps={text:string; className?:string; speed?:number; reduceMotion?:boolean; split?:"words"|"chars";};
export function RevealText({text,className,speed=1,reduceMotion=false,split="words"}:RevealTextProps){
  const systemReduce=useReducedMotion();
  const off=reduceMotion||systemReduce;
  const tokens=split==="chars"?Array.from(text):text.split(/(\s+)/);
  return <span aria-label={text} className={cn("inline-flex flex-wrap justify-center",className)}>
    {tokens.map((part,i)=>part.trim()===""?<span key={i} aria-hidden="true" style={{whiteSpace:"pre"}}>{part}</span>:
      <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
        <motion.span className="inline-block" initial={off?false:{y:"110%",opacity:0}} animate={{y:"0%",opacity:1}}
          transition={{duration:off?0:.72/speed,delay:off?0:i*.075/speed,ease:[.22,1,.36,1]}}>{part}</motion.span>
      </span>)}
  </span>;
}
