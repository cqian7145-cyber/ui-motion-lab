"use client";
import { useEffect, useRef, type ReactNode } from "react";

// Native top-layer modal: the browser owns inertness, focus containment and
// restoration. Keep mounted during Motion exits so modality lasts until exit.
export function Modal({label,onClose,children}:{label:string;onClose:()=>void;children:ReactNode}) {
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(()=>{
    const dialog=ref.current!;
    const trigger=document.activeElement instanceof HTMLElement?document.activeElement:null;
    const previous=document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow="hidden";
    return ()=>{
      dialog.close();document.body.style.overflow=previous;
      if(trigger?.isConnected)trigger.focus({preventScroll:true});
    };
  },[]);
  return <dialog ref={ref} aria-label={label} className="lab-modal"
    onKeyDown={e=>{
      // Keep Tab in content instead of handing the boundary to browser chrome.
      if(e.key!=="Tab" || (e.target as HTMLElement).closest("dialog")!==e.currentTarget)return;
      const controls=Array.from(e.currentTarget.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea, [tabindex]"))
        .filter(el=>el.tabIndex>=0 && !el.matches(":disabled") && el.getClientRects().length>0);
      const target=e.shiftKey?controls.at(-1):controls[0];
      const boundary=e.shiftKey?controls[0]:controls.at(-1);
      if(document.activeElement===boundary && target){e.preventDefault();target.focus();}
    }}
    onCancel={e=>{e.preventDefault();e.stopPropagation();onClose();}}>
    {children}
  </dialog>;
}
