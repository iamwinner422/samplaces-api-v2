import app from '@adonisjs/core/services/app'
import {HttpContext, ExceptionHandler} from '@adonisjs/core/http'
import {errors} from '@adonisjs/core'
import {errors as AuthErrors} from '@adonisjs/auth'
import {errors as VineErrors} from '@vinejs/vine'

export default class HttpExceptionHandler extends ExceptionHandler {
	/**
	 * In debug mode, the exception handler will display verbose errors
	 * with pretty printed stack traces.
	 */
	protected debug = !app.inProduction

	/**
	 * The method is used for handling errors and returning
	 * response to the client
	 */
	async handle(error: unknown, ctx: HttpContext) {
		console.log('Error', error)
		if (error instanceof errors.E_ROUTE_NOT_FOUND) {
			return ctx.response.status(error.status).send({
				success: false,
				message: 'Route not found',
			})
		}

		if (error instanceof AuthErrors.E_UNAUTHORIZED_ACCESS) {
			return ctx.response.status(error.status).send({
				success: false,
				message: 'Unauthorized!',
			})
		}

		if (error instanceof VineErrors.E_VALIDATION_ERROR) {
			return ctx.response.status(error.status).send({
				success: false,
				message: error.messages,
			})
		}

		// custom error
		const customError = error as any

		switch (customError.code) {
			case 'E_MISSING_MODEL_ATTRIBUTE':
				return ctx.response.status(customError.status).send({
					success: false,
					message: customError.message,
				})
			case 'E_INVALID_CREDENTIALS':
				return ctx.response.status(401).send({
					success: false,
					message: customError.message,
				})
			case 'E_ROW_NOT_FOUND':
				return ctx.response.status(customError.status).send({
					success: false,
					message: 'Not Found!',
				})
			case 'ER_ROW_IS_REFERENCED_2':
				return ctx.response.status(customError.status).send({
					success: false,
					message: 'Data that has been used cannot be deleted!',
				})
			case '23505':
				return ctx.response.status(422).send({
					success: false,
					message: 'Already Exist!'
				})
			default:
				return ctx.response.status(customError.status).send({
					success: false,
					message: customError.message,
				})
		}

		//return super.handle(error, ctx)
	}

	/**
	 * The method is used to report error to the logging service or
	 * the third party error monitoring service.
	 *
	 * @note You should not attempt to send a response from this method.
	 */
	async report(error: unknown, ctx: HttpContext) {
		return super.report(error, ctx)
	}
}
