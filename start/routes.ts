/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')



router.get('/', ({ response }) => {
  response.redirect().toPath('/api')
})

router.group(() => {
  router.group(() => {
    router.post('/register', [AuthController, 'register'])
  }).prefix('auth')
}).prefix('api')
