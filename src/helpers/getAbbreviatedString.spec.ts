import { getAbbreviatedString } from "./getAbbreviatedString"

describe("Get abbreviated string", () => {
  it("should return the first character of the first and the last words", () => {
    expect(getAbbreviatedString("Trần Dần")).toEqual("TD")
    expect(getAbbreviatedString("Nguyễn Bảo Linh")).toEqual("LB")
    expect(getAbbreviatedString("Phạm Thị Mỹ Nhân")).toEqual("PN")
  })
  it("should return the first character of the one-word string", () => {
    expect(getAbbreviatedString("Linh")).toEqual("L")
  })
})
