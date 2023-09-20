// import {roles} from '../../midlleware/auth'



export const endpoint = {
    delete : [roles.admin],
    changeStatus : [roles.admin],
    getAllRequests : [roles.admin],
}