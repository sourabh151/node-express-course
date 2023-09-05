//jshint esversion:10 
const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

//asyncWrapper returns a function in place
const getTasks = asyncWrapper(async (req, res) => {
    // console.log(Task.db());
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});
//console.log(getTasks.toString());

const postTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    if (!task) {
        //return next sends the error down to any error handler ready to inercept it
        //having a function signature of four params.
        return next(createCustomError(`no task with id ${id}`, 404));
    }
    res.status(200).json({ task });
    // res.send(id);
});

const patchTask = asyncWrapper(async (req, res,next) => {

    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({
        _id: taskID
    }, req.body, {
        new: true,
        runValidators: true
    });
    // const task = await Task.remove({});
    if (!task) {
        return next(createCustomError(`no task with id ${id}`, 404));

    }
    res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res,next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    // const task = await Task.remove({});
    if (!task) {
        return next(createCustomError(`no task with id ${id}`, 404));

    }
    res.status(200).json({ task });
});
module.exports = {
    getTasks,
    postTask,
    getTask,
    patchTask,
    deleteTask,
};