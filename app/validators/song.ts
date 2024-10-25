import vine from '@vinejs/vine'

export const AddValidator = vine.compile(
	vine.object({
		title: vine.string().trim().minLength(2).maxLength(254),
		about: vine.string().trim().minLength(2).nullable(),
	})
)
export const UpdateValidator = vine.compile(
	vine.object({
		title: vine.string().trim().minLength(2).maxLength(254),
		about: vine.string().trim().minLength(2).nullable(),
		key: vine.string().trim().nullable(),
		bpm: vine.string().trim().nullable()
	})
)
