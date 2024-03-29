import vine from '@vinejs/vine'
import hasType from '#helpers/hastype'

const emailIdentifier = vine.object({
  type: vine.literal('email'),
  email: vine.string().trim().email()
})
const usernameIdentifier = vine.object({
  type: vine.literal('username'),
  username: vine.string().trim()
})
const identifier = vine.union([
  vine.union.if((value) => hasType(value, 'email'), emailIdentifier),
  vine.union.if((value) => hasType(value, 'username'), usernameIdentifier)
])

export const LoginValidator = vine.compile(
  vine.object({
    identifier: vine.array(identifier),
    password: vine.string().trim()
  })
)

export const RegisterValidator = vine.compile(
  vine.object({
    username: vine.string().trim().toLowerCase(),
    email: vine.string().trim().email().toLowerCase(),
    password: vine.string().trim().minLength(8).regex(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$'))
  })
)
