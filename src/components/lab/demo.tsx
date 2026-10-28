"use client";
import { MotionButton } from "@/components/motion/motion-button";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { RevealText } from "@/components/motion/reveal-text";
import { MorphCard } from "@/components/motion/morph-card";
import { StaggerList } from "@/components/motion/stagger-list";
import { AnimatedTabs } from "@/components/motion/animated-tabs";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { BottomSheet } from "@/components/motion/bottom-sheet";
import { AnimatedToast } from "@/components/motion/animated-toast";
import { PageTransition } from "@/components/motion/page-transition";
import { ArrowUpRight } from "lucide-react";
export function Demo({id,speed=1,reduceMotion=false,color,stiffness,disabled}:{id:string;speed?:number;reduceMotion?:boolean;color?:string;stiffness?:number;disabled?:boolean}){
 switch(id){
  case "motion-button":return <MotionButton disabled={disabled} speed={speed} color={color} stiffness={stiffness} reduceMotion={reduceMotion} onClick={()=>{}}>Get started <ArrowUpRight size={15}/></MotionButton>;
  case "magnetic-button":return <MagneticButton speed={speed} color={color} stiffness={stiffness} reduceMotion={reduceMotion} strength={15}>Explore work <ArrowUpRight className="ml-2 inline-block" size={14}/></MagneticButton>;
  case "reveal-text":return <RevealText speed={speed} reduceMotion={reduceMotion} text="Make ideas move." className="text-center text-3xl font-bold tracking-[-.055em] text-[#171d2a]"/>;
  case "morph-card":return <MorphCard speed={speed} reduceMotion={reduceMotion}/>;
  case "stagger-list":return <StaggerList speed={speed} reduceMotion={reduceMotion}/>;
  case "animated-tabs":return <AnimatedTabs speed={speed} reduceMotion={reduceMotion}/>;
  case "scroll-reveal":return <ScrollReveal speed={speed} reduceMotion={reduceMotion}/>;
  case "bottom-sheet":return <BottomSheet speed={speed} reduceMotion={reduceMotion}/>;
  case "animated-toast":return <AnimatedToast speed={speed} reduceMotion={reduceMotion}/>;
  case "page-transition":return <PageTransition speed={speed} reduceMotion={reduceMotion}/>;
  default:return null;
 }
}
