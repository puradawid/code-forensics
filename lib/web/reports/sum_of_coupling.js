var d3 = require('d3');

var filters = require('../filters/index.js'),
    Model   = require('../diagrams/bar_chart/vertical_bar_chart_model.js');

module.exports = function(manifest) {
  return {
    metadata: {
      title: 'Sum of coupling analysis',
      description: 'modules most frequently coupled with others in single commits',
      dateRange: manifest.parseDateRange()
    },
    graphModels: [
      {
        id: 'sum-of-coupling',
        dataFile: manifest.dataFiles[0].fileUrl,
        controlTemplates: {
          filters: [
            { id: 'text-filters', file: 'text_filters_control_template.html' }
          ]
        },
        diagram: {
          Model: Model,
          configuration: {
            style: {
              cssClass: 'bar-chart-diagram',
              width: 960,
              height: 680,
              margin: { top: 30, right: 10, bottom: 0, left: 10 },
              barWidth: 25,
              barColor: '#BFDDFB'
            },
            series: {
              x: { scale: d3.scaleLinear(), labelProperty: 'path', valueProperty: 'path' },
              y: { scale: d3.scaleLinear(), valueProperty: 'soc', labelProperty: '' }
            }
          },
          filters: {
            pathFilter: {
              instance: new filters.RegExpValue('File path'),
              group: 'text'
            }
          }
        }
      }
    ]
  };
};