import {DateTime} from 'luxon'
import {BaseModel, belongsTo, column, hasMany} from '@adonisjs/lucid/orm'
import type {BelongsTo, HasMany} from "@adonisjs/lucid/types/relations";
import Track from "#models/track";
import User from "#models/user";

export default class Song extends BaseModel {
	@column({isPrimary: true})
	declare id: number
	@column()
	declare title: string | null
	@column()
	declare about: string | null
	@column()
	declare key: string | null
	@column()
	declare bpm: string | null
	@column({columnName: 'is_deleted'})
	declare isDeleted: boolean
	@column()
	declare userId: number
	@column.dateTime({autoCreate: true})
	declare createdAt: DateTime
	@column.dateTime({autoCreate: true, autoUpdate: true})
	declare updatedAt: DateTime

	@hasMany(() => Track)
	declare tracks: HasMany<typeof Track>
	@belongsTo(() => User)
	declare user: BelongsTo<typeof User>

}
