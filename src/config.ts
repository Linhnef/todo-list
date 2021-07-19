export const getAppConfig = () => {
  return {
    api: {
      host: process.env.REACT_APP_API_HOST || "https://api-nodejs-todolist.herokuapp.com",
    },
  }
}
