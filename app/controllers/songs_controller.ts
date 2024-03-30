import type { HttpContext } from '@adonisjs/core/http'
import Song from "#models/song";
import Track from "#models/track";

export default class SongsController {
	async index({response, auth}: HttpContext){
		const user = await auth.authenticate()
		const songs: Song[] = await Song.query().with('tracks', (query) => {
			query.from('tracks').select('*')
		}).select('*').from('tracks').where('user_id', user.id).orderBy('name', 'asc')
		return response.status(200).send({success: true, data: songs})
	}
}
