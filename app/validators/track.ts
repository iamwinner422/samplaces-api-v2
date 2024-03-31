import vine from '@vinejs/vine'


export const AddValidator = vine.compile(
	vine.object({
		tracks: vine.array(
			vine.object({
				name: vine.string().trim().minLength(2).maxLength(254),
				sampleOrPreset: vine.string().trim().minLength(2),
				instrument_id: vine.number(),
				song_id: vine.number(),
			})
		)
	})
)
