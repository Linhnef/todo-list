import { MainLayout } from "../layouts/MainLayout"
import { useState } from "react"
import { User } from "../services/api/types/User"
import { api } from "../container"
import { UseAppApiClient } from "../hooks/useAppApiClient"
import { useContext } from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useEffect } from "react"
import { UpdateUserInformationCard } from "../components/UpdateUserInformationCard"

export const Update = () => {
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
      {user !== undefined ? <UpdateUserInformationCard user={user}></UpdateUserInformationCard> : <h2 style={{ textAlign: "center" }}>Please login !!!</h2>}
    </MainLayout>
  )
}
