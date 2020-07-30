import { createContext, useContext, useEffect, useState } from 'react'
import { DeweyCategory } from '@sidmonta/babelelibrary/lib/types'
import { fetchAPI } from '../services'

type ContextType = {
  selectDeweyCategory: DeweyCategory | null
  setSelectDeweyCategory: (d: DeweyCategory) => void
}

const getDewey = fetchAPI('GET')

export const DeweySelectContext = createContext({
  selectDeweyCategory: null,
  setSelectDeweyCategory: (d: DeweyCategory) => {},
} as ContextType)
export const useDeweySelect = () => useContext(DeweySelectContext)

export function useDewey(fallback: string) {
  const [deweySelect, setDeweySelect] = useState<DeweyCategory | null>(null)
  const { selectDeweyCategory } = useDeweySelect()

  useEffect(() => {
    const get = async () => {
      let dewey: DeweyCategory | null = null
      if (selectDeweyCategory) {
        dewey = selectDeweyCategory
      } else {
        dewey = (await getDewey('/get-dewey/' + fallback)) as DeweyCategory | null
      }

      setDeweySelect(dewey)
    }

    get().then()
  }, [])

  return deweySelect
}
