import type { HttpContext } from '@adonisjs/core/http'
import {AddValidator, UpdateValidator} from "#validators/instrument";
import {manageInstruments} from "#abilities/main";
import Instrument from "#models/instrument";

export default class InstrumentsController {
	async index({response}: HttpContext){
		const instruments: Instrument[] = await Instrument.query().orderBy('name', 'asc')
		return response.status(200).send({success: true, data: instruments})
	}

	async store({request, response, bouncer}: HttpContext){
		if (await bouncer.denies(manageInstruments)){
			return response.status(403).send({success: false, message: 'Unauthorized!'})
		}
		const { name } = await request.validateUsing(AddValidator)
		const instrument = await Instrument.create({ name })
		return response.status(201).send({success: true, data: instrument})
	}

	async update({request, response, params, bouncer}: HttpContext){
		if (await bouncer.denies(manageInstruments)){
			return response.status(403).send({success: false, message: 'Unauthorized!'})
		}
		const { name } = await request.validateUsing(UpdateValidator)
		const id: Number = Number(params.id)
		const instrument: Instrument = await Instrument.findOrFail(id)
		instrument.name = name;
		await instrument.save()
		return response.status(200).send({success: true, data: instrument})
	}

	async destroy({response, params, bouncer}: HttpContext){
		if (await bouncer.denies(manageInstruments)){
			return response.status(403).send({success: false, message: 'Unauthorized!'})
		}
		const id: Number = Number(params.id)
		const instrument: Instrument = await Instrument.findOrFail(id)
		await instrument.delete()
		return response.status(200).send({success: true, data: instrument})
	}

}
