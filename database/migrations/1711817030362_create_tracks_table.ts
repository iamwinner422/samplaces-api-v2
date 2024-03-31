import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
	protected tableName = 'tracks'

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.string('name', 254).nullable()
			table.string('sample_or_preset').nullable()
			table.integer('instrument_id').unsigned().references('id').inTable('instruments').onDelete('set null')
			//table.integer('song_id').unsigned().references('id').inTable('songs').onDelete('cascade')
			table.timestamp('created_at')
			table.timestamp('updated_at')
		})
	}

	async down() {
		this.schema.dropTable(this.tableName)
	}
}
