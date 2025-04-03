import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatdate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const viewOrViews = (view : number) => {
  if(view > 1) return view+" views";

  return view+ " view"
}


export const parseServerActionResponse = <T>(response : T) => {
  return JSON.parse(JSON.stringify(response))
}