import { createContext } from "react"


export const RoleCodesContext = createContext()

const RoleCodesProvider = ({ children }) => {


  const ADMIN_ROLE_CODE = 'nahid$adminstrator$dashboard$root'
  const MANAGER_ROLE_CODE = 'nahid$manager$dashboard$'
  const USER_ROLE_CODE = 'nahid$dashboard$user$'

  return (
    <RoleCodesContext.Provider value={{ ADMIN_ROLE_CODE, MANAGER_ROLE_CODE, USER_ROLE_CODE }}>
      {children}
    </RoleCodesContext.Provider>
  )
}

export default RoleCodesProvider