import { createContext, useContext } from 'react'
import { DeweyCategory } from '@sidmonta/babelelibrary/lib/types'

export const DeweySelectContext = createContext({
  selectDeweyCategory: {} as DeweyCategory,
  setSelectDeweyCategory: () => {},
})
export const useDeweySelect = () => useContext(DeweySelectContext)
