import 'text-encoding-polyfill'
import JOI from "joi";

export const schemaOeuvre = JOI.object({
    nom : JOI.string().min(3).max(255).required() ,
    description : JOI.string().min(1).max(10000).required(),
    auteur : JOI.string().min(1).max(255).required(),
    image : JOI.string().min(1).max(10000).required(),
});