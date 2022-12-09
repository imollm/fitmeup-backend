'use strict'

const commentDAO = require('./dao')

const commentStdObj = (comment) => {
    return {
        id: comment._id,
        comment: comment.comment,
        createdAt: comment.createdAt,
        userId: comment.userId,
        gymId: comment.gymId,
    }
}

module.exports = {
    create: async (commentData) => {
        const comment = await commentDAO.create(commentData)
        return commentStdObj(comment)
    },
    getComments: async (gymId) => {
        const comments = await commentDAO.getComments(gymId)
        return comments.map(comment => {
            return commentStdObj(comment)
        })
    }
}