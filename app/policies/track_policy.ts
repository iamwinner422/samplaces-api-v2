import User from '#models/user'
import Track from '#models/track'
import Song from '#models/song'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class TrackPolicy extends BasePolicy {
	/**
	 * Every logged-in user can create
	 */
	create(user: User, song: Song): AuthorizerResponse {
		return user.id === song.userId
	}

	readOne(user: User, track: Track, song: Song): AuthorizerResponse {
		return user.id === song.userId && song.id === track.songId
	}

	/**
	 * Only the post creator can edit
	 */
	edit(user: User, track: Track, song: Song): AuthorizerResponse {
		return user.id === song.userId && song.id === track.songId
	}

	/**
	 * Only the track creator can delete
	 */
	delete(user: User, track: Track, song: Song): AuthorizerResponse {
		return user.id === song.userId && song.id === track.songId
	}
}
