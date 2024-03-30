import User from '#models/user'
import Song from '#models/song'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class SongPolicy extends BasePolicy {
	/**
	 * Every logged-in user can create
	 */
	create(user: User): AuthorizerResponse {
		return true
	}

	readOne(user: User, song: Song): AuthorizerResponse {
		return user.id === song.userId
	}

	/**
	 * Only the post creator can edit
	 */
	edit(user: User, song: Song): AuthorizerResponse {
		return user.id === song.userId
	}

	/**
	 * Only the post creator can delete
	 */
	delete(user: User, song: Song): AuthorizerResponse {
		return user.id === song.userId
	}
}
