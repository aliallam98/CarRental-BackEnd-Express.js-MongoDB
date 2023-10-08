import { roles } from "../../midlleware/auth.js";


export const endpoint = {
    create : [roles.admin,roles.superAdmin],
    update : [roles.admin,roles.superAdmin],
    delete : [roles.superAdmin],
}