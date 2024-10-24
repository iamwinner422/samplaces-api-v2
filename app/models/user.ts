import {DateTime} from 'luxon'
import {withAuthFinder} from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import {compose} from '@adonisjs/core/helpers'
import {BaseModel, column, hasMany} from '@adonisjs/lucid/orm'
import {DbAccessTokensProvider} from '@adonisjs/auth/access_tokens'
import Song from "#models/song";
import type {HasMany} from "@adonisjs/lucid/types/relations";

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
	uids: ['username'],
	passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
	@column({isPrimary: true})
	declare id: number
	@column()
	declare name: string | null
	@column()
	declare username: string
	@column()
	declare email: string
	@column()
	declare password: string
	@column()
	declare isAdmin: boolean
	@column.dateTime({autoCreate: true})
	declare createdAt: DateTime
	@column.dateTime({autoCreate: true, autoUpdate: true})
	declare updatedAt: DateTime | null

	@hasMany(() => Song)
	declare songs: HasMany<typeof Song>


	static accessTokens = DbAccessTokensProvider.forModel(User, {
		prefix: 'spls_',
		expiresIn: '7d',
		tokenSecretLength: 40,
	})
}
