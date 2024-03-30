import vine from '@vinejs/vine'

export const AddValidator = vine.compile(
	vine.object({
		title: vine.string().trim().minLength(2).maxLength(254),
	})
)
export const UpdateValidator = vine.compile(
	vine.object({
		title: vine.string().trim().minLength(2).maxLength(254),
		about: vine.string().trim().nullable(),
		key: vine.string().trim().nullable(),
		bpm: vine.number().nullable()
	})
)
