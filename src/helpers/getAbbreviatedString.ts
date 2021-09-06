export const getAbbreviatedString = (data: string) => {
  return (
    (data.split(" ").length === 1
      ? data
          .split(" ")
          .map((word) => word[0].toUpperCase())
          .join("")
      : data
          .split(" ")
          .filter((word, index) => index === 0 || index === data.split(" ").length - 1)
          .map((word) => word[0].toUpperCase())
          .join("")) ?? "?"
  )
}
