import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tracks'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
		table.integer('song_id').unsigned().references('id').inTable('songs').onDelete('cascade').after('instrument_id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
