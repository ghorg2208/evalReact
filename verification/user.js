import 'text-encoding-polyfill'
import JOI from "joi";

export const schemaUser = JOI.object({
    login : JOI.string().min(3).max(255).required() ,
    password : JOI.string().min(3).max(255).required(),
    role: JOI.boolean().required(),
});