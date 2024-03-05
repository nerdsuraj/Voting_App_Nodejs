let mongoose = require("mongoose");
let controller = {};

controller.findByQuery = (model, query, limit, skip, sort) => {
    try {
        let queryObj = query || {};
        let sortObj = sort || { _id:-1 };
        let limitVal = limit || 10000;
        let skipVal = skip || 0;
        return model
            .find(queryObj)
            .skip(skipVal)
            .limit(limitVal)
            .sort(sortObj)
    } catch (error) {
        return error;
    }
};

controller.findOne = (model, query, sort, skip) => {
    try {
        let queryObj = query || {};
        let sortObj = sort || { _id:-1 };
        let skipVal = skip || 0;
        return model
            .findOne(queryObj)
            .skip(skipVal)
            .sort(sortObj)
    } catch (error) {
        console.log(error);
    }
};

controller.createOne = (model, document) => {
    try {
        return model.create(document);
    } catch (error) {
        console.log(error);
    }
};

controller.aggregateQuery = (model, pipeline, options) => {
    try {
        return model.aggregate(pipeline, options).allowDiskUse(true);
    } catch (error) {
        console.log(error);
    }
};



controller.findByIdAndUpdate = (model, docId, updateObj) => {
    try {
        const objectId = new mongoose.Types.ObjectId(docId);
        return model.findByIdAndUpdate({ _id: objectId }, { $set: updateObj });
    } catch (error) {
        console.log(error);
    }
};

controller.findOneAndUpdate = (model, query, updateObj, options) => {
    try {
        let opt = options || {};
        return model.findOneAndUpdate(query, { $set: updateObj }, opt);
    } catch (error) {
        console.log(error);
    }
};


controller.update = (model, query, updateObj, options = {}) => {
    try {
        return model.updateMany(query, { $set: updateObj, ...options }, { multi: true });
    } catch (error) {
        console.log(error);
    }
};


controller.updateWithQuery = (model, query, updateQuery) => {
    try {
        return model.updateMany(query, updateQuery, { multi: true });
    } catch (error) {
        console.log(error);
    }
};

controller.addOrUpdate = (model, query, updateObj) => {
    try {
        return model.update(
            query, { $set: updateObj }, { multi: true, upsert: true }
        );
    } catch (error) {
        console.log(error);
    }
};





controller.createMany = (model, docArray) => {
    try {
        return model.insertMany(docArray,{
            ordered:false
        });
    } catch (error) {
        console.log(error);
    }
};

controller.deleteOne = (model, query) => {
    try {
        return model.deleteOne(query);
    } catch (error) {
        console.log(error);
    }
};
controller.deleteMany = (model, query) => {
    try {
        return model.deleteMany(query);
    } catch (error) {
        console.log(error);
    }
};

module.exports = controller;
