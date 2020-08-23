import React, { createContext, lazy, useContext, Suspense, PropsWithChildren } from 'react'

export type Themes = 'real' | 'flat'

export const ThemeContext = createContext<Themes>('real')
export const useTheme = () => useContext(ThemeContext)

export function ThemeComponentFactory<T>(component: string) {
  const theme = useTheme()
  const ThemeComponent = lazy(() => import(`../components/${component}-${theme}`))

  return (props: PropsWithChildren<T>) => (
    <Suspense fallback={<div>...</div>}>
      <ThemeComponent {...props}>{props.children}</ThemeComponent>
    </Suspense>
  )
}
