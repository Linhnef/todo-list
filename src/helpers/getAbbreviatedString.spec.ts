import { getAbbreviatedString } from "./getAbbreviatedString"

describe("Get Abbreviated String", () => {
  it("it should be return first and last word of string", () => {
    expect(getAbbreviatedString("Nguyễn Văn Thanh A")).toEqual("NA")
    expect(getAbbreviatedString("Lê Văn B")).toEqual("LB")
    expect(getAbbreviatedString("Phạm C")).toEqual("PC")
  })
  it("it should be return the firt character  of word", () => {
    expect(getAbbreviatedString("Linh")).toEqual("L")
  })
})
