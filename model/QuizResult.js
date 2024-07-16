import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    engineeringField: {
        type: String,
        required: true,
        enum: ['Computer', 'Civil']
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    solvedQuestions: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

export default QuizResult;
