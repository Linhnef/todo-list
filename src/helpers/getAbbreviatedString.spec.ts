import { getAbbreviatedString } from "./getAbbreviatedString"

describe("Get Abbreviated String", () => {
  it("it should be return first and last word of string", () => {
    expect(getAbbreviatedString("Trần Dần")).toEqual("TD")
    expect(getAbbreviatedString("Nguyễn Bảo Linh")).toEqual("LB")
    expect(getAbbreviatedString("Phạm Thị Mỹ Nhân")).toEqual("PN")
  })
  it("it should be return the firt character  of word", () => {
    expect(getAbbreviatedString("Linh")).toEqual("L")
  })
})
