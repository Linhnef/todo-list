export const getAbbreviatedString = (data: string) => {
  return (
    (data.length === 1
      ? data
          .split(" ")
          .map((word) => word[0].toUpperCase())
          .join("")
      : data
          .split(" ")
          .filter((word, index) => index === 0 || index === data.length)
          .map((word) => word[0].toUpperCase())
          .join("")) ?? "?"
  )
}
