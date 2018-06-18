var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}

function findSectionById(sectionId) {
    var section = sectionModel.findById(sectionId);
    return section;
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    });
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: +1}
    });
}

function deleteSection(sectionId) {
    return sectionModel.remove({_id: sectionId});
}

function updateSection(section, sectionId) {
    return sectionModel.update({_id: sectionId}, {$set: section});
}

module.exports = {
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats,
    findSectionById: findSectionById,
    deleteSection: deleteSection,
    updateSection: updateSection
};