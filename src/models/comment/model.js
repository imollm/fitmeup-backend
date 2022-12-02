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
        const comments = await commentDAO.getComments(gymId)
        return comments.map(comment => {
            return {
                _id: comment._id,
                comment: comment.comment,
                createdAt: comment.createdAt,
                userId: comment.userId,
                gymId: comment.gymId
            }
        })
    }
}