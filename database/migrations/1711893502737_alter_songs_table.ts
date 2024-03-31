import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
	protected tableName = 'songs'

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.dropColumn('id_deleted')
			table.boolean('is_deleted').defaultTo(false)
		})
	}

	async down() {
		this.schema.dropTable(this.tableName)
	}
}
