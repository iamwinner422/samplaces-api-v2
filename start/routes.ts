/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from "#start/kernel";
const AuthController = () => import('#controllers/auth_controller')
const InstrumentsController = () => import('#controllers/instruments_controller')

router.get('/', ({response}) => {
	response.redirect().toPath('/api')
})

router.group(() => {

	router.group(() => {
		router.post('/', [AuthController, 'login'])
		router.post('/register', [AuthController, 'register'])
	}).prefix('auth')

	router.group(() => {
		router.get('/', [InstrumentsController, 'all'])
		router.post('/', [InstrumentsController, 'add'])
		router.group(() => {
			router.put('/:id', [InstrumentsController, 'update'])
			router.delete('/:id', [InstrumentsController, 'delete'])
		}).where('id', {match: /^[0-9]+$/})


	}).prefix('instruments').use(middleware.auth())


}).prefix('api')
