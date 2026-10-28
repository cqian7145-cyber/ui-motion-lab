import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",{
  variants: {
    variant: { default: "bg-[#171b24] text-white hover:bg-[#343d4c]", secondary: "bg-[#f0f3f8] text-[#252c39] hover:bg-[#e8ecf3]", outline:"border border-[#e3e7ef] bg-white text-[#283143] hover:bg-[#f8faff]", ghost:"text-[#485263] hover:bg-[#eff3f8]" },
    size: { default: "h-10 px-4", sm: "h-8 px-3 text-xs", lg: "h-12 px-5", icon:"size-9" }
  }, defaultVariants: { variant: "default", size:"default" }
});
export function Button({className, variant, size, asChild=false, ...props}:React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {asChild?:boolean}) {
  const Component = asChild ? Slot : "button";
  return <Component className={cn(buttonVariants({variant,size,className}))} {...props}/>;
}
