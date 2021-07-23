import * as React from "react"

export const useInput = (validateConditionFuntion: (arg: string) => boolean) => {
  const [value, setValue] = React.useState("")
  const [isTouched, setIsTouched] = React.useState(false)

  const isValueValid = validateConditionFuntion(value)

  const hasError = !isValueValid && isTouched

  const valueChangeHanlder = (event: any) => {
    setValue(event.target.value)
  }

  const inputBlurHandler = (event: any) => {
    setIsTouched(true)
  }
  const reset = () => {
    setValue("")
    setIsTouched(false)
  }
  return { value, isValueValid, hasError, valueChangeHanlder, inputBlurHandler, reset }
}

export const propsChange = <T>(value: T, setValue: (value: T) => void) => {
  setValue(value)
}
