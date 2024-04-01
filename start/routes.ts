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
import TracksController from "#controllers/tracks_controller";
const AuthController = () => import('#controllers/auth_controller')
const InstrumentsController = () => import('#controllers/instruments_controller')
const SongsController = ()=> import('#controllers/songs_controller')

router.get('/', ({response}) => {
	response.redirect().toPath('/api')
})

router.group(() => {
	router.get('/', async ()=> {
		return {success: true, data:{name: "Samplaces APIs", team: "lab'el® Creative", author: {name: "iamwinner422", link: "https://github.com/iamwinner422"}}}
	})

	router.group(() => {
		router.post('/', [AuthController, 'login'])
		router.post('/register', [AuthController, 'register'])
	}).prefix('auth')

	router.group(() => {
		router.get('/', [InstrumentsController, 'index'])
		router.post('/', [InstrumentsController, 'store'])
		router.group(() => {
			router.put('/:id', [InstrumentsController, 'update'])
			router.delete('/:id', [InstrumentsController, 'destroy'])
		}).where('id', {match: /^[0-9]+$/})
	}).prefix('instruments').use(middleware.auth())

	router.group(() => {
		router.get('/', [SongsController, 'index'])
		router.post('/', [SongsController, 'store'])
		router.group(() => {
			router.get('/:id', [SongsController, 'show'])
			router.put('/:id', [SongsController, 'update'])
			router.put('/trash-restore/:id', [SongsController, 'trashRestore'])
			router.delete('/:id', [SongsController, 'destroy'])
		}).where('id', {match: /^[0-9]+$/})
	}).prefix('songs').use(middleware.auth())

	router.group(() => {
		router.post('/', [TracksController, 'store'])
		router.delete('/:id', [TracksController, 'destroy']).where('id', {match: /^[0-9]+$/})
		router.delete('/all', [TracksController, 'destroyManyBySong'])
	}).prefix('tracks').where('song_id', {match: /^[0-9]+$/}).use(middleware.auth())

}).prefix('api')
