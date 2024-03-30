import type { HttpContext } from '@adonisjs/core/http'
import {AddValidator, UpdateValidator} from "#validators/instrument";
import Instrument from "#models/instrument";

export default class InstrumentsController {
	async all({response}: HttpContext){
		const instruments: Instrument[] = await Instrument.query().orderBy('name', 'asc')
		return response.status(200).send({success: true, data: instruments})
	}

	async add({request, response}: HttpContext){
		const { name } = await request.validateUsing(AddValidator)
		const instrument = await Instrument.create({ name })
		return response.status(201).send({success: true, data: instrument})
	}

	async update({request, response, params}: HttpContext){
		const { name } = await request.validateUsing(UpdateValidator)
		const id: Number = Number(params.id)
		const instrument: Instrument = await Instrument.findOrFail(id)
		instrument.name = name
		await instrument.save()
		return response.status(200).send({success: true, data: instrument})
	}

	async delete({response, params}: HttpContext){
		const id: Number = Number(params.id)
		const instrument: Instrument = await Instrument.findOrFail(id)
		await instrument.delete()
		return response.status(200).send({success: true, data: instrument})
	}

}
