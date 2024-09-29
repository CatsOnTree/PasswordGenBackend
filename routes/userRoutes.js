import express from 'express'
import { registerUser, loginUser, currentUser, currentUserPassword  ,  getAllUsers, coldStartServer} from '../controllers/userController.js'
const router = express.Router()


router.route('/signup').post(registerUser)
router.route('/signin').post(loginUser)
router.route('/profile/:id').get(currentUser)
router.route('/password/:id').get(currentUserPassword)
router.route('/admin/:id').get(getAllUsers)
router.route('/coldstart').get(coldStartServer)


export default router