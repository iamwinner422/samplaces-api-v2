import type { HttpContext } from '@adonisjs/core/http'
import {RegisterValidator} from "#validators/user";
import User from "#models/user";

export default class UsersController {
  async login({ request, response}: HttpContext){
  }
  async register({ request, response}: HttpContext){
    const payload = await request.validateUsing(RegisterValidator)
    const userRaw = await User.create(payload)
    const user = userRaw.serialize()
    delete user.id
    delete user.password
    delete user.role
    return response.status(201).send({success: true, data: user})
  }
}
