import { DependencyList, useCallback, useRef } from "react"

export default function useIntersectionObserver<T extends HTMLElement>(
  callback: () => void,
  deps: DependencyList,
  callback2?: () => void
) {
  const observer = useRef<IntersectionObserver | null>(null)

  const ref = useCallback(
    (node: T) => {
      if (deps.every(Boolean)) {
        observer.current?.disconnect()
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting){callback()}
          else {callback2?.()}
        })
        if (node) observer.current.observe(node)
      }
    },
    [deps, callback]
  )
  return ref
}