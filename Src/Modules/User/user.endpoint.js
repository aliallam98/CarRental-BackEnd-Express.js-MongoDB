

import { roles } from "../../midlleware/auth.js";



export const endpoint = {
    signup : [roles.superAdmin],
    logout : [roles.admin,roles.superAdmin],
    change : [roles.admin,roles.superAdmin],
}