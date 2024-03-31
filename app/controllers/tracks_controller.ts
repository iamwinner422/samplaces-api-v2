import type { HttpContext } from '@adonisjs/core/http'
import Song from "#models/song";
import TrackPolicy from "#policies/track_policy";
import {AddValidator} from "#validators/track";
import Track from "#models/track";
import Instrument from "#models/instrument";
import SongPolicy from "#policies/song_policy";

export default class TracksController {
	async store({ request, response, bouncer}: HttpContext) {
		const songId: number = Number(request.qs().song_id)
		const song: Song = await Song.findOrFail(songId)
		if (await bouncer.with(TrackPolicy).denies('create', song)){
			return response.status(403).send({success: false, message: 'Forbidden!'})
		}
		const { tracks } = await request.validateUsing(AddValidator)

		for(const track of tracks){
			const instrument: Instrument = await Instrument.findOrFail(track.instrument_id)
			const createdTrack: Track = await Track.create({...track})
			await createdTrack.related('song').associate(song)
			await createdTrack.related('instrument').save(instrument)
		}
		await song.refresh()
		return response.status(201).send({success: true, data: song})
	}

	async destroy({request, response, params, bouncer}: HttpContext){
		const songId: number = Number(request.qs().song_id)
		const song: Song = await Song.findOrFail(songId)
		const trackId: number = Number(params.id)
		const track: Track = await Track.findOrFail(trackId)
		if (await bouncer.with(TrackPolicy).denies('delete', track, song)){
			return response.status(403).send({success: false, message: 'Forbidden!'})
		}
		await track.delete()
		return response.status(200).send({success: true, data: track})
	}

	async destroyManyBySong({request, response, bouncer}: HttpContext){
		const songId: number = Number(request.qs().song_id)
		const song: Song = await Song.findOrFail(songId)
		if (await bouncer.with(SongPolicy).denies('delete', song)){
			return response.status(403).send({success: false, message: 'Forbidden!'})
		}
		await Track.query().where('song_id', songId).delete()
		await song.refresh()
		return response.status(200).send({success: true, data: song})
	}
}
