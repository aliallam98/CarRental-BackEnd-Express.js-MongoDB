




export const hash = ({plainText, saltRounds = parseInt(process.env.SALT_ROUNDS)}={})=>{
    const hashPassword = bcrypt.hashSync(plainText, saltRounds);
    return hashPassword
}

export const compare = ({plainText, hashValue}={})=>{
    const match = bcrypt.comareSync(plainText, hashValue)
    return match
}