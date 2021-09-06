import { getAbbreviatedString } from "./getAbbreviatedString"

describe("Get Abbreviated String", () => {
  it("it should be return first and last word of string", () => {
    expect(getAbbreviatedString("nguyen thi a b c")).toEqual("NC")
    expect(getAbbreviatedString("le van b")).toEqual("LB")
    expect(getAbbreviatedString("pham c")).toEqual("PC")
  })
  it("it should be return the firt character  of word", () => {
    expect(getAbbreviatedString("linh")).toEqual("L")
  })
})
