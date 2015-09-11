describe('ctPointLabels', function () {
  'use strict';

  var chart;
  var listeners;
  var event; 
  
  beforeEach(function () {
    listeners = {};
    chart = {
      container : document.createElement('div'),
      on : function(event) {}  
    };
    event = {
      target: document.createElement('div')
    };
    event.target.className = 'ct-point';
    event.target.setAttribute('ct:value', '42');
    event.originalEvent = {
      layerY: 0,
      layerX: 0
    };
    
    chart.container.addEventListener = function(event, listener) {
      listeners[event] = listener;
    }
    
    var tooltip = window.Chartist.plugins.tooltip();
    tooltip(chart);
  });

  function getTooltip() {
    return chart.container.querySelector('div.chartist-tooltip');    
  }

  it('should be defined in chartist', function () {
    expect(window.Chartist.plugins.tooltip).toBeDefined();
  });
  
  it('should append tooltip', function() {
    expect(getTooltip()).toBeDefined();
  });
  
  it('should not append tooltip twice', function() {
    expect(getTooltip()).toBeDefined();
    window.Chartist.plugins.tooltip()(chart);
    var all = chart.container.querySelectorAll('div.chartist-tooltip');
    expect(all.length).toBe(1);
  });
  
  it('should hide tooltip', function() {
    expect(getTooltip().style.display).toBe('none');    
  });
  
  it('should show tooltip on mouse enter', function() {
    listeners['mouseover'](event);
    expect(getTooltip().style.display).toBe('block');
  });
    
  it('should hide tooltip on mouse leave', function() {
    listeners['mouseover'](event);
    listeners['mouseout'](event);
    expect(getTooltip().style.display).toBe('none');
  });
  
  it('should set tooltip text', function() {
    listeners['mouseover'](event);
    expect(getTooltip().innerHTML).toContain('42');
  });
    
  it('should set tooltip position', function() {
    event.layerX = 100;
    event.layerY = 200;
    listeners['mousemove'](event);
    expect(getTooltip().style.left).toMatch(/^\d+px$/);
    expect(getTooltip().style.top).toMatch(/^\d+px$/);
  });
});
