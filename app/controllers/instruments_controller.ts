import type { HttpContext } from '@adonisjs/core/http'
import {AddValidator} from "#validators/instrument";
import Instrument from "#models/instrument";

export default class InstrumentsController {
	async all({request, response}: HttpContext){
		const instruments: Instrument[] = await Instrument.query().orderBy('name', 'asc')
		return response.status(200).send({success: true, data: instruments})
	}
	async add ({request, response}: HttpContext){
		const { name } = await request.validateUsing(AddValidator)
		const instrument: Instrument = await Instrument.create({name: name})
		return response.status(201).send({success: true, data: instrument})
	}
}
