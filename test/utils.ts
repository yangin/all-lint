export const getCurrentDate = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const getNewStr = (str: string) => `${str}_new`
