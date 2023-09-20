import multer from "multer";

export const allowedFiles = {
    image:"image",
    video:"video",
    application:"application"
}
export const fileUpload = (fileVlidation)=>{
    const storage = multer.diskStorage({})
    const fileFilter = (req,file,cb)=>{
        if(!file.mimetype.startsWith(fileVlidation)){
            cb(new Error("Invalid File Format",{ cause: 400 }), false)

        }else(
            cb(null,true)
        )
    }


    const upload = multer({fileFilter,storage})
    return upload
}
