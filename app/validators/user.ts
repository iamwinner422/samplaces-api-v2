import vine from '@vinejs/vine'




/*
function hasType(value: unknown, type: string) {
  return vine.helpers.isObject(value) && value.type === type
}

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
*/

export const LoginValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
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
