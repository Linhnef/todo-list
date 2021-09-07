import { getAbbreviatedString } from "./getAbbreviatedString"

describe("Get abbreviated string", () => {
  it("it should be return first character of the first and last words of the string", () => {
    expect(getAbbreviatedString("Trần Dần")).toEqual("TD")
    expect(getAbbreviatedString("Nguyễn Bảo Linh")).toEqual("LB")
    expect(getAbbreviatedString("Phạm Thị Mỹ Nhân")).toEqual("PN")
  })
  it("it should be return the first character of word", () => {
    expect(getAbbreviatedString("Linh")).toEqual("L")
  })
})
