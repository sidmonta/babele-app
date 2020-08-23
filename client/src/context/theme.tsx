import React, { createContext, lazy, useContext, Suspense, PropsWithChildren, useMemo } from 'react'

export type Themes = 'real' | 'flat'

export const ThemeContext = createContext<Themes>('real')
export const useTheme = () => useContext(ThemeContext)

export function ThemeComponentFactory<T>(component: string) {
  const theme = useTheme()
  const ThemeComponent = useMemo(() => lazy(() => import(`../components/${component}-${theme}`)), [component, theme])
  return (props: PropsWithChildren<T>) => (
    <Suspense fallback={<div>...</div>}>
      <ThemeComponent {...props}>{props.children}</ThemeComponent>
    </Suspense>
  )
}
