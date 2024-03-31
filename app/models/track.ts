import {DateTime} from 'luxon'
import type {BelongsTo, HasOne} from '@adonisjs/lucid/types/relations'
import {BaseModel, belongsTo, column, hasOne} from '@adonisjs/lucid/orm'
import Instrument from "#models/instrument";
import Song from "#models/song";

export default class Track extends BaseModel {
	@column({isPrimary: true})
	declare id: number
	@column()
	declare name: string | null
	@column({columnName: 'sample_or_preset'})
	declare sampleOrPreset: string | null
	@column()
	declare songId: number
	@column.dateTime({autoCreate: true})
	declare createdAt: DateTime
	@column.dateTime({autoCreate: true, autoUpdate: true})
	declare updatedAt: DateTime

	@hasOne(() => Instrument)
	declare instrument: HasOne<typeof Instrument>
	@belongsTo(() => Song)
	declare song: BelongsTo<typeof Song>
}
