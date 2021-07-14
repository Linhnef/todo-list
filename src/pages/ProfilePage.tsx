import { MainLayout } from "../layouts/MainLayout"
import { Profile } from "../components/Profile"
import { useState } from "react"
import { User } from "../services/api/types/User"
import { api } from "../container"
import { UseAppApiClient } from "../hooks/useAppApiClient"
import { useContext } from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useEffect } from "react"

export const ProfilePage = () => {
  const [user, setUser] = useState<User>()
  const { token } = useContext(AuthenticationContext)
  const loadProfile = async () => {
    if (token !== undefined && token !== null) {
      api.defaults.headers.common["Content-Type"] = "application/json"
      api.defaults.headers.common["Accept"] = "application/json"
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      const response = await UseAppApiClient().profile()
      setUser(response)
    }
  }
  useEffect(() => {
    loadProfile()
  }, [])
  return (
    <MainLayout>
      {user !== undefined ? <Profile user={user}></Profile> : <h2 style={{ textAlign: "center" }}>Error</h2>}
    </MainLayout>
  )
}
