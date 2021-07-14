import * as React from "react"
import styled from "styled-components"
import ReactDOM from "react-dom"

interface cardProps {
  onClose: () => void
  children: any
}

interface ModalOverlayProps {
  children: any
  classes?: any
  zIndex: number
}

const Modal = styled.div`
  position: absolute;
  top: 0;
  margin-top: 5vh;
  top: 5vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 0;
  animation: slide-down 300ms ease-out forwards;
  @media (min-width: 768px) {
    .modal {
      width: 40rem;
      left: calc(50% - 20rem);
    }
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const CustomBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.75);
  @media (min-width: 768px) {
    .modal {
      width: 40rem;
      left: calc(50% - 20rem);
    }
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const ModalOverlay = (props: ModalOverlayProps) => {
  return <Modal style={{ zIndex: props.zIndex }}>{props.children}</Modal>
}

interface backdropProps {
  onClose: () => void
}

export const Backdrop = (props: backdropProps) => {
  return <CustomBackdrop onClick={props.onClose} />
}

export const Card = (props: cardProps) => {
  const domELementBackdrop = document.getElementById("backdrop-root")
  const domELementOverlay = document.getElementById("overlay-root")

  return (
    <React.Fragment>
      {domELementBackdrop
        ? ReactDOM.createPortal(
            <React.StrictMode>
              <Backdrop onClose={props.onClose} />
            </React.StrictMode>,
            domELementBackdrop
          )
        : null}
      {domELementOverlay
        ? ReactDOM.createPortal(
            <React.StrictMode>
              <ModalOverlay zIndex={20}>{props.children}</ModalOverlay>
            </React.StrictMode>,
            domELementOverlay
          )
        : null}
    </React.Fragment>
  )
}
