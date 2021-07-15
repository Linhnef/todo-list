import { MainLayout } from "../layouts/MainLayout"
import { UserProfileCard } from "../components/UserProfileCard"
import { useState } from "react"
import { User } from "../services/api/types/User"
import { api } from "../container"
import { UseAppApiClient } from "../hooks/useAppApiClient"
import { useContext } from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useEffect } from "react"

export const Profile = () => {
  const [user, setUser] = useState<User>()
  const { token } = useContext(AuthenticationContext)
  const loadProfile = async () => {
    if (token !== undefined && token !== null) {
      api.defaults.headers.common["Content-Type"] = "application/json"
      api.defaults.headers.common["Accept"] = "application/json"
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      const response = await UseAppApiClient().getCurrentUser();
      setUser(response)
    }
  }
  useEffect(() => {
    loadProfile()
  }, [])
  return (
    <MainLayout>
      {user !== undefined ? <UserProfileCard user={user}></UserProfileCard> : <h2 style={{ textAlign: "center" }}>Please login !!!</h2>}
    </MainLayout>
  )
}
