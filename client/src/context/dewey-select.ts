import { createContext, useContext, useEffect, useState } from 'react'
import { Types } from '@sidmonta/babelelibrary'
import { fetchAPI } from '../services'

type ContextType = {
  selectDeweyCategory: Types.DeweyCategory | null
  setSelectDeweyCategory: (d: Types.DeweyCategory) => void
}

const getDewey = fetchAPI('GET')

export const DeweySelectContext = createContext({
  selectDeweyCategory: null,
  setSelectDeweyCategory: (_: DeweyCategory) => {},
} as ContextType)
export const useDeweySelect = () => useContext(DeweySelectContext)

export function useDewey(fallback: string) {
  const [deweySelect, setDeweySelect] = useState<DeweyCategory | null>(null)
  const { selectDeweyCategory } = useDeweySelect()

  useEffect(() => {
    const get = async () => {
      let dewey: DeweyCategory | null
      if (selectDeweyCategory) {
        setDeweySelect(selectDeweyCategory)
      } else {
        dewey = (await getDewey('/get-dewey/' + fallback))[0] as DeweyCategory | null
        setDeweySelect(dewey)
      }
    }

    get().then()
  }, [fallback, selectDeweyCategory])

  return deweySelect
}
