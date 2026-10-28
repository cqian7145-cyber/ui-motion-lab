"use client";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
export type MotionButtonProps=React.ComponentProps<typeof motion.button> & { speed?:number; stiffness?:number; color?:string; reduceMotion?:boolean; };
export function MotionButton({children, speed=1, stiffness=320, color, reduceMotion=false, className, disabled, style, ...props}:MotionButtonProps){
  const systemReduce=useReducedMotion();
  const off=reduceMotion||systemReduce||disabled;
  const resting={scale:1,y:0,transition:{duration:0}};
  return <motion.button type="button" disabled={disabled} animate={off?resting:undefined} whileHover={off?resting:{scale:1.05,y:-3}}
    whileTap={off?resting:{scale:.95}} transition={off?{duration:0}:{type:"spring",stiffness:stiffness*speed,damping:20}}
    style={{...style,backgroundColor:color}} className={cn("inline-flex min-h-11 items-center justify-center rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 disabled:opacity-50",className)} {...props}>{children}</motion.button>;
}
