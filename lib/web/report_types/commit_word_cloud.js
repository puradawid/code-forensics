var _  = require('lodash');

var DiagramModel = require('../diagrams/word_cloud/diagram_model.js'),
    filters      = require('../filters/index.js');

module.exports = function(manifest) {
  return {
    metadata: {
      title: 'Commit vocabulary',
      description: 'Word cloud of commit messages',
      dateRange: manifest.parseDateRange()
    },
    graphModels: _.map(manifest.dataFiles, function(data) {
      var dates = data.timePeriod.split('_');
      return {
        id: 'cwc-' + data.timePeriod,
        label: 'from ' + dates[0] + ' to ' + dates[1],
        dataFile: data.fileUrl,
        templates: [
          { name: 'controls-template', type: 'ko', id: 'range-filters-control-template', file: 'range-filters-control-template.html' }
        ],
        diagram: {
          type: 'word_cloud',
          Model: DiagramModel,
          configuration: {
            style: {
              cssClass: 'word-cloud',
              width: 960,
              height: 700,
              wordPadding: 10,
              minFontSize: 7
            },
            filters: {
              wordOccurenciesFilter: new filters.RoundedMetricRange('Word occurency')
            }
          }
        }
      };
    })
  };
};