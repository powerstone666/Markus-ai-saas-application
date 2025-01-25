import { Router } from "express";
import { Conversation } from "../Controller/conversation.js";
import { Imagegeneration } from "../Controller/imagegeneration.js";
import { Musicgeneration } from "../Controller/musicgeneration.js";
import { Codeassist } from "../Controller/codeassist.js";
import { Websearch } from "../Controller/websearch.js";
import { Health } from "../Controller/health.js";
import { Register } from "../Controller/register.js";
import { Login } from "../Controller/login.js";


const router=Router()

router.route("/register").post(Register);

router.route("/login").post(Login);

router.route("/conversation").post(Conversation);

router.route("/imagegeneration").post(Imagegeneration);

router.route("/musicgeneration").post(Musicgeneration);

router.route("/codegeneration").post(Codeassist);

router.route("/aisearch").post(Websearch);

router.route("/").get(Health);


//router.route("/musicsuggestion").get(searchSuggestions);

export default router;