import type { HttpContext } from '@adonisjs/core/http'
import Song from "#models/song";
import SongPolicy from "#policies/song_policy";
import {AddValidator, UpdateValidator} from "#validators/song";
import Track from "#models/track";

export default class SongsController {
	async index({response, auth}: HttpContext){
		const user = await auth.authenticate()
		const songs: Song[] = await Song.query().with('tracks', (query) => {
			query.from('tracks').select('*').orderBy('name', 'asc')
		}).where('user_id', user.id).orderBy('title', 'asc')
		return response.status(200).send({success: true, data: songs})
	}

	async store({request, response, auth, bouncer}: HttpContext){
		if (await bouncer.with(SongPolicy).denies('create')){
			return response.status(403).send({success: false, message: 'Forbidden!'})
		}
		const user = await auth.authenticate()
		const { title } = await request.validateUsing(AddValidator)
		const song:Song = await Song.create({title})
		await song.related('user').associate(user)
		return response.status(201).send({success: true, data: song})
	}

	async show({response, params, bouncer}: HttpContext){
		const id: number = Number(params.id)
		const rawSong:Song = await Song.findOrFail(id)
		if (await bouncer.with(SongPolicy).denies('readOne', rawSong)){
			return response.status(403).send({success: false, message: 'Forbidden!'})
		}
		const tracks: Track[] = await rawSong.related('tracks').query().select('*')
		const song = rawSong.serialize()
		song.tracks = tracks
		return response.status(200).send({success: true, data: song})
	}

	async update({request, response, params, bouncer}: HttpContext){
		const id: number = Number(params.id)
		const song:Song = await Song.findOrFail(id)
		if (await bouncer.with(SongPolicy).denies('edit', song)){
			return response.status(403).send({success: false, message: 'Forbidden!'})
		}
		const { title, about, key, bpm } = await request.validateUsing(UpdateValidator)
		song.title = title
		song.about = about
		song.key = key
		song.bpm = bpm
		await song.save()
		return response.status(200).send({success: true, data: song})
	}

	async trashRestore({response, params, bouncer, request}: HttpContext){
		const id: number = Number(params.id)
		const action: string = request.qs().action
		const song:Song = await Song.findOrFail(id)
		if (await bouncer.with(SongPolicy).denies('edit', song)){
			return response.status(403).send({success: false, message: 'Forbidden!'})
		}
		switch(action){
			case 'trash':
				song.isDeleted = true
				await song.save()
				break
			case 'restore':
				song.isDeleted = false
				await song.save()
				break
			default:
				return response.status(400).send({success: false, message: 'Invalid action'})
		}
		return response.status(200).send({success: true, data: song})
	}

	async destroy({response, params, bouncer}: HttpContext){
		const id: number = Number(params.id)
		const song:Song = await Song.findOrFail(id)
		if (await bouncer.with(SongPolicy).denies('edit', song)){
			return response.status(403).send({success: false, message: 'Forbidden!'})
		}
		await song.delete()
		return response.status(200).send({success: true, data: song})
	}

}
