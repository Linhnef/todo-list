import { Dialog } from "@material-ui/core"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { MainLayout } from "../layouts/MainLayout"
import * as React from "react"
import { User } from "../services/api/types/User"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { UserProfileCard } from "../components/UserProfileCard"
import { UpdateUserInformationCard } from "../components/UpdateUserInformationCard"
import { DialogCard } from "../components/DialogCard"

export const Home = () => {
  const [profileDialogStatus, setProfileDialogStatus] = React.useState(false)
  const [updateProfileDialogStatus, setUpdateProfileDialogStatus] = React.useState(false)
  const handleProfileStatusDIalogChange = () => {
    setProfileDialogStatus(!profileDialogStatus)
  }
  const handleUpdateProfileStatusDialogChange = () => {
    setUpdateProfileDialogStatus(!updateProfileDialogStatus)
  }
  const { isLogin,user,getCurrentUser } = React.useContext(AuthenticationContext)
  const [currentUser, setCurrentUser] = React.useState<User | undefined>(user)
  const loadProfile = async () => {
    if(isLogin) getCurrentUser();
  }
  React.useEffect(() => {
    loadProfile()
  }, [])
  return (
    <MainLayout>
      <h1>WELL COME HOME !!!</h1>
      <ButtonOutlined text="PROFILE" onclick={handleProfileStatusDIalogChange}></ButtonOutlined>
      <ButtonOutlined text="UPDATE PROFILE" onclick={handleUpdateProfileStatusDialogChange}></ButtonOutlined>
      <DialogCard open={profileDialogStatus} onClose={handleProfileStatusDIalogChange}>
        {user !== undefined ? (
          <UserProfileCard user={user}></UserProfileCard>
        ) : (
          <h2 style={{ textAlign: "center" }}>Please login !!!</h2>
        )}
      </DialogCard>
      <DialogCard open={updateProfileDialogStatus} onClose={handleUpdateProfileStatusDialogChange}>
      {user !== undefined ? (
        <UpdateUserInformationCard user={user}></UpdateUserInformationCard>
      ) : (
        <h2 style={{ textAlign: "center" }}>Please login !!!</h2>
      )}
      </DialogCard>
    </MainLayout>
  )
}
