import { getAppConfig } from "./config"
import { getAppLinks } from "./links"
import { createApiClient } from "./services/api/createApiClient"
import { createAppApiClient } from "./services/api/createAppApiClient"

const config = getAppConfig()
const links = getAppLinks()
export const api = createApiClient({ baseURL: config.api.host })
const apiClient = createAppApiClient(api);

export const getAppContainer = () => ({
  config,
  links,
  apiClient,
})
