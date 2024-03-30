import type { HttpContext } from '@adonisjs/core/http'
import Song from "#models/song";
import SongPolicy from "#policies/song_policy";

import {AddValidator} from "#validators/song";

export default class SongsController {
	async index({response, auth}: HttpContext){
		const user = await auth.authenticate()
		const songs: Song[] = await Song.query().with('tracks', (query) => {
			query.from('tracks').select('*')
		}).select('*').from('tracks').where('user_id', user.id).orderBy('name', 'asc')
		return response.status(200).send({success: true, data: songs})
	}

	async store({request, response, auth, bouncer}: HttpContext){
		if(await bouncer.with(SongPolicy).denies('create')){
			return response.status(403).send({success: false, message: 'Forbidden!'})
		}
		const user = await auth.authenticate()
		const { title } = await request.validateUsing(AddValidator)
		const song:Song = await Song.create({title})
		await song.related('user').associate(user)
		return response.status(201).send({success: true, data: song})
	}
}
