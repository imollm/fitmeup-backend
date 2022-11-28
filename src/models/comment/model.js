'use strict'

const commentDAO = require('./dao')

module.exports = {
    create: async (commentData) => {
        const comment = await commentDAO.create(commentData)
        return {
            _id: comment._id,
            comment: comment.comment,
            createdAt: comment.createdAt,
            userId: comment.userId,
            gymId: comment.gymId
        }
    },
    getComments: async (gymId) => {
        const result = await commentDAO.getComments(gymId)
        return result.map(data => {
            return {
                _id: data._id,
                comment: data.comment,
                createdAt: data.createdAt,
                userId: data.userId,
                gymId: data.gymId
            }
        })
    }
}