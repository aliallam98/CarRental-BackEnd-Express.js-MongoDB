// import {roles} from '../../midlleware/auth'

import { roles } from "../../midlleware/auth.js";



export const endpoint = {
    delete : [roles.admin],
    change : [roles.admin],
    get : [roles.admin],
}