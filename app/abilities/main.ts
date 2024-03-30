/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import { Bouncer, AuthorizationResponse } from '@adonisjs/bouncer'
import User from "#models/user";

/**
 * Delete the following ability to start from
 * scratch
 */
export const editUser = Bouncer.ability(() => {
  return true
})

export const manageInstruments = Bouncer.ability((user: User) => {
	if(user.isAdmin) {
		return true
	}
	return AuthorizationResponse.deny('Unauthorized!', 403)
})
