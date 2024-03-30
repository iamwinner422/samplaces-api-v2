import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
	protected tableName = 'songs'

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.string('title', 254).nullable()
			table.string('about').nullable()
			table.string('key', 10).nullable()
			table.string('bpm', 5).nullable()
			table.timestamp('created_at')
			table.timestamp('updated_at')
		})
	}

	async down() {
		this.schema.dropTable(this.tableName)
	}
}
