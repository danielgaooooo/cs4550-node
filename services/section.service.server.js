module.exports = function (app) {

    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.get('/api/section/:sectionId', findSectionById);
    app.delete('/api/section/:sectionId', deleteSection);
    app.put('/api/section/:sectionId', updateSection);

    var sectionModel = require('../models/section/section.model.server');

    function deleteSection(req, res) {
        var sectionId = req.params['sectionId'];
        sectionModel.deleteSection(sectionId)
            .then(function (response) {
                res.json(response);
            })
    }

    function updateSection(req, res) {
        var section = req.body;
        var sectionId = req.params['sectionId'];
        sectionModel.updateSection(section, sectionId)
            .then(function (response) {
                res.json(response);
            })
    }

    function findSectionById(req, res) {
        var sectionId = req.params['sectionId'];
        sectionModel.findSectionById(sectionId)
            .then(function (response) {
                res.json(response);
            })
    }

    function findSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function createSection(req, res) {
        var section = req.body;
        var courseId = req.params['courseId'];
        //section.courseId = courseId;
        sectionModel
            .createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }
};