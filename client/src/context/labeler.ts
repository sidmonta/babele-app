import { createContext, useContext, useEffect, useState } from 'react'
import Labeler, { __ } from '@sidmonta/babelelabeler'

export const LabelerContext = createContext(Labeler)
export const useLabelerContext = () => useContext(LabelerContext)

export const useLabel = (uri: string, lang?: string | undefined) => {
  const [label, setLabel] = useState<string>(uri)
  useEffect(() => {
    const getLabel = async (uri: string) => {
      const l: string = await __(uri, lang)
      setLabel(l)
    }
    if (uri) {
      getLabel(uri).then()
    }
  }, [uri])

  return [label, setLabel]
}
