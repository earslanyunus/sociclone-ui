'server-only'
 
const dictionaries: { [key: string]: () => Promise<any> } = {
  en: () => import('@/../dictionaries/en.json').then((module) => module.default),
  tr: () => import('@/../dictionaries/tr.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: string): Promise<any> => dictionaries[locale]()