import styled from "styled-components"

const CustomDiv = styled.div`
  position: relative;
  top: 0em;
  width: 100%;
  height: 3em;
  background-color: black;
`

const CustomP = styled.p`
  position: absolute;
  top: -0.5em;
  left: 1em;
  font-size: 25px;
  color: white;
`

export const Header = () => {
  return (
    <CustomDiv>
      <CustomP>Todo React App</CustomP>
    </CustomDiv>
  )
}
