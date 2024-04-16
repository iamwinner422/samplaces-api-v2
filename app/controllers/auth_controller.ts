import type { HttpContext } from '@adonisjs/core/http'
import {LoginValidator, RegisterValidator} from "#validators/user";
import User from "#models/user";

export default class AuthController {
  async login({ request, response}: HttpContext){
    const {username, password} = await request.validateUsing(LoginValidator)
    const rawUser = await User.verifyCredentials(username, password)
    if (!rawUser){
      return response.status(401).send({success: false, message: 'Unauthorized!'})
    }
    const accessToken = await User.accessTokens.create(rawUser)
    const {token} = accessToken.toJSON()
    const user = rawUser.serialize()
    user.token = token
    delete user.id
    delete user.password
    delete user.role
    return response.status(200).send({success: true, data: user})
  }

  async register({ request, response}: HttpContext){
    const payload = await request.validateUsing(RegisterValidator)
    await User.create(payload)
    return response.status(201).send({success: true, message: "User created!"})
  }
}
