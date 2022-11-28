'use strict'

const validator = require('./validator')
const userModel = require('../user/model')
const commentModel = require('./model')
const Jwt = require('../../helpers/Jwt')

module.exports = {
    create: async (req, res) => {
        try {
            const comment = req.body
            const gymId = req.params.gymId
      
            if (validator.validateCreation(comment)) {
                return res.status(422).json({
                    status: false,
                    message: 'Some comment data is wrong!'
                })
            }
      
            const JwtManager = new Jwt()
            const accessToken = req.header('Authorization').split(' ')[1]
            const tokenDecoded = JwtManager.decodeToken(accessToken)
            if (tokenDecoded.role === 'admin') {
              return res.status(403).json({
                status: false,
                message: 'As a gym administrator you cannot create comments!'
              })
            }
      
            const user = await userModel.getByEmail(tokenDecoded.email)
            if (user.gymId !== gymId) {
                return res.status(403).json({
                    status: false,
                    message: 'You cannot add a comment in a gym where you are not registered!'
                })
            }
      
            comment.userId = user._id
            comment.gymId = gymId
            const newComment = await commentModel.create(comment)
            return res.status(201).json({
                status: true,
                data: newComment,
                message: 'Comment has been created!'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    list:  async (req, res) => {
        try {
          const gymId = req.params.gymId
    
          const comments = await commentModel.getComments(gymId)
          return res.status(200).json({
            status: true,
            data: comments,
            message: 'Comments from gym'
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