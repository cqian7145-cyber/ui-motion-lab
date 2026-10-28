"use client";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import * as React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
export type MagneticButtonProps=React.ComponentProps<typeof motion.button> & {strength?:number; speed?:number; stiffness?:number; color?:string; reduceMotion?:boolean;};
export function MagneticButton({strength=13,speed=1,stiffness=230,color,reduceMotion=false,className,children,onPointerMove,onPointerLeave,style,...props}:MagneticButtonProps){
  const mx=useMotionValue(0), my=useMotionValue(0);
  const x=useSpring(mx,{stiffness:stiffness*speed,damping:18}),y=useSpring(my,{stiffness:stiffness*speed,damping:18});
  const systemReduce=useReducedMotion();
  const off=reduceMotion||systemReduce;
  const move=(event:React.PointerEvent<HTMLButtonElement>)=>{
    if(!off && event.pointerType==="mouse"){
      const rect=event.currentTarget.getBoundingClientRect();
      mx.set(Math.max(-strength,Math.min(strength,(event.clientX-rect.left-rect.width/2)*.24)));
      my.set(Math.max(-strength,Math.min(strength,(event.clientY-rect.top-rect.height/2)*.24)));
    }
    onPointerMove?.(event);
  };
  const leave=(event:React.PointerEvent<HTMLButtonElement>)=>{mx.set(0);my.set(0);onPointerLeave?.(event);};
  return <motion.button type="button" style={off?{...style,backgroundColor:color}:{...style,backgroundColor:color,x,y}} onPointerMove={move} onPointerLeave={leave}
    whileTap={off?undefined:{scale:.97}} className={cn("inline-flex min-h-12 items-center justify-center rounded-full bg-[#151b2a] px-8 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500",className)} {...props}>{children}</motion.button>;
}
