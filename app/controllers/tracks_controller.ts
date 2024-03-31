import type { HttpContext } from '@adonisjs/core/http'
import Song from "#models/song";
import TrackPolicy from "#policies/track_policy";

export default class TracksController {
	async store({ request, response, auth, bouncer}: HttpContext) {
		const songId: number = Number(request.qs().song_id)
		const song: Song = await Song.findOrFail(songId)
		const user = await auth.authenticate()
		if (await bouncer.with(TrackPolicy).denies('create', song)){
			return response.status(403).send({success: false, message: 'Forbidden!'})
		}

	}
}
