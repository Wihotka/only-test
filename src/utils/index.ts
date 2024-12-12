export const transformNumber = (value: number): string => {
  switch (`${value}`.length) {
    case 1:
      return `0${value}`
    case 2:
      return `${value}`
    default:
      return `${value}`
  }
}
