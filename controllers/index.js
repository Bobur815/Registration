import fs from "fs"
import path from "path"
import { log } from "util";

const GET = (req, res) => {
    let userJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/db/users.json"), "utf-8"))

    return res.status(200).json({
        userJson
    });
}
const GET_R = (req, res) => {
    let register = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/db/register.json"), "utf-8"))
    return res.status(200).json({
        register
    })
}

const USER_POST = (req, res) => {
    const users = req.body
    let userJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/db/users.json"), "utf-8"))
    let newuser = {
        id: userJson.length ? userJson[userJson.length - 1].id + 1 : 1,
        createdAt: new Date(),
        ...users
    }
    userJson.push(newuser)
    fs.writeFileSync(path.join(process.cwd(), "/db/users.json"), JSON.stringify(userJson, null, 2))
}
const REGISTER_POST = (req, res) => {
    const newUser = req.body;

    let usersReg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/db/register.json"), "utf-8"))

    let obj = {
        id: usersReg.length ? usersReg.at(-1).id + 1 : 1,
        ...newUser
    }
    usersReg.push(obj)
    fs.writeFileSync(path.join(process.cwd(), "/db/register.json"), JSON.stringify(usersReg, null, 4))
    res.status(201).json({ message: "Successfully registered" })
}
const LOGIN_POST = (req, res) => {
    let { email, password } = req.body
    let registers = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/db/register.json"), "utf-8"))
    const login = registers.find(register => register.email === email && register.password === password)
    if (login) {
        return res.status(200).json({ "token": "QpwL5tke4Pnpja7X4" })
    }
    else {
        return res.status(400).json({ "error": "Missing password" })
    }

}

export default {
    GET,
    GET_R,
    USER_POST,
    REGISTER_POST,
    LOGIN_POST
}