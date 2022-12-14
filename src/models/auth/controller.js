'use strict'

const validator = require('./validator')
const userModel = require('../user/model')
const gymModel = require('../gym/model')
const jwtModel = require('../auth/model')
const helpers = require('../../helpers')
const config = require('../../config')
const Jwt = require('../../helpers/Jwt')
const {superAdminSendMail} = require('../../helpers/email')

module.exports = {
    register: async (req, res) => {
        try {
            const userData = req.body

            if (validator.validateRegister(userData)) {
                return res.status(422).json({
                    status: false,
                    message: 'Some user data is wrong!'
                })
            }

            const userByEmail = await userModel.getByEmail(userData.email)

            if (userByEmail) {
                return res.status(409).json({
                    status: false,
                    message: 'User already exists!'
                })
            }

            userData.password = await helpers.encryptPass(userData.password)
            const { protocol, hostname, baseUrl } = req
            
            if(userData.role === 'user'){
                const confirmationToken = await (new Jwt()).signConfirmationToken(userData);
                const gym = await gymModel.getById(userData.gymId)
                if(!gym) {
                    return res.status(404).json({
                        status: false,
                        message: 'The gym you are trying to sign up for doesn\'t exist'
                    })
                }
            
                const admin = await gymModel.getAdmin(userData.gymId)
                const confirmLocation = `${protocol}://${hostname}:${config.incomingPort}${baseUrl.slice(0, 7)}/auth/confirm/${confirmationToken}`
                if(admin){
                    superAdminSendMail({
                        to: admin.email,
                        subject: `New user ${userData.firstName} ${userData.lastName || ''}(${userData.email}) is trying to register to ${gym.name}`,
                        html: `
                        <p>If you do not want to accept the user, ignore this email.</p>
                        <a href="${confirmLocation}">Confirm user registration</a>`
                    })
                }
            }

            const newUser = await userModel.create(userData)
            const location = `${protocol}://${hostname}:${config.incomingPort}${baseUrl.slice(0, 7)}/user/${newUser.id}`

            return res
                .header('Location', location)
                .status(201)
                .json({
                    status: true,
                    data: newUser,
                    message: 'User has been created!'
                })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    login: async (req, res) => {
        try {
            const credentials = req.body

            const validateCredentials = validator.validateLogin(credentials)
            if (validateCredentials) {
                return res.status(422).json({
                    status: false,
                    message: 'Some credential is missed'
                })
            }

            const user = await userModel.getByEmail(credentials.email)
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad credentials'
                })
            }

            const match = validator.isPasswordMatching(credentials.password, user.password)
            if (!match) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad credentials'
                })
            }

            const { accessToken, refreshToken } = (new Jwt()).generateToken(user)
            jwtModel.saveAccessToken(user.id, accessToken)
            jwtModel.saveRefreshToken(user.id, refreshToken)

            return res.status(200).json({
                status: true,
                accessToken,
                refreshToken,
                message: 'You\'re successfully logged!'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    confirmation: async (req, res) => {
        try{
            const token = req.params.token
            const { email } = (new Jwt()).decodeToken(token)
            const user = await userModel.getByEmail(email);
            let status = 'Already registered';
            if(!user){
                status = 'Not found'
            }
            else if(!user.isAccepted){
                user.isAccepted = true
                await user.save()
                status = 'Accepted'
            }
            return res.redirect(`/confirmation.html?email=${email}&status=${status}`)
        }
        catch(error) {
            console.log(error)
            return res.redirect(`/error.html`)
        }
    },
    me: (req, res) => {
        try {
            const { protocol, hostname, baseUrl, user } = req
            const location = `${protocol}://${hostname}:${config.incomingPort}${baseUrl.slice(0, 7)}/user/${user.id}`

            return res
                .header('Location', location)
                .status(200)
                .json({
                    status: true,
                    data: user,
                    message: 'You\'ve got your personal data'
                })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    refreshToken: async (req, res) => {
        try {
            const JwtManager = new Jwt()
            const accessToken = req.header('Authorization').split(' ')[1]
            const refreshToken = req.body.refresh_token
            const isAccessTokenValid = await JwtManager.isAccessTokenValid(accessToken)
            const isRefreshTokenValid = await JwtManager.isRefreshTokenValid(refreshToken)
            let statusCode
            let body = {
                status: null,
                message: ''
            }

            if (!isRefreshTokenValid) {
                statusCode = 401
                body.status = false
                body.message = 'Login again please'
            }
            else if (!isAccessTokenValid && isRefreshTokenValid) {
                const refreshTokenDecoded = JwtManager.decodeToken(refreshToken)
                const user = await userModel.getByEmail(refreshTokenDecoded.email)
                const newAccessToken = JwtManager.signAccessToken(user)
                jwtModel.saveAccessToken(user._id, newAccessToken)

                statusCode = 200
                body.status = true
                body.accessToken = newAccessToken
                body.message = 'Your access token has been refreshed'
            }
            else if (isAccessTokenValid) {
                statusCode = 200
                body.status = true
                body.accessToken = accessToken
                body.message = 'Your access token is still valid'
            }
            else {
                statusCode = 409
                body.status = false
                body.message = 'There\'s a conflict with your refresh token'
            }

            return res.status(statusCode).json(body)
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    invalidateToken: async (req, res) => {
        try {
            const JwtManager = new Jwt()
            const token = req.header('Authorization')
            const accessToken = token.split(' ')[1]
            const isAccessTokenValid = JwtManager.isAccessTokenValid(accessToken)
            let body = {
                status: true,
                message: ''
            }

            if (!isAccessTokenValid) {
                body.message = 'Your token is already invalid'
            } else {
                JwtManager.invalidateAccessToken(accessToken)
                body.message = 'Your token has been revoked'
            }

            return res.status(200).json(body)
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    logout: (req, res) => {
        try {
            const JwtManager = new Jwt()
            const accessToken = req.header('Authorization').split(' ')[1]
            const { id } = JwtManager.decodeToken(accessToken)

            JwtManager.invalidateAllAccessTokens(id)
            JwtManager.invalidateAllRefreshTokens(id)

            return res.status(200).json({
                status: true,
                message: 'Successfully logged out'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    }
}