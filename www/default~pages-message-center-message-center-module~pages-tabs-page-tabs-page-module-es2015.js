(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-message-center-message-center-module~pages-tabs-page-tabs-page-module"],{

/***/ "./node_modules/chartjs-plugin-annotation/src/annotation.js":
/*!******************************************************************!*\
  !*** ./node_modules/chartjs-plugin-annotation/src/annotation.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(Chart) {
	var chartHelpers = Chart.helpers;

	var helpers = __webpack_require__(/*! ./helpers.js */ "./node_modules/chartjs-plugin-annotation/src/helpers.js")(Chart);
	var events = __webpack_require__(/*! ./events.js */ "./node_modules/chartjs-plugin-annotation/src/events.js")(Chart);

	var annotationTypes = Chart.Annotation.types;

	function setAfterDataLimitsHook(axisOptions) {
		helpers.decorate(axisOptions, 'afterDataLimits', function(previous, scale) {
			if (previous) previous(scale);
			helpers.adjustScaleRange(scale);
		});
	}

	function draw(drawTime) {
		return function(chartInstance, easingDecimal) {
			var defaultDrawTime = chartInstance.annotation.options.drawTime;

			helpers.elements(chartInstance)
				.filter(function(element) {
					return drawTime === (element.options.drawTime || defaultDrawTime);
				})
				.forEach(function(element) {
					element.transition(easingDecimal).draw();
				});
		};
	}

	return {
		beforeInit: function(chartInstance) {
			var chartOptions = chartInstance.options;

			// Initialize chart instance plugin namespace
			var ns = chartInstance.annotation = {
				elements: {},
				options: helpers.initConfig(chartOptions.annotation || {}),
				onDestroy: [],
				firstRun: true,
				supported: false
			};

			// Add the annotation scale adjuster to each scale's afterDataLimits hook
			chartInstance.ensureScalesHaveIDs();
			if (chartOptions.scales) {
				ns.supported = true;
				chartHelpers.each(chartOptions.scales.xAxes, setAfterDataLimitsHook);
				chartHelpers.each(chartOptions.scales.yAxes, setAfterDataLimitsHook);
			}
		},
		beforeUpdate: function(chartInstance) {
			var ns = chartInstance.annotation;

			if (!ns.supported) {
				return;
			}

			if (!ns.firstRun) {
				ns.options = helpers.initConfig(chartInstance.options.annotation || {});
			} else {
				ns.firstRun = false;
			}

			var elementIds = [];

			// Add new elements, or update existing ones
			ns.options.annotations.forEach(function(annotation) {
				var id = annotation.id || helpers.objectId();
				
				// No element with that ID exists, and it's a valid annotation type
				if (!ns.elements[id] && annotationTypes[annotation.type]) {
					var cls = annotationTypes[annotation.type];
					var element = new cls({
						id: id,
						options: annotation,
						chartInstance: chartInstance,
					});
					element.initialize();
					ns.elements[id] = element;
					annotation.id = id;
					elementIds.push(id);
				} else if (ns.elements[id]) {
					// Nothing to do for update, since the element config references
					// the same object that exists in the chart annotation config
					elementIds.push(id);
				}
			});

			// Delete removed elements
			Object.keys(ns.elements).forEach(function(id) {
				if (elementIds.indexOf(id) === -1) {
					ns.elements[id].destroy();
					delete ns.elements[id];
				}
			});
		},
		afterScaleUpdate: function(chartInstance) {
			helpers.elements(chartInstance).forEach(function(element) {
				element.configure();
			});
		},
		beforeDatasetsDraw: draw('beforeDatasetsDraw'),
		afterDatasetsDraw: draw('afterDatasetsDraw'),
		afterDraw: draw('afterDraw'),
		afterInit: function(chartInstance) {
			// Detect and intercept events that happen on an annotation element
			var watchFor = chartInstance.annotation.options.events;
			if (chartHelpers.isArray(watchFor) && watchFor.length > 0) {
				var canvas = chartInstance.chart.canvas;
				var eventHandler = events.dispatcher.bind(chartInstance);
				events.collapseHoverEvents(watchFor).forEach(function(eventName) {
					chartHelpers.addEvent(canvas, eventName, eventHandler);
					chartInstance.annotation.onDestroy.push(function() {
						chartHelpers.removeEvent(canvas, eventName, eventHandler);
					});
				});
			}
		},
		destroy: function(chartInstance) {
			var deregisterers = chartInstance.annotation.onDestroy;
			while (deregisterers.length > 0) {
				deregisterers.pop()();
			}
		}
	};
};


/***/ }),

/***/ "./node_modules/chartjs-plugin-annotation/src/element.js":
/*!***************************************************************!*\
  !*** ./node_modules/chartjs-plugin-annotation/src/element.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(Chart) {
	var chartHelpers = Chart.helpers;
	
	var AnnotationElement = Chart.Element.extend({
		initialize: function() {
			this.hidden = false;
			this.hovering = false;
			this._model = chartHelpers.clone(this._model) || {};
			this.setDataLimits();
		},
		destroy: function() {},
		setDataLimits: function() {},
		configure: function() {},
		inRange: function() {},
		getCenterPoint: function() {},
		getWidth: function() {},
		getHeight: function() {},
		getArea: function() {},
		draw: function() {}
	});

	return AnnotationElement;
};


/***/ }),

/***/ "./node_modules/chartjs-plugin-annotation/src/events.js":
/*!**************************************************************!*\
  !*** ./node_modules/chartjs-plugin-annotation/src/events.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(Chart) {
	var chartHelpers = Chart.helpers;
	var helpers = __webpack_require__(/*! ./helpers.js */ "./node_modules/chartjs-plugin-annotation/src/helpers.js")(Chart);

	function collapseHoverEvents(events) {
		var hover = false;
		var filteredEvents = events.filter(function(eventName) {
			switch (eventName) {
				case 'mouseenter':
				case 'mouseover':
				case 'mouseout':
				case 'mouseleave':
					hover = true;
					return false;

				default:
					return true;
			}
		});
		if (hover && filteredEvents.indexOf('mousemove') === -1) {
			filteredEvents.push('mousemove');
		}
		return filteredEvents;
	}

	function dispatcher(e) {
		var ns = this.annotation;
		var elements = helpers.elements(this);
		var position = chartHelpers.getRelativePosition(e, this.chart);
		var element = helpers.getNearestItems(elements, position);
		var events = collapseHoverEvents(ns.options.events);
		var dblClickSpeed = ns.options.dblClickSpeed;
		var eventHandlers = [];
		var eventHandlerName = helpers.getEventHandlerName(e.type);
		var options = (element || {}).options;

		// Detect hover events
		if (e.type === 'mousemove') {
			if (element && !element.hovering) {
				// hover started
				['mouseenter', 'mouseover'].forEach(function(eventName) {
					var eventHandlerName = helpers.getEventHandlerName(eventName);
					var hoverEvent = helpers.createMouseEvent(eventName, e); // recreate the event to match the handler
					element.hovering = true;
					if (typeof options[eventHandlerName] === 'function') {
						eventHandlers.push([ options[eventHandlerName], hoverEvent, element ]);
					}
				});
			} else if (!element) {
				// hover ended
				elements.forEach(function(element) {
					if (element.hovering) {
						element.hovering = false;
						var options = element.options;
						['mouseout', 'mouseleave'].forEach(function(eventName) {
							var eventHandlerName = helpers.getEventHandlerName(eventName);
							var hoverEvent = helpers.createMouseEvent(eventName, e); // recreate the event to match the handler
							if (typeof options[eventHandlerName] === 'function') {
								eventHandlers.push([ options[eventHandlerName], hoverEvent, element ]);
							}
						});
					}
				});
			}
		}

		// Suppress duplicate click events during a double click
		// 1. click -> 2. click -> 3. dblclick
		//
		// 1: wait dblClickSpeed ms, then fire click
		// 2: cancel (1) if it is waiting then wait dblClickSpeed ms then fire click, else fire click immediately
		// 3: cancel (1) or (2) if waiting, then fire dblclick 
		if (element && events.indexOf('dblclick') > -1 && typeof options.onDblclick === 'function') {
			if (e.type === 'click' && typeof options.onClick === 'function') {
				clearTimeout(element.clickTimeout);
				element.clickTimeout = setTimeout(function() {
					delete element.clickTimeout;
					options.onClick.call(element, e);
				}, dblClickSpeed);
				e.stopImmediatePropagation();
				e.preventDefault();
				return;
			} else if (e.type === 'dblclick' && element.clickTimeout) {
				clearTimeout(element.clickTimeout);
				delete element.clickTimeout;
			}
		}

		// Dispatch the event to the usual handler, but only if we haven't substituted it
		if (element && typeof options[eventHandlerName] === 'function' && eventHandlers.length === 0) {
			eventHandlers.push([ options[eventHandlerName], e, element ]);
		}

		if (eventHandlers.length > 0) {
			e.stopImmediatePropagation();
			e.preventDefault();
			eventHandlers.forEach(function(eventHandler) {
				// [handler, event, element]
				eventHandler[0].call(eventHandler[2], eventHandler[1]);
			});
		}
	}

	return {
		dispatcher: dispatcher,
		collapseHoverEvents: collapseHoverEvents
	};
};


/***/ }),

/***/ "./node_modules/chartjs-plugin-annotation/src/helpers.js":
/*!***************************************************************!*\
  !*** ./node_modules/chartjs-plugin-annotation/src/helpers.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function noop() {}

function elements(chartInstance) {
	// Turn the elements object into an array of elements
	var elements = chartInstance.annotation.elements;
	return Object.keys(elements).map(function(id) {
		return elements[id];
	});
}

function objectId() {
	return Math.random().toString(36).substr(2, 6);
}

function isValid(rawValue) {
	if (rawValue === null || typeof rawValue === 'undefined') {
		return false;
	} else if (typeof rawValue === 'number') {
		return isFinite(rawValue);
	} else {
		return !!rawValue;
	}
}

function decorate(obj, prop, func) {
	var prefix = '$';
	if (!obj[prefix + prop]) {
		if (obj[prop]) {
			obj[prefix + prop] = obj[prop].bind(obj);
			obj[prop] = function() {
				var args = [ obj[prefix + prop] ].concat(Array.prototype.slice.call(arguments));
				return func.apply(obj, args);
			};
		} else {
			obj[prop] = function() {
				var args = [ undefined ].concat(Array.prototype.slice.call(arguments));
				return func.apply(obj, args);
			};
		}
	}
}

function callEach(fns, method) {
	fns.forEach(function(fn) {
		(method ? fn[method] : fn)();
	});
}

function getEventHandlerName(eventName) {
	return 'on' + eventName[0].toUpperCase() + eventName.substring(1);
}

function createMouseEvent(type, previousEvent) {
	try {
		return new MouseEvent(type, previousEvent);
	} catch (exception) {
		try {
			var m = document.createEvent('MouseEvent');
			m.initMouseEvent(
				type,
				previousEvent.canBubble,
				previousEvent.cancelable,
				previousEvent.view,
				previousEvent.detail,
				previousEvent.screenX,
				previousEvent.screenY,
				previousEvent.clientX,
				previousEvent.clientY,
				previousEvent.ctrlKey,
				previousEvent.altKey,
				previousEvent.shiftKey,
				previousEvent.metaKey,
				previousEvent.button,
				previousEvent.relatedTarget
			);
			return m;
		} catch (exception2) {
			var e = document.createEvent('Event');
			e.initEvent(
				type,
				previousEvent.canBubble,
				previousEvent.cancelable
			);
			return e;
		}
	}
}

module.exports = function(Chart) {
	var chartHelpers = Chart.helpers;

	function initConfig(config) {
		config = chartHelpers.configMerge(Chart.Annotation.defaults, config);
		if (chartHelpers.isArray(config.annotations)) {
			config.annotations.forEach(function(annotation) {
				annotation.label = chartHelpers.configMerge(Chart.Annotation.labelDefaults, annotation.label);
			});
		}
		return config;
	}

	function getScaleLimits(scaleId, annotations, scaleMin, scaleMax) {
		var ranges = annotations.filter(function(annotation) {
			return !!annotation._model.ranges[scaleId];
		}).map(function(annotation) {
			return annotation._model.ranges[scaleId];
		});

		var min = ranges.map(function(range) {
			return Number(range.min);
		}).reduce(function(a, b) {
			return isFinite(b) && !isNaN(b) && b < a ? b : a;
		}, scaleMin);

		var max = ranges.map(function(range) {
			return Number(range.max);
		}).reduce(function(a, b) {
			return isFinite(b) && !isNaN(b) && b > a ? b : a;
		}, scaleMax);

		return {
			min: min,
			max: max
		};
	}

	function adjustScaleRange(scale) {
		// Adjust the scale range to include annotation values
		var range = getScaleLimits(scale.id, elements(scale.chart), scale.min, scale.max);
		if (typeof scale.options.ticks.min === 'undefined' && typeof scale.options.ticks.suggestedMin === 'undefined') {
			scale.min = range.min;
		}
		if (typeof scale.options.ticks.max === 'undefined' && typeof scale.options.ticks.suggestedMax === 'undefined') {
			scale.max = range.max;
		}
		if (scale.handleTickRangeOptions) {
			scale.handleTickRangeOptions();
		}
	}

	function getNearestItems(annotations, position) {
		var minDistance = Number.POSITIVE_INFINITY;

		return annotations
			.filter(function(element) {
				return element.inRange(position.x, position.y);
			})
			.reduce(function(nearestItems, element) {
				var center = element.getCenterPoint();
				var distance = chartHelpers.distanceBetweenPoints(position, center);

				if (distance < minDistance) {
					nearestItems = [element];
					minDistance = distance;
				} else if (distance === minDistance) {
					// Can have multiple items at the same distance in which case we sort by size
					nearestItems.push(element);
				}

				return nearestItems;
			}, [])
			.sort(function(a, b) {
				// If there are multiple elements equally close,
				// sort them by size, then by index
				var sizeA = a.getArea(), sizeB = b.getArea();
				return (sizeA > sizeB || sizeA < sizeB) ? sizeA - sizeB : a._index - b._index;
			})
			.slice(0, 1)[0]; // return only the top item
	}

	return {
		initConfig: initConfig,
		elements: elements,
		callEach: callEach,
		noop: noop,
		objectId: objectId,
		isValid: isValid,
		decorate: decorate,
		adjustScaleRange: adjustScaleRange,
		getNearestItems: getNearestItems,
		getEventHandlerName: getEventHandlerName,
		createMouseEvent: createMouseEvent
	};
};



/***/ }),

/***/ "./node_modules/chartjs-plugin-annotation/src/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/chartjs-plugin-annotation/src/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Get the chart variable
var Chart = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/Chart.js");
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;

// Configure plugin namespace
Chart.Annotation = Chart.Annotation || {};

Chart.Annotation.drawTimeOptions = {
	afterDraw: 'afterDraw',
	afterDatasetsDraw: 'afterDatasetsDraw',
	beforeDatasetsDraw: 'beforeDatasetsDraw'
};

Chart.Annotation.defaults = {
	drawTime: 'afterDatasetsDraw',
	dblClickSpeed: 350, // ms
	events: [],
	annotations: []
};

Chart.Annotation.labelDefaults = {
	backgroundColor: 'rgba(0,0,0,0.8)',
	fontFamily: Chart.defaults.global.defaultFontFamily,
	fontSize: Chart.defaults.global.defaultFontSize,
	fontStyle: 'bold',
	fontColor: '#fff',
	xPadding: 6,
	yPadding: 6,
	cornerRadius: 6,
	position: 'center',
	xAdjust: 0,
	yAdjust: 0,
	enabled: false,
	content: null
};

Chart.Annotation.Element = __webpack_require__(/*! ./element.js */ "./node_modules/chartjs-plugin-annotation/src/element.js")(Chart);

Chart.Annotation.types = {
	line: __webpack_require__(/*! ./types/line.js */ "./node_modules/chartjs-plugin-annotation/src/types/line.js")(Chart),
	box: __webpack_require__(/*! ./types/box.js */ "./node_modules/chartjs-plugin-annotation/src/types/box.js")(Chart)
};

var annotationPlugin = __webpack_require__(/*! ./annotation.js */ "./node_modules/chartjs-plugin-annotation/src/annotation.js")(Chart);

module.exports = annotationPlugin;
Chart.pluginService.register(annotationPlugin);


/***/ }),

/***/ "./node_modules/chartjs-plugin-annotation/src/types/box.js":
/*!*****************************************************************!*\
  !*** ./node_modules/chartjs-plugin-annotation/src/types/box.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Box Annotation implementation
module.exports = function(Chart) {
	var helpers = __webpack_require__(/*! ../helpers.js */ "./node_modules/chartjs-plugin-annotation/src/helpers.js")(Chart);
	
	var BoxAnnotation = Chart.Annotation.Element.extend({
		setDataLimits: function() {
			var model = this._model;
			var options = this.options;
			var chartInstance = this.chartInstance;

			var xScale = chartInstance.scales[options.xScaleID];
			var yScale = chartInstance.scales[options.yScaleID];
			var chartArea = chartInstance.chartArea;

			// Set the data range for this annotation
			model.ranges = {};
			
			if (!chartArea) {
				return;
			}
			
			var min = 0;
			var max = 0;
			
			if (xScale) {
				min = helpers.isValid(options.xMin) ? options.xMin : xScale.getPixelForValue(chartArea.left);
				max = helpers.isValid(options.xMax) ? options.xMax : xScale.getPixelForValue(chartArea.right);

				model.ranges[options.xScaleID] = {
					min: Math.min(min, max),
					max: Math.max(min, max)
				};
			}

			if (yScale) {
				min = helpers.isValid(options.yMin) ? options.yMin : yScale.getPixelForValue(chartArea.bottom);
				max = helpers.isValid(options.yMax) ? options.yMax : yScale.getPixelForValue(chartArea.top);

				model.ranges[options.yScaleID] = {
					min: Math.min(min, max),
					max: Math.max(min, max)
				};
			}
		},
		configure: function() {
			var model = this._model;
			var options = this.options;
			var chartInstance = this.chartInstance;

			var xScale = chartInstance.scales[options.xScaleID];
			var yScale = chartInstance.scales[options.yScaleID];
			var chartArea = chartInstance.chartArea;

			// clip annotations to the chart area
			model.clip = {
				x1: chartArea.left,
				x2: chartArea.right,
				y1: chartArea.top,
				y2: chartArea.bottom
			};

			var left = chartArea.left, 
				top = chartArea.top, 
				right = chartArea.right, 
				bottom = chartArea.bottom;

			var min, max;

			if (xScale) {
				min = helpers.isValid(options.xMin) ? xScale.getPixelForValue(options.xMin) : chartArea.left;
				max = helpers.isValid(options.xMax) ? xScale.getPixelForValue(options.xMax) : chartArea.right;
				left = Math.min(min, max);
				right = Math.max(min, max);
			}

			if (yScale) {
				min = helpers.isValid(options.yMin) ? yScale.getPixelForValue(options.yMin) : chartArea.bottom;
				max = helpers.isValid(options.yMax) ? yScale.getPixelForValue(options.yMax) : chartArea.top;
				top = Math.min(min, max);
				bottom = Math.max(min, max);
			}

			// Ensure model has rect coordinates
			model.left = left;
			model.top = top;
			model.right = right;
			model.bottom = bottom;

			// Stylistic options
			model.borderColor = options.borderColor;
			model.borderWidth = options.borderWidth;
			model.backgroundColor = options.backgroundColor;
		},
		inRange: function(mouseX, mouseY) {
			var model = this._model;
			return model &&
				mouseX >= model.left && 
				mouseX <= model.right && 
				mouseY >= model.top && 
				mouseY <= model.bottom;
		},
		getCenterPoint: function() {
			var model = this._model;
			return {
				x: (model.right + model.left) / 2,
				y: (model.bottom + model.top) / 2
			};
		},
		getWidth: function() {
			var model = this._model;
			return Math.abs(model.right - model.left);
		},
		getHeight: function() {
			var model = this._model;
			return Math.abs(model.bottom - model.top);
		},
		getArea: function() {
			return this.getWidth() * this.getHeight();
		},
		draw: function() {
			var view = this._view;
			var ctx = this.chartInstance.chart.ctx;

			ctx.save();

			// Canvas setup
			ctx.beginPath();
			ctx.rect(view.clip.x1, view.clip.y1, view.clip.x2 - view.clip.x1, view.clip.y2 - view.clip.y1);
			ctx.clip();

			ctx.lineWidth = view.borderWidth;
			ctx.strokeStyle = view.borderColor;
			ctx.fillStyle = view.backgroundColor;

			// Draw
			var width = view.right - view.left,
				height = view.bottom - view.top;
			ctx.fillRect(view.left, view.top, width, height);
			ctx.strokeRect(view.left, view.top, width, height);

			ctx.restore();
		}
	});

	return BoxAnnotation;
};


/***/ }),

/***/ "./node_modules/chartjs-plugin-annotation/src/types/line.js":
/*!******************************************************************!*\
  !*** ./node_modules/chartjs-plugin-annotation/src/types/line.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Line Annotation implementation
module.exports = function(Chart) {
	var chartHelpers = Chart.helpers;
	var helpers = __webpack_require__(/*! ../helpers.js */ "./node_modules/chartjs-plugin-annotation/src/helpers.js")(Chart);

	var horizontalKeyword = 'horizontal';
	var verticalKeyword = 'vertical';

	var LineAnnotation = Chart.Annotation.Element.extend({
		setDataLimits: function() {
			var model = this._model;
			var options = this.options;

			// Set the data range for this annotation
			model.ranges = {};
			model.ranges[options.scaleID] = {
				min: options.value,
				max: options.endValue || options.value
			};
		},
		configure: function() {
			var model = this._model;
			var options = this.options;
			var chartInstance = this.chartInstance;
			var ctx = chartInstance.chart.ctx;

			var scale = chartInstance.scales[options.scaleID];
			var pixel, endPixel;
			if (scale) {
				pixel = helpers.isValid(options.value) ? scale.getPixelForValue(options.value) : NaN;
				endPixel = helpers.isValid(options.endValue) ? scale.getPixelForValue(options.endValue) : pixel;
			}

			if (isNaN(pixel)) {
				return;
			}

			var chartArea = chartInstance.chartArea;

			// clip annotations to the chart area
			model.clip = {
				x1: chartArea.left,
				x2: chartArea.right,
				y1: chartArea.top,
				y2: chartArea.bottom
			};

			if (this.options.mode == horizontalKeyword) {
				model.x1 = chartArea.left;
				model.x2 = chartArea.right;
				model.y1 = pixel;
				model.y2 = endPixel;
			} else {
				model.y1 = chartArea.top;
				model.y2 = chartArea.bottom;
				model.x1 = pixel;
				model.x2 = endPixel;
			}

			model.line = new LineFunction(model);
			model.mode = options.mode;

			// Figure out the label:
			model.labelBackgroundColor = options.label.backgroundColor;
			model.labelFontFamily = options.label.fontFamily;
			model.labelFontSize = options.label.fontSize;
			model.labelFontStyle = options.label.fontStyle;
			model.labelFontColor = options.label.fontColor;
			model.labelXPadding = options.label.xPadding;
			model.labelYPadding = options.label.yPadding;
			model.labelCornerRadius = options.label.cornerRadius;
			model.labelPosition = options.label.position;
			model.labelXAdjust = options.label.xAdjust;
			model.labelYAdjust = options.label.yAdjust;
			model.labelEnabled = options.label.enabled;
			model.labelContent = options.label.content;

			ctx.font = chartHelpers.fontString(model.labelFontSize, model.labelFontStyle, model.labelFontFamily);
			var textWidth = ctx.measureText(model.labelContent).width;
			var textHeight = ctx.measureText('M').width;
			var labelPosition = calculateLabelPosition(model, textWidth, textHeight, model.labelXPadding, model.labelYPadding);
			model.labelX = labelPosition.x - model.labelXPadding;
			model.labelY = labelPosition.y - model.labelYPadding;
			model.labelWidth = textWidth + (2 * model.labelXPadding);
			model.labelHeight = textHeight + (2 * model.labelYPadding);

			model.borderColor = options.borderColor;
			model.borderWidth = options.borderWidth;
			model.borderDash = options.borderDash || [];
			model.borderDashOffset = options.borderDashOffset || 0;
		},
		inRange: function(mouseX, mouseY) {
			var model = this._model;
			
			return (
				// On the line
				model.line &&
				model.line.intersects(mouseX, mouseY, this.getHeight())
			) || (
				// On the label
				model.labelEnabled &&
				model.labelContent &&
				mouseX >= model.labelX && 
				mouseX <= model.labelX + model.labelWidth && 
				mouseY >= model.labelY && 
				mouseY <= model.labelY + model.labelHeight
			);
		},
		getCenterPoint: function() {
			return {
				x: (this._model.x2 + this._model.x1) / 2,
				y: (this._model.y2 + this._model.y1) / 2
			};
		},
		getWidth: function() {
			return Math.abs(this._model.right - this._model.left);
		},
		getHeight: function() {
			return this._model.borderWidth || 1;
		},
		getArea: function() {
			return Math.sqrt(Math.pow(this.getWidth(), 2) + Math.pow(this.getHeight(), 2));
		},
		draw: function() {
			var view = this._view;
			var ctx = this.chartInstance.chart.ctx;

			if (!view.clip) {
				return;
			}

			ctx.save();

			// Canvas setup
			ctx.beginPath();
			ctx.rect(view.clip.x1, view.clip.y1, view.clip.x2 - view.clip.x1, view.clip.y2 - view.clip.y1);
			ctx.clip();

			ctx.lineWidth = view.borderWidth;
			ctx.strokeStyle = view.borderColor;

			if (ctx.setLineDash) {
				ctx.setLineDash(view.borderDash);
			}
			ctx.lineDashOffset = view.borderDashOffset;

			// Draw
			ctx.beginPath();
			ctx.moveTo(view.x1, view.y1);
			ctx.lineTo(view.x2, view.y2);
			ctx.stroke();

			if (view.labelEnabled && view.labelContent) {
				ctx.beginPath();
				ctx.rect(view.clip.x1, view.clip.y1, view.clip.x2 - view.clip.x1, view.clip.y2 - view.clip.y1);
				ctx.clip();

				ctx.fillStyle = view.labelBackgroundColor;
				// Draw the tooltip
				chartHelpers.drawRoundedRectangle(
					ctx,
					view.labelX, // x
					view.labelY, // y
					view.labelWidth, // width
					view.labelHeight, // height
					view.labelCornerRadius // radius
				);
				ctx.fill();

				// Draw the text
				ctx.font = chartHelpers.fontString(
					view.labelFontSize,
					view.labelFontStyle,
					view.labelFontFamily
				);
				ctx.fillStyle = view.labelFontColor;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(
					view.labelContent,
					view.labelX + (view.labelWidth / 2),
					view.labelY + (view.labelHeight / 2)
				);
			}

			ctx.restore();
		}
	});

	function LineFunction(view) {
		// Describe the line in slope-intercept form (y = mx + b).
		// Note that the axes are rotated 90° CCW, which causes the
		// x- and y-axes to be swapped.
		var m = (view.x2 - view.x1) / (view.y2 - view.y1);
		var b = view.x1 || 0;

		this.m = m;
		this.b = b;

		this.getX = function(y) {
			// Coordinates are relative to the origin of the canvas
			return m * (y - view.y1) + b;
		};

		this.getY = function(x) {
			return ((x - b) / m) + view.y1;
		};

		this.intersects = function(x, y, epsilon) {
			epsilon = epsilon || 0.001;
			var dy = this.getY(x),
				dx = this.getX(y);
			return (
				(!isFinite(dy) || Math.abs(y - dy) < epsilon) &&
				(!isFinite(dx) || Math.abs(x - dx) < epsilon)
			);
		};
	}

	function calculateLabelPosition(view, width, height, padWidth, padHeight) {
		var line = view.line;
		var ret = {}, xa = 0, ya = 0;

		switch (true) {
			// top align
			case view.mode == verticalKeyword && view.labelPosition == "top":
				ya = padHeight + view.labelYAdjust;
				xa = (width / 2) + view.labelXAdjust;
				ret.y = view.y1 + ya;
				ret.x = (isFinite(line.m) ? line.getX(ret.y) : view.x1) - xa;
			break;

			// bottom align
			case view.mode == verticalKeyword && view.labelPosition == "bottom":
				ya = height + padHeight + view.labelYAdjust;
				xa = (width / 2) + view.labelXAdjust;
				ret.y = view.y2 - ya;
				ret.x = (isFinite(line.m) ? line.getX(ret.y) : view.x1) - xa;
			break;

			// left align
			case view.mode == horizontalKeyword && view.labelPosition == "left":
				xa = padWidth + view.labelXAdjust;
				ya = -(height / 2) + view.labelYAdjust;
				ret.x = view.x1 + xa;
				ret.y = line.getY(ret.x) + ya;
			break;

			// right align
			case view.mode == horizontalKeyword && view.labelPosition == "right":
				xa = width + padWidth + view.labelXAdjust;
				ya = -(height / 2) + view.labelYAdjust;
				ret.x = view.x2 - xa;
				ret.y = line.getY(ret.x) + ya;
			break;

			// center align
			default:
				ret.x = ((view.x1 + view.x2 - width) / 2) + view.labelXAdjust;
				ret.y = ((view.y1 + view.y2 - height) / 2) + view.labelYAdjust;
		}

		return ret;
	}

	return LineAnnotation;
};


/***/ }),

/***/ "./node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * chartjs-plugin-datalabels v0.7.0
 * https://chartjs-plugin-datalabels.netlify.com
 * (c) 2019 Chart.js Contributors
 * Released under the MIT license
 */
(function (global, factory) {
 true ? module.exports = factory(__webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/Chart.js")) :
undefined;
}(this, function (Chart) { 'use strict';

Chart = Chart && Chart.hasOwnProperty('default') ? Chart['default'] : Chart;

var helpers = Chart.helpers;

var devicePixelRatio = (function() {
	if (typeof window !== 'undefined') {
		if (window.devicePixelRatio) {
			return window.devicePixelRatio;
		}

		// devicePixelRatio is undefined on IE10
		// https://stackoverflow.com/a/20204180/8837887
		// https://github.com/chartjs/chartjs-plugin-datalabels/issues/85
		var screen = window.screen;
		if (screen) {
			return (screen.deviceXDPI || 1) / (screen.logicalXDPI || 1);
		}
	}

	return 1;
}());

var utils = {
	// @todo move this in Chart.helpers.toTextLines
	toTextLines: function(inputs) {
		var lines = [];
		var input;

		inputs = [].concat(inputs);
		while (inputs.length) {
			input = inputs.pop();
			if (typeof input === 'string') {
				lines.unshift.apply(lines, input.split('\n'));
			} else if (Array.isArray(input)) {
				inputs.push.apply(inputs, input);
			} else if (!helpers.isNullOrUndef(inputs)) {
				lines.unshift('' + input);
			}
		}

		return lines;
	},

	// @todo move this method in Chart.helpers.canvas.toFont (deprecates helpers.fontString)
	// @see https://developer.mozilla.org/en-US/docs/Web/CSS/font
	toFontString: function(font) {
		if (!font || helpers.isNullOrUndef(font.size) || helpers.isNullOrUndef(font.family)) {
			return null;
		}

		return (font.style ? font.style + ' ' : '')
			+ (font.weight ? font.weight + ' ' : '')
			+ font.size + 'px '
			+ font.family;
	},

	// @todo move this in Chart.helpers.canvas.textSize
	// @todo cache calls of measureText if font doesn't change?!
	textSize: function(ctx, lines, font) {
		var items = [].concat(lines);
		var ilen = items.length;
		var prev = ctx.font;
		var width = 0;
		var i;

		ctx.font = font.string;

		for (i = 0; i < ilen; ++i) {
			width = Math.max(ctx.measureText(items[i]).width, width);
		}

		ctx.font = prev;

		return {
			height: ilen * font.lineHeight,
			width: width
		};
	},

	// @todo move this method in Chart.helpers.options.toFont
	parseFont: function(value) {
		var global = Chart.defaults.global;
		var size = helpers.valueOrDefault(value.size, global.defaultFontSize);
		var font = {
			family: helpers.valueOrDefault(value.family, global.defaultFontFamily),
			lineHeight: helpers.options.toLineHeight(value.lineHeight, size),
			size: size,
			style: helpers.valueOrDefault(value.style, global.defaultFontStyle),
			weight: helpers.valueOrDefault(value.weight, null),
			string: ''
		};

		font.string = utils.toFontString(font);
		return font;
	},

	/**
	 * Returns value bounded by min and max. This is equivalent to max(min, min(value, max)).
	 * @todo move this method in Chart.helpers.bound
	 * https://doc.qt.io/qt-5/qtglobal.html#qBound
	 */
	bound: function(min, value, max) {
		return Math.max(min, Math.min(value, max));
	},

	/**
	 * Returns an array of pair [value, state] where state is:
	 * * -1: value is only in a0 (removed)
	 * *  1: value is only in a1 (added)
	 */
	arrayDiff: function(a0, a1) {
		var prev = a0.slice();
		var updates = [];
		var i, j, ilen, v;

		for (i = 0, ilen = a1.length; i < ilen; ++i) {
			v = a1[i];
			j = prev.indexOf(v);

			if (j === -1) {
				updates.push([v, 1]);
			} else {
				prev.splice(j, 1);
			}
		}

		for (i = 0, ilen = prev.length; i < ilen; ++i) {
			updates.push([prev[i], -1]);
		}

		return updates;
	},

	/**
	 * https://github.com/chartjs/chartjs-plugin-datalabels/issues/70
	 */
	rasterize: function(v) {
		return Math.round(v * devicePixelRatio) / devicePixelRatio;
	}
};

function orient(point, origin) {
	var x0 = origin.x;
	var y0 = origin.y;

	if (x0 === null) {
		return {x: 0, y: -1};
	}
	if (y0 === null) {
		return {x: 1, y: 0};
	}

	var dx = point.x - x0;
	var dy = point.y - y0;
	var ln = Math.sqrt(dx * dx + dy * dy);

	return {
		x: ln ? dx / ln : 0,
		y: ln ? dy / ln : -1
	};
}

function aligned(x, y, vx, vy, align) {
	switch (align) {
	case 'center':
		vx = vy = 0;
		break;
	case 'bottom':
		vx = 0;
		vy = 1;
		break;
	case 'right':
		vx = 1;
		vy = 0;
		break;
	case 'left':
		vx = -1;
		vy = 0;
		break;
	case 'top':
		vx = 0;
		vy = -1;
		break;
	case 'start':
		vx = -vx;
		vy = -vy;
		break;
	case 'end':
		// keep natural orientation
		break;
	default:
		// clockwise rotation (in degree)
		align *= (Math.PI / 180);
		vx = Math.cos(align);
		vy = Math.sin(align);
		break;
	}

	return {
		x: x,
		y: y,
		vx: vx,
		vy: vy
	};
}

// Line clipping (Cohen–Sutherland algorithm)
// https://en.wikipedia.org/wiki/Cohen–Sutherland_algorithm

var R_INSIDE = 0;
var R_LEFT = 1;
var R_RIGHT = 2;
var R_BOTTOM = 4;
var R_TOP = 8;

function region(x, y, rect) {
	var res = R_INSIDE;

	if (x < rect.left) {
		res |= R_LEFT;
	} else if (x > rect.right) {
		res |= R_RIGHT;
	}
	if (y < rect.top) {
		res |= R_TOP;
	} else if (y > rect.bottom) {
		res |= R_BOTTOM;
	}

	return res;
}

function clipped(segment, area) {
	var x0 = segment.x0;
	var y0 = segment.y0;
	var x1 = segment.x1;
	var y1 = segment.y1;
	var r0 = region(x0, y0, area);
	var r1 = region(x1, y1, area);
	var r, x, y;

	// eslint-disable-next-line no-constant-condition
	while (true) {
		if (!(r0 | r1) || (r0 & r1)) {
			// both points inside or on the same side: no clipping
			break;
		}

		// at least one point is outside
		r = r0 || r1;

		if (r & R_TOP) {
			x = x0 + (x1 - x0) * (area.top - y0) / (y1 - y0);
			y = area.top;
		} else if (r & R_BOTTOM) {
			x = x0 + (x1 - x0) * (area.bottom - y0) / (y1 - y0);
			y = area.bottom;
		} else if (r & R_RIGHT) {
			y = y0 + (y1 - y0) * (area.right - x0) / (x1 - x0);
			x = area.right;
		} else if (r & R_LEFT) {
			y = y0 + (y1 - y0) * (area.left - x0) / (x1 - x0);
			x = area.left;
		}

		if (r === r0) {
			x0 = x;
			y0 = y;
			r0 = region(x0, y0, area);
		} else {
			x1 = x;
			y1 = y;
			r1 = region(x1, y1, area);
		}
	}

	return {
		x0: x0,
		x1: x1,
		y0: y0,
		y1: y1
	};
}

function compute(range, config) {
	var anchor = config.anchor;
	var segment = range;
	var x, y;

	if (config.clamp) {
		segment = clipped(segment, config.area);
	}

	if (anchor === 'start') {
		x = segment.x0;
		y = segment.y0;
	} else if (anchor === 'end') {
		x = segment.x1;
		y = segment.y1;
	} else {
		x = (segment.x0 + segment.x1) / 2;
		y = (segment.y0 + segment.y1) / 2;
	}

	return aligned(x, y, range.vx, range.vy, config.align);
}

var positioners = {
	arc: function(vm, config) {
		var angle = (vm.startAngle + vm.endAngle) / 2;
		var vx = Math.cos(angle);
		var vy = Math.sin(angle);
		var r0 = vm.innerRadius;
		var r1 = vm.outerRadius;

		return compute({
			x0: vm.x + vx * r0,
			y0: vm.y + vy * r0,
			x1: vm.x + vx * r1,
			y1: vm.y + vy * r1,
			vx: vx,
			vy: vy
		}, config);
	},

	point: function(vm, config) {
		var v = orient(vm, config.origin);
		var rx = v.x * vm.radius;
		var ry = v.y * vm.radius;

		return compute({
			x0: vm.x - rx,
			y0: vm.y - ry,
			x1: vm.x + rx,
			y1: vm.y + ry,
			vx: v.x,
			vy: v.y
		}, config);
	},

	rect: function(vm, config) {
		var v = orient(vm, config.origin);
		var x = vm.x;
		var y = vm.y;
		var sx = 0;
		var sy = 0;

		if (vm.horizontal) {
			x = Math.min(vm.x, vm.base);
			sx = Math.abs(vm.base - vm.x);
		} else {
			y = Math.min(vm.y, vm.base);
			sy = Math.abs(vm.base - vm.y);
		}

		return compute({
			x0: x,
			y0: y + sy,
			x1: x + sx,
			y1: y,
			vx: v.x,
			vy: v.y
		}, config);
	},

	fallback: function(vm, config) {
		var v = orient(vm, config.origin);

		return compute({
			x0: vm.x,
			y0: vm.y,
			x1: vm.x,
			y1: vm.y,
			vx: v.x,
			vy: v.y
		}, config);
	}
};

var helpers$1 = Chart.helpers;
var rasterize = utils.rasterize;

function boundingRects(model) {
	var borderWidth = model.borderWidth || 0;
	var padding = model.padding;
	var th = model.size.height;
	var tw = model.size.width;
	var tx = -tw / 2;
	var ty = -th / 2;

	return {
		frame: {
			x: tx - padding.left - borderWidth,
			y: ty - padding.top - borderWidth,
			w: tw + padding.width + borderWidth * 2,
			h: th + padding.height + borderWidth * 2
		},
		text: {
			x: tx,
			y: ty,
			w: tw,
			h: th
		}
	};
}

function getScaleOrigin(el) {
	var horizontal = el._model.horizontal;
	var scale = el._scale || (horizontal && el._xScale) || el._yScale;

	if (!scale) {
		return null;
	}

	if (scale.xCenter !== undefined && scale.yCenter !== undefined) {
		return {x: scale.xCenter, y: scale.yCenter};
	}

	var pixel = scale.getBasePixel();
	return horizontal ?
		{x: pixel, y: null} :
		{x: null, y: pixel};
}

function getPositioner(el) {
	if (el instanceof Chart.elements.Arc) {
		return positioners.arc;
	}
	if (el instanceof Chart.elements.Point) {
		return positioners.point;
	}
	if (el instanceof Chart.elements.Rectangle) {
		return positioners.rect;
	}
	return positioners.fallback;
}

function drawFrame(ctx, rect, model) {
	var bgColor = model.backgroundColor;
	var borderColor = model.borderColor;
	var borderWidth = model.borderWidth;

	if (!bgColor && (!borderColor || !borderWidth)) {
		return;
	}

	ctx.beginPath();

	helpers$1.canvas.roundedRect(
		ctx,
		rasterize(rect.x) + borderWidth / 2,
		rasterize(rect.y) + borderWidth / 2,
		rasterize(rect.w) - borderWidth,
		rasterize(rect.h) - borderWidth,
		model.borderRadius);

	ctx.closePath();

	if (bgColor) {
		ctx.fillStyle = bgColor;
		ctx.fill();
	}

	if (borderColor && borderWidth) {
		ctx.strokeStyle = borderColor;
		ctx.lineWidth = borderWidth;
		ctx.lineJoin = 'miter';
		ctx.stroke();
	}
}

function textGeometry(rect, align, font) {
	var h = font.lineHeight;
	var w = rect.w;
	var x = rect.x;
	var y = rect.y + h / 2;

	if (align === 'center') {
		x += w / 2;
	} else if (align === 'end' || align === 'right') {
		x += w;
	}

	return {
		h: h,
		w: w,
		x: x,
		y: y
	};
}

function drawTextLine(ctx, text, cfg) {
	var shadow = ctx.shadowBlur;
	var stroked = cfg.stroked;
	var x = rasterize(cfg.x);
	var y = rasterize(cfg.y);
	var w = rasterize(cfg.w);

	if (stroked) {
		ctx.strokeText(text, x, y, w);
	}

	if (cfg.filled) {
		if (shadow && stroked) {
			// Prevent drawing shadow on both the text stroke and fill, so
			// if the text is stroked, remove the shadow for the text fill.
			ctx.shadowBlur = 0;
		}

		ctx.fillText(text, x, y, w);

		if (shadow && stroked) {
			ctx.shadowBlur = shadow;
		}
	}
}

function drawText(ctx, lines, rect, model) {
	var align = model.textAlign;
	var color = model.color;
	var filled = !!color;
	var font = model.font;
	var ilen = lines.length;
	var strokeColor = model.textStrokeColor;
	var strokeWidth = model.textStrokeWidth;
	var stroked = strokeColor && strokeWidth;
	var i;

	if (!ilen || (!filled && !stroked)) {
		return;
	}

	// Adjust coordinates based on text alignment and line height
	rect = textGeometry(rect, align, font);

	ctx.font = font.string;
	ctx.textAlign = align;
	ctx.textBaseline = 'middle';
	ctx.shadowBlur = model.textShadowBlur;
	ctx.shadowColor = model.textShadowColor;

	if (filled) {
		ctx.fillStyle = color;
	}
	if (stroked) {
		ctx.lineJoin = 'round';
		ctx.lineWidth = strokeWidth;
		ctx.strokeStyle = strokeColor;
	}

	for (i = 0, ilen = lines.length; i < ilen; ++i) {
		drawTextLine(ctx, lines[i], {
			stroked: stroked,
			filled: filled,
			w: rect.w,
			x: rect.x,
			y: rect.y + rect.h * i
		});
	}
}

var Label = function(config, ctx, el, index) {
	var me = this;

	me._config = config;
	me._index = index;
	me._model = null;
	me._rects = null;
	me._ctx = ctx;
	me._el = el;
};

helpers$1.extend(Label.prototype, {
	/**
	 * @private
	 */
	_modelize: function(display, lines, config, context) {
		var me = this;
		var index = me._index;
		var resolve = helpers$1.options.resolve;
		var font = utils.parseFont(resolve([config.font, {}], context, index));
		var color = resolve([config.color, Chart.defaults.global.defaultFontColor], context, index);

		return {
			align: resolve([config.align, 'center'], context, index),
			anchor: resolve([config.anchor, 'center'], context, index),
			area: context.chart.chartArea,
			backgroundColor: resolve([config.backgroundColor, null], context, index),
			borderColor: resolve([config.borderColor, null], context, index),
			borderRadius: resolve([config.borderRadius, 0], context, index),
			borderWidth: resolve([config.borderWidth, 0], context, index),
			clamp: resolve([config.clamp, false], context, index),
			clip: resolve([config.clip, false], context, index),
			color: color,
			display: display,
			font: font,
			lines: lines,
			offset: resolve([config.offset, 0], context, index),
			opacity: resolve([config.opacity, 1], context, index),
			origin: getScaleOrigin(me._el),
			padding: helpers$1.options.toPadding(resolve([config.padding, 0], context, index)),
			positioner: getPositioner(me._el),
			rotation: resolve([config.rotation, 0], context, index) * (Math.PI / 180),
			size: utils.textSize(me._ctx, lines, font),
			textAlign: resolve([config.textAlign, 'start'], context, index),
			textShadowBlur: resolve([config.textShadowBlur, 0], context, index),
			textShadowColor: resolve([config.textShadowColor, color], context, index),
			textStrokeColor: resolve([config.textStrokeColor, color], context, index),
			textStrokeWidth: resolve([config.textStrokeWidth, 0], context, index)
		};
	},

	update: function(context) {
		var me = this;
		var model = null;
		var rects = null;
		var index = me._index;
		var config = me._config;
		var value, label, lines;

		// We first resolve the display option (separately) to avoid computing
		// other options in case the label is hidden (i.e. display: false).
		var display = helpers$1.options.resolve([config.display, true], context, index);

		if (display) {
			value = context.dataset.data[index];
			label = helpers$1.valueOrDefault(helpers$1.callback(config.formatter, [value, context]), value);
			lines = helpers$1.isNullOrUndef(label) ? [] : utils.toTextLines(label);

			if (lines.length) {
				model = me._modelize(display, lines, config, context);
				rects = boundingRects(model);
			}
		}

		me._model = model;
		me._rects = rects;
	},

	geometry: function() {
		return this._rects ? this._rects.frame : {};
	},

	rotation: function() {
		return this._model ? this._model.rotation : 0;
	},

	visible: function() {
		return this._model && this._model.opacity;
	},

	model: function() {
		return this._model;
	},

	draw: function(chart, center) {
		var me = this;
		var ctx = chart.ctx;
		var model = me._model;
		var rects = me._rects;
		var area;

		if (!this.visible()) {
			return;
		}

		ctx.save();

		if (model.clip) {
			area = model.area;
			ctx.beginPath();
			ctx.rect(
				area.left,
				area.top,
				area.right - area.left,
				area.bottom - area.top);
			ctx.clip();
		}

		ctx.globalAlpha = utils.bound(0, model.opacity, 1);
		ctx.translate(rasterize(center.x), rasterize(center.y));
		ctx.rotate(model.rotation);

		drawFrame(ctx, rects.frame, model);
		drawText(ctx, model.lines, rects.text, model);

		ctx.restore();
	}
});

var helpers$2 = Chart.helpers;

var MIN_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991; // eslint-disable-line es/no-number-minsafeinteger
var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;  // eslint-disable-line es/no-number-maxsafeinteger

function rotated(point, center, angle) {
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	var cx = center.x;
	var cy = center.y;

	return {
		x: cx + cos * (point.x - cx) - sin * (point.y - cy),
		y: cy + sin * (point.x - cx) + cos * (point.y - cy)
	};
}

function projected(points, axis) {
	var min = MAX_INTEGER;
	var max = MIN_INTEGER;
	var origin = axis.origin;
	var i, pt, vx, vy, dp;

	for (i = 0; i < points.length; ++i) {
		pt = points[i];
		vx = pt.x - origin.x;
		vy = pt.y - origin.y;
		dp = axis.vx * vx + axis.vy * vy;
		min = Math.min(min, dp);
		max = Math.max(max, dp);
	}

	return {
		min: min,
		max: max
	};
}

function toAxis(p0, p1) {
	var vx = p1.x - p0.x;
	var vy = p1.y - p0.y;
	var ln = Math.sqrt(vx * vx + vy * vy);

	return {
		vx: (p1.x - p0.x) / ln,
		vy: (p1.y - p0.y) / ln,
		origin: p0,
		ln: ln
	};
}

var HitBox = function() {
	this._rotation = 0;
	this._rect = {
		x: 0,
		y: 0,
		w: 0,
		h: 0
	};
};

helpers$2.extend(HitBox.prototype, {
	center: function() {
		var r = this._rect;
		return {
			x: r.x + r.w / 2,
			y: r.y + r.h / 2
		};
	},

	update: function(center, rect, rotation) {
		this._rotation = rotation;
		this._rect = {
			x: rect.x + center.x,
			y: rect.y + center.y,
			w: rect.w,
			h: rect.h
		};
	},

	contains: function(point) {
		var me = this;
		var margin = 1;
		var rect = me._rect;

		point = rotated(point, me.center(), -me._rotation);

		return !(point.x < rect.x - margin
			|| point.y < rect.y - margin
			|| point.x > rect.x + rect.w + margin * 2
			|| point.y > rect.y + rect.h + margin * 2);
	},

	// Separating Axis Theorem
	// https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
	intersects: function(other) {
		var r0 = this._points();
		var r1 = other._points();
		var axes = [
			toAxis(r0[0], r0[1]),
			toAxis(r0[0], r0[3])
		];
		var i, pr0, pr1;

		if (this._rotation !== other._rotation) {
			// Only separate with r1 axis if the rotation is different,
			// else it's enough to separate r0 and r1 with r0 axis only!
			axes.push(
				toAxis(r1[0], r1[1]),
				toAxis(r1[0], r1[3])
			);
		}

		for (i = 0; i < axes.length; ++i) {
			pr0 = projected(r0, axes[i]);
			pr1 = projected(r1, axes[i]);

			if (pr0.max < pr1.min || pr1.max < pr0.min) {
				return false;
			}
		}

		return true;
	},

	/**
	 * @private
	 */
	_points: function() {
		var me = this;
		var rect = me._rect;
		var angle = me._rotation;
		var center = me.center();

		return [
			rotated({x: rect.x, y: rect.y}, center, angle),
			rotated({x: rect.x + rect.w, y: rect.y}, center, angle),
			rotated({x: rect.x + rect.w, y: rect.y + rect.h}, center, angle),
			rotated({x: rect.x, y: rect.y + rect.h}, center, angle)
		];
	}
});

function coordinates(view, model, geometry) {
	var point = model.positioner(view, model);
	var vx = point.vx;
	var vy = point.vy;

	if (!vx && !vy) {
		// if aligned center, we don't want to offset the center point
		return {x: point.x, y: point.y};
	}

	var w = geometry.w;
	var h = geometry.h;

	// take in account the label rotation
	var rotation = model.rotation;
	var dx = Math.abs(w / 2 * Math.cos(rotation)) + Math.abs(h / 2 * Math.sin(rotation));
	var dy = Math.abs(w / 2 * Math.sin(rotation)) + Math.abs(h / 2 * Math.cos(rotation));

	// scale the unit vector (vx, vy) to get at least dx or dy equal to
	// w or h respectively (else we would calculate the distance to the
	// ellipse inscribed in the bounding rect)
	var vs = 1 / Math.max(Math.abs(vx), Math.abs(vy));
	dx *= vx * vs;
	dy *= vy * vs;

	// finally, include the explicit offset
	dx += model.offset * vx;
	dy += model.offset * vy;

	return {
		x: point.x + dx,
		y: point.y + dy
	};
}

function collide(labels, collider) {
	var i, j, s0, s1;

	// IMPORTANT Iterate in the reverse order since items at the end of the
	// list have an higher weight/priority and thus should be less impacted
	// by the overlapping strategy.

	for (i = labels.length - 1; i >= 0; --i) {
		s0 = labels[i].$layout;

		for (j = i - 1; j >= 0 && s0._visible; --j) {
			s1 = labels[j].$layout;

			if (s1._visible && s0._box.intersects(s1._box)) {
				collider(s0, s1);
			}
		}
	}

	return labels;
}

function compute$1(labels) {
	var i, ilen, label, state, geometry, center;

	// Initialize labels for overlap detection
	for (i = 0, ilen = labels.length; i < ilen; ++i) {
		label = labels[i];
		state = label.$layout;

		if (state._visible) {
			geometry = label.geometry();
			center = coordinates(label._el._model, label.model(), geometry);
			state._box.update(center, geometry, label.rotation());
		}
	}

	// Auto hide overlapping labels
	return collide(labels, function(s0, s1) {
		var h0 = s0._hidable;
		var h1 = s1._hidable;

		if ((h0 && h1) || h1) {
			s1._visible = false;
		} else if (h0) {
			s0._visible = false;
		}
	});
}

var layout = {
	prepare: function(datasets) {
		var labels = [];
		var i, j, ilen, jlen, label;

		for (i = 0, ilen = datasets.length; i < ilen; ++i) {
			for (j = 0, jlen = datasets[i].length; j < jlen; ++j) {
				label = datasets[i][j];
				labels.push(label);
				label.$layout = {
					_box: new HitBox(),
					_hidable: false,
					_visible: true,
					_set: i,
					_idx: j
				};
			}
		}

		// TODO New `z` option: labels with a higher z-index are drawn
		// of top of the ones with a lower index. Lowest z-index labels
		// are also discarded first when hiding overlapping labels.
		labels.sort(function(a, b) {
			var sa = a.$layout;
			var sb = b.$layout;

			return sa._idx === sb._idx
				? sb._set - sa._set
				: sb._idx - sa._idx;
		});

		this.update(labels);

		return labels;
	},

	update: function(labels) {
		var dirty = false;
		var i, ilen, label, model, state;

		for (i = 0, ilen = labels.length; i < ilen; ++i) {
			label = labels[i];
			model = label.model();
			state = label.$layout;
			state._hidable = model && model.display === 'auto';
			state._visible = label.visible();
			dirty |= state._hidable;
		}

		if (dirty) {
			compute$1(labels);
		}
	},

	lookup: function(labels, point) {
		var i, state;

		// IMPORTANT Iterate in the reverse order since items at the end of
		// the list have an higher z-index, thus should be picked first.

		for (i = labels.length - 1; i >= 0; --i) {
			state = labels[i].$layout;

			if (state && state._visible && state._box.contains(point)) {
				return labels[i];
			}
		}

		return null;
	},

	draw: function(chart, labels) {
		var i, ilen, label, state, geometry, center;

		for (i = 0, ilen = labels.length; i < ilen; ++i) {
			label = labels[i];
			state = label.$layout;

			if (state._visible) {
				geometry = label.geometry();
				center = coordinates(label._el._view, label.model(), geometry);
				state._box.update(center, geometry, label.rotation());
				label.draw(chart, center);
			}
		}
	}
};

var helpers$3 = Chart.helpers;

var formatter = function(value) {
	if (helpers$3.isNullOrUndef(value)) {
		return null;
	}

	var label = value;
	var keys, klen, k;
	if (helpers$3.isObject(value)) {
		if (!helpers$3.isNullOrUndef(value.label)) {
			label = value.label;
		} else if (!helpers$3.isNullOrUndef(value.r)) {
			label = value.r;
		} else {
			label = '';
			keys = Object.keys(value);
			for (k = 0, klen = keys.length; k < klen; ++k) {
				label += (k !== 0 ? ', ' : '') + keys[k] + ': ' + value[keys[k]];
			}
		}
	}

	return '' + label;
};

/**
 * IMPORTANT: make sure to also update tests and TypeScript definition
 * files (`/test/specs/defaults.spec.js` and `/types/options.d.ts`)
 */

var defaults = {
	align: 'center',
	anchor: 'center',
	backgroundColor: null,
	borderColor: null,
	borderRadius: 0,
	borderWidth: 0,
	clamp: false,
	clip: false,
	color: undefined,
	display: true,
	font: {
		family: undefined,
		lineHeight: 1.2,
		size: undefined,
		style: undefined,
		weight: null
	},
	formatter: formatter,
	labels: undefined,
	listeners: {},
	offset: 4,
	opacity: 1,
	padding: {
		top: 4,
		right: 4,
		bottom: 4,
		left: 4
	},
	rotation: 0,
	textAlign: 'start',
	textStrokeColor: undefined,
	textStrokeWidth: 0,
	textShadowBlur: 0,
	textShadowColor: undefined
};

/**
 * @see https://github.com/chartjs/Chart.js/issues/4176
 */

var helpers$4 = Chart.helpers;
var EXPANDO_KEY = '$datalabels';
var DEFAULT_KEY = '$default';

function configure(dataset, options) {
	var override = dataset.datalabels;
	var listeners = {};
	var configs = [];
	var labels, keys;

	if (override === false) {
		return null;
	}
	if (override === true) {
		override = {};
	}

	options = helpers$4.merge({}, [options, override]);
	labels = options.labels || {};
	keys = Object.keys(labels);
	delete options.labels;

	if (keys.length) {
		keys.forEach(function(key) {
			if (labels[key]) {
				configs.push(helpers$4.merge({}, [
					options,
					labels[key],
					{_key: key}
				]));
			}
		});
	} else {
		// Default label if no "named" label defined.
		configs.push(options);
	}

	// listeners: {<event-type>: {<label-key>: <fn>}}
	listeners = configs.reduce(function(target, config) {
		helpers$4.each(config.listeners || {}, function(fn, event) {
			target[event] = target[event] || {};
			target[event][config._key || DEFAULT_KEY] = fn;
		});

		delete config.listeners;
		return target;
	}, {});

	return {
		labels: configs,
		listeners: listeners
	};
}

function dispatchEvent(chart, listeners, label) {
	if (!listeners) {
		return;
	}

	var context = label.$context;
	var groups = label.$groups;
	var callback;

	if (!listeners[groups._set]) {
		return;
	}

	callback = listeners[groups._set][groups._key];
	if (!callback) {
		return;
	}

	if (helpers$4.callback(callback, [context]) === true) {
		// Users are allowed to tweak the given context by injecting values that can be
		// used in scriptable options to display labels differently based on the current
		// event (e.g. highlight an hovered label). That's why we update the label with
		// the output context and schedule a new chart render by setting it dirty.
		chart[EXPANDO_KEY]._dirty = true;
		label.update(context);
	}
}

function dispatchMoveEvents(chart, listeners, previous, label) {
	var enter, leave;

	if (!previous && !label) {
		return;
	}

	if (!previous) {
		enter = true;
	} else if (!label) {
		leave = true;
	} else if (previous !== label) {
		leave = enter = true;
	}

	if (leave) {
		dispatchEvent(chart, listeners.leave, previous);
	}
	if (enter) {
		dispatchEvent(chart, listeners.enter, label);
	}
}

function handleMoveEvents(chart, event) {
	var expando = chart[EXPANDO_KEY];
	var listeners = expando._listeners;
	var previous, label;

	if (!listeners.enter && !listeners.leave) {
		return;
	}

	if (event.type === 'mousemove') {
		label = layout.lookup(expando._labels, event);
	} else if (event.type !== 'mouseout') {
		return;
	}

	previous = expando._hovered;
	expando._hovered = label;
	dispatchMoveEvents(chart, listeners, previous, label);
}

function handleClickEvents(chart, event) {
	var expando = chart[EXPANDO_KEY];
	var handlers = expando._listeners.click;
	var label = handlers && layout.lookup(expando._labels, event);
	if (label) {
		dispatchEvent(chart, handlers, label);
	}
}

// https://github.com/chartjs/chartjs-plugin-datalabels/issues/108
function invalidate(chart) {
	if (chart.animating) {
		return;
	}

	// `chart.animating` can be `false` even if there is animation in progress,
	// so let's iterate all animations to find if there is one for the `chart`.
	var animations = Chart.animationService.animations;
	for (var i = 0, ilen = animations.length; i < ilen; ++i) {
		if (animations[i].chart === chart) {
			return;
		}
	}

	// No render scheduled: trigger a "lazy" render that can be canceled in case
	// of hover interactions. The 1ms duration is a workaround to make sure an
	// animation is created so the controller can stop it before any transition.
	chart.render({duration: 1, lazy: true});
}

Chart.defaults.global.plugins.datalabels = defaults;

var plugin = {
	id: 'datalabels',

	beforeInit: function(chart) {
		chart[EXPANDO_KEY] = {
			_actives: []
		};
	},

	beforeUpdate: function(chart) {
		var expando = chart[EXPANDO_KEY];
		expando._listened = false;
		expando._listeners = {};     // {<event-type>: {<dataset-index>: {<label-key>: <fn>}}}
		expando._datasets = [];      // per dataset labels: [Label[]]
		expando._labels = [];        // layouted labels: Label[]
	},

	afterDatasetUpdate: function(chart, args, options) {
		var datasetIndex = args.index;
		var expando = chart[EXPANDO_KEY];
		var labels = expando._datasets[datasetIndex] = [];
		var visible = chart.isDatasetVisible(datasetIndex);
		var dataset = chart.data.datasets[datasetIndex];
		var config = configure(dataset, options);
		var elements = args.meta.data || [];
		var ctx = chart.ctx;
		var i, j, ilen, jlen, cfg, key, el, label;

		ctx.save();

		for (i = 0, ilen = elements.length; i < ilen; ++i) {
			el = elements[i];
			el[EXPANDO_KEY] = [];

			if (visible && el && !el.hidden && !el._model.skip) {
				for (j = 0, jlen = config.labels.length; j < jlen; ++j) {
					cfg = config.labels[j];
					key = cfg._key;

					label = new Label(cfg, ctx, el, i);
					label.$groups = {
						_set: datasetIndex,
						_key: key || DEFAULT_KEY
					};
					label.$context = {
						active: false,
						chart: chart,
						dataIndex: i,
						dataset: dataset,
						datasetIndex: datasetIndex
					};

					label.update(label.$context);
					el[EXPANDO_KEY].push(label);
					labels.push(label);
				}
			}
		}

		ctx.restore();

		// Store listeners at the chart level and per event type to optimize
		// cases where no listeners are registered for a specific event.
		helpers$4.merge(expando._listeners, config.listeners, {
			merger: function(event, target, source) {
				target[event] = target[event] || {};
				target[event][args.index] = source[event];
				expando._listened = true;
			}
		});
	},

	afterUpdate: function(chart, options) {
		chart[EXPANDO_KEY]._labels = layout.prepare(
			chart[EXPANDO_KEY]._datasets,
			options);
	},

	// Draw labels on top of all dataset elements
	// https://github.com/chartjs/chartjs-plugin-datalabels/issues/29
	// https://github.com/chartjs/chartjs-plugin-datalabels/issues/32
	afterDatasetsDraw: function(chart) {
		layout.draw(chart, chart[EXPANDO_KEY]._labels);
	},

	beforeEvent: function(chart, event) {
		// If there is no listener registered for this chart, `listened` will be false,
		// meaning we can immediately ignore the incoming event and avoid useless extra
		// computation for users who don't implement label interactions.
		if (chart[EXPANDO_KEY]._listened) {
			switch (event.type) {
			case 'mousemove':
			case 'mouseout':
				handleMoveEvents(chart, event);
				break;
			case 'click':
				handleClickEvents(chart, event);
				break;
			default:
			}
		}
	},

	afterEvent: function(chart) {
		var expando = chart[EXPANDO_KEY];
		var previous = expando._actives;
		var actives = expando._actives = chart.lastActive || [];  // public API?!
		var updates = utils.arrayDiff(previous, actives);
		var i, ilen, j, jlen, update, label, labels;

		for (i = 0, ilen = updates.length; i < ilen; ++i) {
			update = updates[i];
			if (update[1]) {
				labels = update[0][EXPANDO_KEY] || [];
				for (j = 0, jlen = labels.length; j < jlen; ++j) {
					label = labels[j];
					label.$context.active = (update[1] === 1);
					label.update(label.$context);
				}
			}
		}

		if (expando._dirty || updates.length) {
			layout.update(expando._labels);
			invalidate(chart);
		}

		delete expando._dirty;
	}
};

// TODO Remove at version 1, we shouldn't automatically register plugins.
// https://github.com/chartjs/chartjs-plugin-datalabels/issues/42
Chart.plugins.register(plugin);

return plugin;

}));


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/chars/chars.component.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/chars/chars.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"chart insight-chart\" *ngIf=\"ChartType!='bar' && ChartType!='line'\" >\n     <canvas  baseChart \n     [data]=\"ChartData\" \n     [labels]=\"ChartLabels\" \n     [options]=\"ChartOptions\"\n     [chartType]=\"ChartType\" \n     [legend]=\"ChartLegend\"\n     (chartHover)=\"chartHovered($event)\" \n     (chartClick)=\"chartClicked($event)\">\n     </canvas>\n     </div>\n\n\n\n<div class=\"chart insight-chart\"  *ngIf=\"ChartType=='bar'\" >\n     <canvas  baseChart \n     [datasets]=\"ChartData\" \n     [labels]=\"ChartLabels\" \n     [options]=\"ChartOptions\"\n     [chartType]=\"ChartType\" \n     [legend]=\"ChartLegend\"\n     (chartHover)=\"chartHovered($event)\" \n     (chartClick)=\"chartClicked($event)\">\n     </canvas>\n     </div>\n\n<div class=\"chart insight-chart\"  *ngIf=\"ChartType=='line'\" >\n\n     <canvas baseChart \n                [datasets]=\"ChartData\"\n                [labels]=\"ChartLabels\"\n                [options]=\"lineChartOptions\"\n                [colors]=\"lineChartColors\"\n                [legend]=\"lineChartLegend\"\n                [chartType]=\"lineChartType\"\n                [plugins]=\"lineChartPlugins\"\n                (chartHover)=\"chartHovered($event)\"\n                (chartClick)=\"chartClicked($event)\"></canvas>\n    </div>\n    \n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/message-center/message-center.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/message-center/message-center.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--ion-content padding-horizontal padding-top -->\n<ion-header style='display: block;\n    position: relative;\n    -ms-flex-order: -1;\n    order: -1;\n    width: 100%;\n    z-index: 10;'>\n  <ion-toolbar>\n    <ion-buttons  slot=\"start\" (click)='myBackButton()'>\n      <ion-button>\n        <ion-icon name=\"arrow-back\"></ion-icon>\n</ion-button>\n    </ion-buttons>\n\n    <ion-title>Insights</ion-title>\n\n    <!--ion-buttons slot=\"end\">\n      <ion-button (click)=\"presentFilter()\">\n        <span *ngIf=\"ios\">Filter</span>\n        <span *ngIf=\"!ios\">\n          <ion-icon slot=\"icon-only\" name=\"options\"></ion-icon>\n        </span>\n      </ion-button>\n    </ion-buttons-->\n  </ion-toolbar>\n\n  <!--ion-toolbar>\n    <ion-searchbar [(ngModel)]=\"queryText\" (ionChange)=\"updateSchedule()\" placeholder=\"Search\"></ion-searchbar>\n  </ion-toolbar-->\n</ion-header>\n<ion-content #content>\n<div padding-horizontal padding-top >\n  \n  <div #msgs class=\"messages-list msgs\" #scrollMe>\n      \n    <div *ngFor=\"let msg of messages; let index=index;\">\n      \n\n      <div *ngIf=\"msg.sender === 'script'\" class=\"message-script\" [class.buttons-msg]=\"msg.type=='buttons'\">\n        {{msg.text}}\n      </div>\n      <div *ngIf=\"msg.data\" style=\"margin-bottom:20px;\">\n        \n        <span *ngIf=\"msg.data.type=='circle'\" >\n          <div style=\"border: solid 5px deepskyblue;\n    border-radius: 50%;\n    width: 170px;\n    height: 170px;\n    background-color: aliceblue;\n    text-align: center;\n    margin: auto;\"> <p style=\"color: grey;\n    margin-top: 40%;\n    font-weight: bold;\n    font-size: 1.1em;\">320 dinars</p></div>\n        </span>\n        <span *ngIf=\"msg.data.type=='objective'\" >\n          <div class=\"quantity buttons_added\">\n\n            <p class='quantity-text'>Logement</p>\n  <input  [disabled]=\"msg.selected\" type=\"button\" value=\"-\" class=\"minus\" (click)='minus(index,0)'><input [disabled]=\"msg.selected\" type=\"number\" step=\"1\" min=\"0\" [(ngModel)]=\"msg.data.data[0].data[0]\" max=\"\" name=\"quantity\" value=\"340\" title=\"Qty\" class=\"input-text qty text\" size=\"4\" pattern=\"\" inputmode=\"\"><input [disabled]=\"msg.selected\" type=\"button\" value=\"+\" class=\"plus\" (click)='plus(index,0)'>\n</div>\n<div class=\"quantity buttons_added\">\n\n            <p class='quantity-text'>Courses</p>\n  <input [disabled]=\"msg.selected\" type=\"button\" value=\"-\" class=\"minus\" (click)='minus(index,1)'><input [disabled]=\"msg.selected\"  type=\"number\" step=\"1\" min=\"0\" [(ngModel)]=\"msg.data.data[1].data[0]\" max=\"\" name=\"quantity\" value=\"230\" title=\"Qty\" class=\"input-text qty text\" size=\"4\" pattern=\"\" inputmode=\"\"><input [disabled]=\"msg.selected\" type=\"button\" value=\"+\" class=\"plus\" (click)='plus(index,1)'>\n</div>\n<div class=\"quantity buttons_added\">\n\n            <p class='quantity-text'>Restaurants</p>\n  <input [disabled]=\"msg.selected\" type=\"button\" value=\"-\" class=\"minus\" (click)='minus(index,2)'><input [disabled]=\"msg.selected\"  type=\"number\" step=\"1\" min=\"0\" max=\"\" name=\"quantity\" [(ngModel)]=\"msg.data.data[2].data[0]\" title=\"Qty\" class=\"input-text qty text\" size=\"4\" pattern=\"\" inputmode=\"\"><input [disabled]=\"msg.selected\" type=\"button\" value=\"+\" class=\"plus\" (click)='plus(index,2)'>\n</div>\n<div class=\"quantity buttons_added\">\n\n            <p class='quantity-text'>Loisirs</p>\n  <input [disabled]=\"msg.selected\" type=\"button\" value=\"-\" class=\"minus\" (click)='minus(index,3)'><input  [disabled]=\"msg.selected\" type=\"number\" step=\"1\" min=\"0\" [(ngModel)]=\"msg.data.data[3].data[0]\" max=\"\" name=\"quantity\" value=\"0\" title=\"Qty\" class=\"input-text qty text\" size=\"4\" pattern=\"\" inputmode=\"\"><input [disabled]=\"msg.selected\" type=\"button\" value=\"+\" class=\"plus\" (click)='plus(index,3)'>\n</div>\n              </span>\n        <span *ngIf=\"msg.data.type!='circle'&&msg.data.type!='objective'\" >\n      <chars \n    [datainsight]=\"msg.data\">\n  </chars>\n  </span>\n</div>\n<div *ngIf=\"msg.type=='userinput' && !msg.selected\">\n<ion-item  style=\"box-shadow: 0 0 15px 0 rgba(0,0,0,.1);\n    font-size: 12px;\n    min-height: 60px;\n    overflow: auto;\n    position: relative;\n    max-height: 50%;\">\n  <ion-textarea  [(ngModel)]=\"msg.userinput\" name=\"usertext\" placeholder=\"Enter message\"> </ion-textarea>\n  <ion-button (click)=\"senduserinput(msg.id,msg.userinput)\"><ion-icon name=\"arrow-dropright\"></ion-icon></ion-button>\n</ion-item>\n</div>\n\n      <div *ngIf=\"msg.options!==undefined\">\n        <div *ngIf=\"msg.type=='buttons'\" class=\"options buttons-option\">\n          <ion-list>\n            <ion-item *ngFor=\"let but of msg.options\">\n            \n            <button *ngIf=\"but.type=='redirection'\" ion-button routerLink=\"{{but.url}}\" routerDirection=\"forward\">\n                      {{but.text}}\n              </button >\n              <button *ngIf=\"but.type!='redirection'\"  ion-button (click)=\"onButtonClick(msg.id,but.id,but.type,but.text)\">\n                      {{but.text}}\n              </button >\n            </ion-item>\n  </ion-list>\n\n        <!--div class=\"message-options\" *ngFor=\"let opt of msg.options\"\n          (click)=\"onOptionClick(opt.id)\"\n          [ngClass]=\"{'active': opt.active}\">\n          <div class=\"icons\">\n            <div class=\"icon\"></div>\n            <div *ngIf=\"opt.id === 1 || opt.id === 2\" class=\"icon\"></div>\n            <div *ngIf=\"opt.id === 2\" class=\"icon\"></div>\n          </div>\n          <div class=\"text\">\n            {{opt.text}}\n          </div>\n        </div-->\n        </div>\n        <div *ngIf=\"msg.type=='replies' && !msg.selected\" class=\"quick-options\">\n          <ion-chip outline color=\"tertiary\" *ngFor=\"let but of msg.options\">\n              <ion-label color=\"tertiary\" (click)=\"onReplyClick(msg.id,but.id,but.text)\" >{{but.text}}</ion-label>\n          </ion-chip>\n\n        <!--div class=\"message-options\" *ngFor=\"let opt of msg.options\"\n          (click)=\"onOptionClick(opt.id)\"\n          [ngClass]=\"{'active': opt.active}\">\n          <div class=\"icons\">\n            <div class=\"icon\"></div>\n            <div *ngIf=\"opt.id === 1 || opt.id === 2\" class=\"icon\"></div>\n            <div *ngIf=\"opt.id === 2\" class=\"icon\"></div>\n          </div>\n          <div class=\"text\">\n            {{opt.text}}\n          </div>\n        </div-->\n        </div>\n      </div>\n\n      <div *ngIf=\"msg.sender === 'user'\" class=\"message-container\">\n        <div class=\"message-user\">\n          {{msg.text}}\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n\n  <!--div class=\"container\" *ngIf=\"showFooter\">\n    <div class=\"input-container\">\n      <ion-input placeholder=\"Your message goes here\" name=\"msg\" [(ngModel)]=\"msg\" (keyup.enter)=\"sendMessage(msg)\"></ion-input>\n    </div>\n    <ion-fab>\n      <ion-fab-button (click)=\"sendMessage(msg)\">\n        <ion-icon name=\"send\"></ion-icon>\n      </ion-fab-button>\n    </ion-fab>\n\n  </div-->\n  <!-- <iframe width=\"100%\" height=\"100%\" frameBorder=\"0\" [src]=\"iframeSrc\"></iframe> -->\n\n</div>\n\n</ion-content>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/simulator/simulator.page.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/simulator/simulator.page.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content padding>\n    <div class=\"modal-body p-0\" ngbAutofocus>\n      <iframe class=\"iframestyle\" #IFRAME [src]=\"url\"></iframe>\n    </div>\n  <!--ion-item lines=\"none\" class=\"header\">\n    <ion-thumbnail slot=\"start\">\n      <ion-img [src]=\"'assets/img/simulator.svg'\" alt=\"simulator\">\n      </ion-img>\n    </ion-thumbnail>\n    <ion-text color=\"tertiary\" text-center>\n      <h3>Loan simulation</h3>\n    </ion-text>\n  </ion-item>\n  <form #simulatorForm=\"ngForm\" class=\"ion-margin-top\">\n    <ion-label color=\"primary\">Loan amount</ion-label>\n    <ion-item class=\"input-container\">\n      <ion-input type=\"number\"\n        name=\"amount\"\n        [(ngModel)]=\"params.amount\">\n      </ion-input>\n    </ion-item>\n    <ion-range min=\"1000\" max=\"10000\" color=\"secondary\"\n      name=\"amountRange\"\n      [(ngModel)]=\"params.amount\">\n      \n    </ion-range>\n    <ion-label color=\"primary\">Loan term in months</ion-label>\n    <ion-item class=\"input-container\">\n      <ion-input type=\"number\" name=\"loanTerm\"\n        [(ngModel)]=\"params.loanTerm\">\n      </ion-input>\n    </ion-item>\n    <ion-range min=\"12\" max=\"36\" color=\"secondary\"\n      name=\"loanTermRange\"\n      [(ngModel)]=\"params.loanTerm\">\n      \n    </ion-range>\n    <ion-text color=\"primary\">\n      <h5>Summary of your simulation</h5>\n    </ion-text>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <ion-text color=\"dark\" text-center>\n            <div>Interest rate per year 2%</div>\n          </ion-text>\n        </ion-col>\n        <ion-col>\n          <ion-text color=\"dark\" class=\"result\" text-center>\n            <div class=\"\">Monthly payments</div>\n            <div class=\"\">€ {{result}}</div>\n          </ion-text>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-row>\n      <ion-col text-center>\n        <ion-button (click)=\"validate()\" mode=\"ios\">Validate</ion-button>\n      </ion-col>\n    </ion-row>\n  </form-->\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/chars/chars.component.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/chars/chars.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NoYXJzL2NoYXJzLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/pages/chars/chars.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/chars/chars.component.ts ***!
  \************************************************/
/*! exports provided: CharsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharsComponent", function() { return CharsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chartjs-plugin-datalabels */ "./node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js");
/* harmony import */ var chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! chartjs-plugin-annotation */ "./node_modules/chartjs-plugin-annotation/src/index.js");
/* harmony import */ var chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_3__);




let CharsComponent = class CharsComponent {
    constructor() {
        this.lineChartOptions = {
            plugins: {
                datalabels: {
                    // hide datalabels for all datasets
                    display: false
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                bodySpacing: 4,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            },
            responsive: 1,
            scales: {
                yAxes: [{
                        display: 0,
                        gridLines: {
                            zeroLineColor: "transparent",
                            drawTicks: false,
                            display: false,
                            drawBorder: false
                        }
                    }],
                xAxes: [{
                        gridLines: {
                            display: false,
                        }
                    }]
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 15,
                    bottom: 0
                },
                margin: {
                    left: 0,
                    right: 0
                }
            }
        };
        this.pieChartColors = [
            {
                backgroundColor: 'rgba(255,0,0,0.3)',
                borderColor: 'rgba(255,0,0,0.3)',
                pointBackgroundColor: 'rgba(255,0,0,0.3)',
                pointBorderColor: 'rgba(255,0,0,0.3)',
                pointHoverBackgroundColor: 'rgba(255,0,0,0.3)',
                pointHoverBorderColor: 'rgba(255,0,0,0.3)'
            }
        ];
        this.lineChartColors = [
            {
                backgroundColor: 'aliceblue',
                borderColor: 'aliceblue',
                pointBackgroundColor: '#3880ff',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(255,0,0,0.3)',
                borderColor: 'red',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.lineChartPlugins = [chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_3__];
        this.SystemName = "MF1";
        this.firstCopy = false;
        this.indexdata = 0;
        this.ChartOptions = {
            responsive: true,
            legend: {
                display: false,
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 15,
                    bottom: 0
                }
            },
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        if (ctx.chart.config.type == 'bar') {
                            if (this.indexdata >= ctx.chart.data.datasets.length)
                                this.indexdata = 0;
                            const label = ctx.chart.data.datasets[this.indexdata].label;
                            this.indexdata += 1;
                            return label;
                        }
                        else {
                            const label = ctx.chart.data.labels[ctx.dataIndex];
                            return label;
                        }
                    },
                },
            }
        };
        this.pieChartLegend = true;
        this.pieChartPlugins = [chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_2__];
        this.ChartLegend = true;
        this._lineChartColors = [{
                backgroundColor: 'red',
                borderColor: 'red',
                pointBackgroundColor: 'red',
                pointBorderColor: 'red',
                pointHoverBackgroundColor: 'red',
                pointHoverBorderColor: 'red'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }];
    }
    chartClicked(e) {
        console.log(e);
    }
    chartHovered(e) {
    }
    ngOnInit() {
        this.ChartData = this.datainsight.data;
        this.ChartLabels = this.datainsight.labels;
        this.ChartType = this.datainsight.type;
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], CharsComponent.prototype, "datainsight", void 0);
CharsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'chars',
        template: __webpack_require__(/*! raw-loader!./chars.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/chars/chars.component.html"),
        styles: [__webpack_require__(/*! ./chars.component.scss */ "./src/app/pages/chars/chars.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], CharsComponent);



/***/ }),

/***/ "./src/app/pages/message-center/message-center.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/message-center/message-center.module.ts ***!
  \***************************************************************/
/*! exports provided: MessageCenterPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageCenterPageModule", function() { return MessageCenterPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _simulator_simulator_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../simulator/simulator.page */ "./src/app/pages/simulator/simulator.page.ts");
/* harmony import */ var _message_center_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./message-center.page */ "./src/app/pages/message-center/message-center.page.ts");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm2015/ng2-charts.js");
/* harmony import */ var _chars_chars_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../chars/chars.component */ "./src/app/pages/chars/chars.component.ts");










const routes = [
    {
        path: '',
        component: _message_center_page__WEBPACK_IMPORTED_MODULE_7__["MessageCenterPage"]
    }
];
let MessageCenterPageModule = class MessageCenterPageModule {
};
MessageCenterPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            ng2_charts__WEBPACK_IMPORTED_MODULE_8__["ChartsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
        ],
        exports: [_chars_chars_component__WEBPACK_IMPORTED_MODULE_9__["CharsComponent"]],
        declarations: [_message_center_page__WEBPACK_IMPORTED_MODULE_7__["MessageCenterPage"], _simulator_simulator_page__WEBPACK_IMPORTED_MODULE_6__["SimulatorPage"], _chars_chars_component__WEBPACK_IMPORTED_MODULE_9__["CharsComponent"]],
        entryComponents: [
            _simulator_simulator_page__WEBPACK_IMPORTED_MODULE_6__["SimulatorPage"]
        ]
    })
], MessageCenterPageModule);



/***/ }),

/***/ "./src/app/pages/message-center/message-center.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/pages/message-center/message-center.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-item-sliding[track=ionic] ion-label {\n  border-left: 2px solid var(--ion-color-primary);\n  padding-left: 10px;\n}\n\nion-item-sliding[track=angular] ion-label {\n  border-left: 2px solid #ac282b;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=communication] ion-label {\n  border-left: 2px solid #8e8d93;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=tooling] ion-label {\n  border-left: 2px solid #fe4c52;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=services] ion-label {\n  border-left: 2px solid #fd8b2d;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=design] ion-label {\n  border-left: 2px solid #fed035;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=workshop] ion-label {\n  border-left: 2px solid #69bb7b;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=food] ion-label {\n  border-left: 2px solid #3bc7c4;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=documentation] ion-label {\n  border-left: 2px solid #b16be3;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=navigation] ion-label {\n  border-left: 2px solid #6600cc;\n  padding-left: 10px;\n}\n\n.red:before {\n  color: red;\n}\n\n.green:before {\n  color: green;\n}\n\n.flex_row {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n}\n\n.action-button {\n  border: none;\n  outline: none !important;\n  background: #fff;\n  cursor: pointer;\n  font-size: 17px;\n  font-family: Roboto;\n  line-height: 20px;\n  padding: 1rem 0.7rem;\n}\n\n.notif-text {\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 16px;\n  color: #444;\n}\n\n.notif-amount {\n  font-size: 32px;\n  font-weight: 500;\n  line-height: 43px;\n  color: #34a852;\n  margin: 10px 0;\n}\n\n.target-button {\n  font-size: 12px;\n  color: #222222;\n  text-transform: none;\n  font-weight: 700;\n  --padding-start: 18px;\n  --padding-end: 18px;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  height: 32px;\n  margin-top: 15px;\n}\n\n.messages-list {\n  padding-bottom: 70px;\n}\n\n.message-container {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.message-user {\n  max-width: 70%;\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  position: relative;\n  display: -ms-inline-grid;\n  display: inline-grid;\n  color: #fff;\n  font-size: 15px;\n  border-radius: 20px;\n  background: var(--ion-color-secondary);\n  margin: 0;\n  padding: 8.4px 12px 5.6px 13px;\n  /*  font-family: Helvetica;\n    font-size: 17px;*/\n  line-height: 20px;\n  text-align: left;\n  margin-bottom: 10px;\n}\n\n.message-script {\n  /*  padding-bottom: 100px;\n  height: 23px;\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 21px;\n  margin: 7px 0;\n  color: #444;*/\n}\n\n.options {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  margin-bottom: 10px;\n}\n\n.options .message-options {\n  width: 90px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  height: 64px;\n  border: 2px solid #bbbbbb;\n  background: white;\n  border-radius: 4px;\n}\n\n.options .message-options .icon {\n  width: 16px;\n  height: 4px;\n  background: #888888;\n  margin-bottom: 0.15rem;\n}\n\n.options .message-options .icons {\n  min-height: 19px;\n}\n\n.options .message-options .text {\n  height: 16px;\n  color: #444444;\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 16px;\n}\n\n.options .message-options.active {\n  background: #4184f3;\n  border: 2px solid #4184f3;\n}\n\n.options .message-options.active .icon {\n  background: white;\n}\n\n.options .message-options.active .text {\n  color: white;\n}\n\n.container {\n  background: white;\n  position: fixed;\n  padding-bottom: 10px;\n  padding-left: 16px;\n  padding-right: 16px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.container .input-container {\n  border: 2px solid #dddddd;\n  border-radius: 4px;\n  width: calc(100% - 55px);\n  z-index: 100;\n  display: inline-block;\n}\n\n.container .input-container ion-input {\n  height: 48px;\n  --padding-start: 5px;\n}\n\n.container ion-fab {\n  position: relative;\n  float: right;\n}\n\n.container ion-fab ion-fab-button {\n  height: 48px;\n  width: 48px;\n}\n\n.quick-options {\n  text-align: center;\n}\n\nion-toolbar {\n  --background: transparent;\n  --ion-color-base: transparent !important;\n}\n\nion-toolbar.show-background {\n  --background: #11325d;\n}\n\nion-header {\n  position: absolute;\n  top: 0;\n}\n\nion-button,\nion-buttons,\nion-icon {\n  /*color: #FFF;*/\n}\n\n.message-script {\n  white-space: pre-line;\n  max-width: 70%;\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  position: relative;\n  display: inline-grid;\n  color: #000;\n  font-size: 15px;\n  border-radius: 20px;\n  background: #f1f0f0;\n  margin: 0;\n  padding: 8.4px 12px 5.6px 13px;\n  /*  font-family: Helvetica;\n    font-size: 17px;*/\n  line-height: 20px;\n  text-align: left;\n  margin-bottom: 10px;\n}\n\n.buttons-msg {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n  margin-bottom: 0;\n}\n\n.buttons-option {\n  width: 70%;\n}\n\n.buttons-option ion-list {\n  width: 100%;\n}\n\n.buttons-option ion-list ion-item {\n  align-content: center;\n  text-align: center;\n  border: 1px solid #f1f0f0;\n  border-top: none;\n  --inner-border-width: 0;\n}\n\n.buttons-option ion-list ion-item button {\n  display: block;\n  width: 100%;\n  background: none;\n  color: #009de0;\n  font-size: 15px;\n  height: 100%;\n}\n\n.list-ios {\n  margin-bottom: 0 !important;\n}\n\n.quantity {\n  margin-bottom: 20px;\n  display: inline-block;\n  display: -webkit-box;\n  display: flex;\n}\n\n.quantity .input-text.qty {\n  width: 60px;\n  height: 41px;\n  padding: 0 5px;\n  text-align: center;\n  background-color: transparent;\n  border: 1px solid #efefef;\n}\n\n.quantity.buttons_added {\n  text-align: left;\n  position: relative;\n  white-space: nowrap;\n  vertical-align: top;\n}\n\n.quantity.buttons_added input {\n  display: inline-block;\n  margin: 0;\n  vertical-align: top;\n  box-shadow: none;\n}\n\n.quantity-text {\n  min-width: 120px;\n  margin: auto;\n  margin-left: 26px;\n  margin-right: 26px;\n}\n\n.quantity.buttons_added .minus,\n.quantity.buttons_added .plus {\n  padding: 7px 10px 8px;\n  height: 41px;\n  background-color: #ffffff;\n  border: 1px solid #efefef;\n  cursor: pointer;\n}\n\n.quantity.buttons_added .minus {\n  color: #fff;\n  background-color: #3880ff;\n  border-right: 0;\n}\n\n.quantity.buttons_added .plus {\n  color: #fff;\n  background-color: #3880ff;\n  border-left: 0;\n}\n\n.quantity input::-webkit-outer-spin-button,\n.quantity input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  margin: 0;\n}\n\n.quantity.buttons_added .minus:focus,\n.quantity.buttons_added .plus:focus {\n  outline: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudGZpdC9wc2QyL2lvbmljLWNvbmZlcmVuY2UtYXBwL3NyYy9hcHAvcGFnZXMvbWVzc2FnZS1jZW50ZXIvbWVzc2FnZS1jZW50ZXIucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9tZXNzYWdlLWNlbnRlci9tZXNzYWdlLWNlbnRlci5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY0U7RUFDRSwrQ0FBQTtFQUNBLGtCQUFBO0FDYko7O0FEV0U7RUFDRSw4QkFBQTtFQUNBLGtCQUFBO0FDUko7O0FETUU7RUFDRSw4QkFBQTtFQUNBLGtCQUFBO0FDSEo7O0FEQ0U7RUFDRSw4QkFBQTtFQUNBLGtCQUFBO0FDRUo7O0FESkU7RUFDRSw4QkFBQTtFQUNBLGtCQUFBO0FDT0o7O0FEVEU7RUFDRSw4QkFBQTtFQUNBLGtCQUFBO0FDWUo7O0FEZEU7RUFDRSw4QkFBQTtFQUNBLGtCQUFBO0FDaUJKOztBRG5CRTtFQUNFLDhCQUFBO0VBQ0Esa0JBQUE7QUNzQko7O0FEeEJFO0VBQ0UsOEJBQUE7RUFDQSxrQkFBQTtBQzJCSjs7QUQ3QkU7RUFDRSw4QkFBQTtFQUNBLGtCQUFBO0FDZ0NKOztBRDdCQTtFQUNJLFVBQUE7QUNnQ0o7O0FEN0JJO0VBQ0EsWUFBQTtBQ2dDSjs7QUQ3Qkk7RUFFQSxvQkFBQTtFQUFBLGFBQUE7RUFFQSw4QkFBQTtFQUFBLDZCQUFBO1VBQUEsbUJBQUE7QUNnQ0o7O0FEOUJBO0VBQ0UsWUFBQTtFQUNBLHdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtBQ2lDRjs7QUQ5QkE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7QUNpQ0Y7O0FEOUJBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsY0FBQTtBQ2lDRjs7QUQ5QkE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ2lDRjs7QUQ5QkE7RUFDRSxvQkFBQTtBQ2lDRjs7QUQ5QkE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxxQkFBQTtVQUFBLHlCQUFBO0FDaUNGOztBRDlCQTtFQUNFLGNBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSx3QkFBQTtFQUNBLG9CQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLHNDQUFBO0VBQ0EsU0FBQTtFQUNBLDhCQUFBO0VBQ0E7cUJBQUE7RUFFQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUNpQ0Y7O0FEOUJBO0VBQ0U7Ozs7OztlQUFBO0FDdUNGOztBRDlCQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxtQkFBQTtBQ2lDRjs7QUQvQkU7RUFDRSxXQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxZQUFBO0VBRUEseUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FDZ0NKOztBRDlCSTtFQUNFLFdBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtBQ2dDTjs7QUQ3Qkk7RUFDRSxnQkFBQTtBQytCTjs7QUQ1Qkk7RUFFRSxZQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FDNkJOOztBRDFCSTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7QUM0Qk47O0FEMUJNO0VBQ0UsaUJBQUE7QUM0QlI7O0FEekJNO0VBQ0UsWUFBQTtBQzJCUjs7QURyQkE7RUFDRSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7QUN3QkY7O0FEdEJFO0VBQ0UseUJBQUE7RUFDQSxrQkFBQTtFQUNBLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0FDd0JKOztBRHRCSTtFQUNFLFlBQUE7RUFDQSxvQkFBQTtBQ3dCTjs7QURwQkU7RUFDRSxrQkFBQTtFQUNBLFlBQUE7QUNzQko7O0FEcEJJO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUNzQk47O0FEbEJBO0VBQ0Usa0JBQUE7QUNxQkY7O0FEbkJBO0VBQ0UseUJBQUE7RUFDQSx3Q0FBQTtBQ3NCRjs7QURwQkU7RUFDRSxxQkFBQTtBQ3NCSjs7QURsQkE7RUFDRSxrQkFBQTtFQUNBLE1BQUE7QUNxQkY7O0FEbEJBOzs7RUFHRSxlQUFBO0FDcUJGOztBRGxCQTtFQUNHLHFCQUFBO0VBQ0QsY0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLDhCQUFBO0VBQ0E7cUJBQUE7RUFFQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUNxQkY7O0FEbEJBO0VBQ0UsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLGdCQUFBO0FDcUJGOztBRGxCQTtFQUNFLFVBQUE7QUNxQkY7O0FEbkJFO0VBQ0UsV0FBQTtBQ3FCSjs7QURuQkk7RUFDRSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FDcUJOOztBRG5CTTtFQUNFLGNBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUNxQlI7O0FEaEJBO0VBQ0UsMkJBQUE7QUNtQkY7O0FEZkE7RUFDRSxtQkFBQTtFQUVELHFCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0FDaUJEOztBRGZBO0VBQ0MsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSw2QkFBQTtFQUNBLHlCQUFBO0FDa0JEOztBRGZBO0VBQ0MsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUNrQkQ7O0FEaEJBO0VBQ0MscUJBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQ21CRDs7QURqQkE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0FDb0JKOztBRGxCQTs7RUFHQyxxQkFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtBQ29CRDs7QURsQkE7RUFDRSxXQUFBO0VBQ0EseUJBQUE7RUFDRCxlQUFBO0FDcUJEOztBRG5CQTtFQUNFLFdBQUE7RUFDQSx5QkFBQTtFQUNELGNBQUE7QUNzQkQ7O0FEbEJBOztFQUVDLHdCQUFBO0VBQ0EscUJBQUE7RUFDQSxTQUFBO0FDcUJEOztBRG5CQzs7RUFFQSxhQUFBO0FDc0JEIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbWVzc2FnZS1jZW50ZXIvbWVzc2FnZS1jZW50ZXIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJGNhdGVnb3JpZXM6IChcbiAgaW9uaWM6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSxcbiAgYW5ndWxhcjogI2FjMjgyYixcbiAgY29tbXVuaWNhdGlvbjogIzhlOGQ5MyxcbiAgdG9vbGluZzogI2ZlNGM1MixcbiAgc2VydmljZXM6ICNmZDhiMmQsXG4gIGRlc2lnbjogI2ZlZDAzNSxcbiAgd29ya3Nob3A6ICM2OWJiN2IsXG4gIGZvb2Q6ICMzYmM3YzQsXG4gIGRvY3VtZW50YXRpb246ICNiMTZiZTMsXG4gIG5hdmlnYXRpb246ICM2NjAwY2Ncbik7XG5cbkBlYWNoICR0cmFjaywgJHZhbHVlIGluIG1hcC1yZW1vdmUoJGNhdGVnb3JpZXMpIHtcbiAgaW9uLWl0ZW0tc2xpZGluZ1t0cmFjaz0nI3skdHJhY2t9J10gaW9uLWxhYmVsIHtcbiAgICBib3JkZXItbGVmdDogMnB4IHNvbGlkICR2YWx1ZTtcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gIH1cbn1cbi5yZWQ6YmVmb3JlIHtcbiAgICBjb2xvcjogcmVkO1xuICAgIH1cblxuICAgIC5ncmVlbjpiZWZvcmUge1xuICAgIGNvbG9yOiBncmVlbjtcbiAgICB9XG5cbiAgICAuZmxleF9yb3cge1xuICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC13ZWJraXQtZmxleC1kaXJlY3Rpb246IHJvdzsgXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICB9XG4uYWN0aW9uLWJ1dHRvbiB7XG4gIGJvcmRlcjogbm9uZTtcbiAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgZm9udC1mYW1pbHk6IFJvYm90bztcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIHBhZGRpbmc6IDFyZW0gMC43cmVtO1xufVxuXG4ubm90aWYtdGV4dCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gIGNvbG9yOiAjNDQ0O1xufVxuXG4ubm90aWYtYW1vdW50IHtcbiAgZm9udC1zaXplOiAzMnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBsaW5lLWhlaWdodDogNDNweDtcbiAgY29sb3I6ICMzNGE4NTI7XG4gIG1hcmdpbjogMTBweCAwO1xufVxuXG4udGFyZ2V0LWJ1dHRvbiB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6ICMyMjIyMjI7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBmb250LXdlaWdodDogNzAwO1xuICAtLXBhZGRpbmctc3RhcnQ6IDE4cHg7XG4gIC0tcGFkZGluZy1lbmQ6IDE4cHg7XG4gIC0tcGFkZGluZy10b3A6IDA7XG4gIC0tcGFkZGluZy1ib3R0b206IDA7XG4gIGhlaWdodDogMzJweDtcbiAgbWFyZ2luLXRvcDogMTVweDtcbn1cblxuLm1lc3NhZ2VzLWxpc3Qge1xuICBwYWRkaW5nLWJvdHRvbTogNzBweDtcbn1cblxuLm1lc3NhZ2UtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cblxuLm1lc3NhZ2UtdXNlciB7XG4gIG1heC13aWR0aDogNzAlO1xuICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogLW1zLWlubGluZS1ncmlkO1xuICBkaXNwbGF5OiBpbmxpbmUtZ3JpZDtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtc2l6ZToxNXB4O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiA4LjRweCAxMnB4IDUuNnB4IDEzcHg7XG4gIC8qICBmb250LWZhbWlseTogSGVsdmV0aWNhO1xuICAgIGZvbnQtc2l6ZTogMTdweDsqL1xuICBsaW5lLWhlaWdodDogMjBweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLm1lc3NhZ2Utc2NyaXB0IHtcbiAgLyogIHBhZGRpbmctYm90dG9tOiAxMDBweDtcbiAgaGVpZ2h0OiAyM3B4O1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGxpbmUtaGVpZ2h0OiAyMXB4O1xuICBtYXJnaW46IDdweCAwO1xuICBjb2xvcjogIzQ0NDsqL1xufVxuXG4ub3B0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcblxuICAubWVzc2FnZS1vcHRpb25zIHtcbiAgICB3aWR0aDogOTBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBoZWlnaHQ6IDY0cHg7XG5cbiAgICBib3JkZXI6IDJweCBzb2xpZCAjYmJiYmJiO1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAvLyB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgLmljb24ge1xuICAgICAgd2lkdGg6IDE2cHg7XG4gICAgICBoZWlnaHQ6IDRweDtcbiAgICAgIGJhY2tncm91bmQ6ICM4ODg4ODg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjE1cmVtO1xuICAgIH1cblxuICAgIC5pY29ucyB7XG4gICAgICBtaW4taGVpZ2h0OiAxOXB4O1xuICAgIH1cblxuICAgIC50ZXh0IHtcbiAgICAgIC8vIHdpZHRoOiA5NnB4O1xuICAgICAgaGVpZ2h0OiAxNnB4O1xuICAgICAgY29sb3I6ICM0NDQ0NDQ7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gICAgfVxuXG4gICAgJi5hY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogIzQxODRmMztcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkICM0MTg0ZjM7XG5cbiAgICAgIC5pY29uIHtcbiAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICB9XG5cbiAgICAgIC50ZXh0IHtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4uY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gIHBhZGRpbmctbGVmdDogMTZweDtcbiAgcGFkZGluZy1yaWdodDogMTZweDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcblxuICAuaW5wdXQtY29udGFpbmVyIHtcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjZGRkZGRkO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICB3aWR0aDogY2FsYygxMDAlIC0gNTVweCk7XG4gICAgei1pbmRleDogMTAwO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblxuICAgIGlvbi1pbnB1dCB7XG4gICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDVweDtcbiAgICB9XG4gIH1cblxuICBpb24tZmFiIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuXG4gICAgaW9uLWZhYi1idXR0b24ge1xuICAgICAgaGVpZ2h0OiA0OHB4O1xuICAgICAgd2lkdGg6IDQ4cHg7XG4gICAgfVxuICB9XG59XG4ucXVpY2stb3B0aW9uc3tcbiAgdGV4dC1hbGlnbjpjZW50ZXI7XG59XG5pb24tdG9vbGJhciB7XG4gIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIC0taW9uLWNvbG9yLWJhc2U6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG5cbiAgJi5zaG93LWJhY2tncm91bmQge1xuICAgIC0tYmFja2dyb3VuZDogIzExMzI1ZDtcbiAgfVxufVxuXG5pb24taGVhZGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG59XG5cbmlvbi1idXR0b24sXG5pb24tYnV0dG9ucyxcbmlvbi1pY29uIHtcbiAgLypjb2xvcjogI0ZGRjsqL1xufVxuXG4ubWVzc2FnZS1zY3JpcHQge1xuICAgd2hpdGUtc3BhY2U6cHJlLWxpbmU7XG4gIG1heC13aWR0aDogNzAlO1xuICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWdyaWQ7XG4gIGNvbG9yOiAjMDAwO1xuICBmb250LXNpemU6IDE1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIGJhY2tncm91bmQ6ICNmMWYwZjA7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogOC40cHggMTJweCA1LjZweCAxM3B4O1xuICAvKiAgZm9udC1mYW1pbHk6IEhlbHZldGljYTtcbiAgICBmb250LXNpemU6IDE3cHg7Ki9cbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5idXR0b25zLW1zZyB7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG4uYnV0dG9ucy1vcHRpb24ge1xuICB3aWR0aDogNzAlO1xuXG4gIGlvbi1saXN0IHtcbiAgICB3aWR0aDogMTAwJTtcblxuICAgIGlvbi1pdGVtIHtcbiAgICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNmMWYwZjA7XG4gICAgICBib3JkZXItdG9wOiBub25lO1xuICAgICAgLS1pbm5lci1ib3JkZXItd2lkdGg6IDA7XG5cbiAgICAgIGJ1dHRvbiB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgICAgY29sb3I6IzAwOWRlMDtcbiAgICAgICAgZm9udC1zaXplOjE1cHg7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbi5saXN0LWlvc3tcbiAgbWFyZ2luLWJvdHRvbTowIWltcG9ydGFudDtcbn1cblxuXG4ucXVhbnRpdHkge1xuICBtYXJnaW4tYm90dG9tOjIwcHg7XG5cbiBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gZGlzcGxheTogZmxleDsgfVxuXG4ucXVhbnRpdHkgLmlucHV0LXRleHQucXR5IHtcbiB3aWR0aDogNjBweDtcbiBoZWlnaHQ6IDQxcHg7XG4gcGFkZGluZzogMCA1cHg7XG4gdGV4dC1hbGlnbjogY2VudGVyO1xuIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuIGJvcmRlcjogMXB4IHNvbGlkICNlZmVmZWY7XG59XG5cbi5xdWFudGl0eS5idXR0b25zX2FkZGVkIHtcbiB0ZXh0LWFsaWduOiBsZWZ0O1xuIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiB3aGl0ZS1zcGFjZTogbm93cmFwO1xuIHZlcnRpY2FsLWFsaWduOiB0b3A7IH1cblxuLnF1YW50aXR5LmJ1dHRvbnNfYWRkZWQgaW5wdXQge1xuIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiBtYXJnaW46IDA7XG4gdmVydGljYWwtYWxpZ246IHRvcDtcbiBib3gtc2hhZG93OiBub25lO1xufVxuLnF1YW50aXR5LXRleHR7XG4gIG1pbi13aWR0aDogMTIwcHg7XG4gIG1hcmdpbjogYXV0bztcbiAgICBtYXJnaW4tbGVmdDogMjZweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDI2cHg7XG59XG4ucXVhbnRpdHkuYnV0dG9uc19hZGRlZCAubWludXMsXG4ucXVhbnRpdHkuYnV0dG9uc19hZGRlZCAucGx1cyB7XG4gIFxuIHBhZGRpbmc6IDdweCAxMHB4IDhweDtcbiBoZWlnaHQ6IDQxcHg7XG4gYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiBib3JkZXI6IDFweCBzb2xpZCAjZWZlZmVmO1xuIGN1cnNvcjpwb2ludGVyO31cblxuLnF1YW50aXR5LmJ1dHRvbnNfYWRkZWQgLm1pbnVzIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzODgwZmY7XG4gYm9yZGVyLXJpZ2h0OiAwOyB9XG5cbi5xdWFudGl0eS5idXR0b25zX2FkZGVkIC5wbHVzIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzODgwZmY7XG4gYm9yZGVyLWxlZnQ6IDA7IH1cblxuXG5cbi5xdWFudGl0eSBpbnB1dDo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbixcbi5xdWFudGl0eSBpbnB1dDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XG4gLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiBtYXJnaW46IDA7IH1cbiBcbiAucXVhbnRpdHkuYnV0dG9uc19hZGRlZCAubWludXM6Zm9jdXMsXG4ucXVhbnRpdHkuYnV0dG9uc19hZGRlZCAucGx1czpmb2N1cyB7XG4gb3V0bGluZTogbm9uZTsgfVxuIiwiaW9uLWl0ZW0tc2xpZGluZ1t0cmFjaz1pb25pY10gaW9uLWxhYmVsIHtcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuaW9uLWl0ZW0tc2xpZGluZ1t0cmFjaz1hbmd1bGFyXSBpb24tbGFiZWwge1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICNhYzI4MmI7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuaW9uLWl0ZW0tc2xpZGluZ1t0cmFjaz1jb21tdW5pY2F0aW9uXSBpb24tbGFiZWwge1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICM4ZThkOTM7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuaW9uLWl0ZW0tc2xpZGluZ1t0cmFjaz10b29saW5nXSBpb24tbGFiZWwge1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICNmZTRjNTI7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuaW9uLWl0ZW0tc2xpZGluZ1t0cmFjaz1zZXJ2aWNlc10gaW9uLWxhYmVsIHtcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCAjZmQ4YjJkO1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG59XG5cbmlvbi1pdGVtLXNsaWRpbmdbdHJhY2s9ZGVzaWduXSBpb24tbGFiZWwge1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICNmZWQwMzU7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuaW9uLWl0ZW0tc2xpZGluZ1t0cmFjaz13b3Jrc2hvcF0gaW9uLWxhYmVsIHtcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCAjNjliYjdiO1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG59XG5cbmlvbi1pdGVtLXNsaWRpbmdbdHJhY2s9Zm9vZF0gaW9uLWxhYmVsIHtcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCAjM2JjN2M0O1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG59XG5cbmlvbi1pdGVtLXNsaWRpbmdbdHJhY2s9ZG9jdW1lbnRhdGlvbl0gaW9uLWxhYmVsIHtcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCAjYjE2YmUzO1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG59XG5cbmlvbi1pdGVtLXNsaWRpbmdbdHJhY2s9bmF2aWdhdGlvbl0gaW9uLWxhYmVsIHtcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCAjNjYwMGNjO1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG59XG5cbi5yZWQ6YmVmb3JlIHtcbiAgY29sb3I6IHJlZDtcbn1cblxuLmdyZWVuOmJlZm9yZSB7XG4gIGNvbG9yOiBncmVlbjtcbn1cblxuLmZsZXhfcm93IHtcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICBkaXNwbGF5OiBmbGV4O1xuICAtd2Via2l0LWZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG59XG5cbi5hY3Rpb24tYnV0dG9uIHtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAxN3B4O1xuICBmb250LWZhbWlseTogUm9ib3RvO1xuICBsaW5lLWhlaWdodDogMjBweDtcbiAgcGFkZGluZzogMXJlbSAwLjdyZW07XG59XG5cbi5ub3RpZi10ZXh0IHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgY29sb3I6ICM0NDQ7XG59XG5cbi5ub3RpZi1hbW91bnQge1xuICBmb250LXNpemU6IDMycHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGxpbmUtaGVpZ2h0OiA0M3B4O1xuICBjb2xvcjogIzM0YTg1MjtcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG5cbi50YXJnZXQtYnV0dG9uIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogIzIyMjIyMjtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIC0tcGFkZGluZy1zdGFydDogMThweDtcbiAgLS1wYWRkaW5nLWVuZDogMThweDtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBtYXJnaW4tdG9wOiAxNXB4O1xufVxuXG4ubWVzc2FnZXMtbGlzdCB7XG4gIHBhZGRpbmctYm90dG9tOiA3MHB4O1xufVxuXG4ubWVzc2FnZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufVxuXG4ubWVzc2FnZS11c2VyIHtcbiAgbWF4LXdpZHRoOiA3MCU7XG4gIG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiAtbXMtaW5saW5lLWdyaWQ7XG4gIGRpc3BsYXk6IGlubGluZS1ncmlkO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiA4LjRweCAxMnB4IDUuNnB4IDEzcHg7XG4gIC8qICBmb250LWZhbWlseTogSGVsdmV0aWNhO1xuICAgIGZvbnQtc2l6ZTogMTdweDsqL1xuICBsaW5lLWhlaWdodDogMjBweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLm1lc3NhZ2Utc2NyaXB0IHtcbiAgLyogIHBhZGRpbmctYm90dG9tOiAxMDBweDtcbiAgaGVpZ2h0OiAyM3B4O1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGxpbmUtaGVpZ2h0OiAyMXB4O1xuICBtYXJnaW46IDdweCAwO1xuICBjb2xvcjogIzQ0NDsqL1xufVxuXG4ub3B0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbi5vcHRpb25zIC5tZXNzYWdlLW9wdGlvbnMge1xuICB3aWR0aDogOTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogNjRweDtcbiAgYm9yZGVyOiAycHggc29saWQgI2JiYmJiYjtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cbi5vcHRpb25zIC5tZXNzYWdlLW9wdGlvbnMgLmljb24ge1xuICB3aWR0aDogMTZweDtcbiAgaGVpZ2h0OiA0cHg7XG4gIGJhY2tncm91bmQ6ICM4ODg4ODg7XG4gIG1hcmdpbi1ib3R0b206IDAuMTVyZW07XG59XG4ub3B0aW9ucyAubWVzc2FnZS1vcHRpb25zIC5pY29ucyB7XG4gIG1pbi1oZWlnaHQ6IDE5cHg7XG59XG4ub3B0aW9ucyAubWVzc2FnZS1vcHRpb25zIC50ZXh0IHtcbiAgaGVpZ2h0OiAxNnB4O1xuICBjb2xvcjogIzQ0NDQ0NDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBsaW5lLWhlaWdodDogMTZweDtcbn1cbi5vcHRpb25zIC5tZXNzYWdlLW9wdGlvbnMuYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogIzQxODRmMztcbiAgYm9yZGVyOiAycHggc29saWQgIzQxODRmMztcbn1cbi5vcHRpb25zIC5tZXNzYWdlLW9wdGlvbnMuYWN0aXZlIC5pY29uIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG59XG4ub3B0aW9ucyAubWVzc2FnZS1vcHRpb25zLmFjdGl2ZSAudGV4dCB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICBwYWRkaW5nLWxlZnQ6IDE2cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDE2cHg7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG59XG4uY29udGFpbmVyIC5pbnB1dC1jb250YWluZXIge1xuICBib3JkZXI6IDJweCBzb2xpZCAjZGRkZGRkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA1NXB4KTtcbiAgei1pbmRleDogMTAwO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG4uY29udGFpbmVyIC5pbnB1dC1jb250YWluZXIgaW9uLWlucHV0IHtcbiAgaGVpZ2h0OiA0OHB4O1xuICAtLXBhZGRpbmctc3RhcnQ6IDVweDtcbn1cbi5jb250YWluZXIgaW9uLWZhYiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuLmNvbnRhaW5lciBpb24tZmFiIGlvbi1mYWItYnV0dG9uIHtcbiAgaGVpZ2h0OiA0OHB4O1xuICB3aWR0aDogNDhweDtcbn1cblxuLnF1aWNrLW9wdGlvbnMge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmlvbi10b29sYmFyIHtcbiAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgLS1pb24tY29sb3ItYmFzZTogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbn1cbmlvbi10b29sYmFyLnNob3ctYmFja2dyb3VuZCB7XG4gIC0tYmFja2dyb3VuZDogIzExMzI1ZDtcbn1cblxuaW9uLWhlYWRlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xufVxuXG5pb24tYnV0dG9uLFxuaW9uLWJ1dHRvbnMsXG5pb24taWNvbiB7XG4gIC8qY29sb3I6ICNGRkY7Ki9cbn1cblxuLm1lc3NhZ2Utc2NyaXB0IHtcbiAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xuICBtYXgtd2lkdGg6IDcwJTtcbiAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ncmlkO1xuICBjb2xvcjogIzAwMDtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBiYWNrZ3JvdW5kOiAjZjFmMGYwO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDguNHB4IDEycHggNS42cHggMTNweDtcbiAgLyogIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2E7XG4gICAgZm9udC1zaXplOiAxN3B4OyovXG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uYnV0dG9ucy1tc2cge1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuLmJ1dHRvbnMtb3B0aW9uIHtcbiAgd2lkdGg6IDcwJTtcbn1cbi5idXR0b25zLW9wdGlvbiBpb24tbGlzdCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmJ1dHRvbnMtb3B0aW9uIGlvbi1saXN0IGlvbi1pdGVtIHtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmMWYwZjA7XG4gIGJvcmRlci10b3A6IG5vbmU7XG4gIC0taW5uZXItYm9yZGVyLXdpZHRoOiAwO1xufVxuLmJ1dHRvbnMtb3B0aW9uIGlvbi1saXN0IGlvbi1pdGVtIGJ1dHRvbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgY29sb3I6ICMwMDlkZTA7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4ubGlzdC1pb3Mge1xuICBtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7XG59XG5cbi5xdWFudGl0eSB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLnF1YW50aXR5IC5pbnB1dC10ZXh0LnF0eSB7XG4gIHdpZHRoOiA2MHB4O1xuICBoZWlnaHQ6IDQxcHg7XG4gIHBhZGRpbmc6IDAgNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWZlZmVmO1xufVxuXG4ucXVhbnRpdHkuYnV0dG9uc19hZGRlZCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbn1cblxuLnF1YW50aXR5LmJ1dHRvbnNfYWRkZWQgaW5wdXQge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbjogMDtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cblxuLnF1YW50aXR5LXRleHQge1xuICBtaW4td2lkdGg6IDEyMHB4O1xuICBtYXJnaW46IGF1dG87XG4gIG1hcmdpbi1sZWZ0OiAyNnB4O1xuICBtYXJnaW4tcmlnaHQ6IDI2cHg7XG59XG5cbi5xdWFudGl0eS5idXR0b25zX2FkZGVkIC5taW51cyxcbi5xdWFudGl0eS5idXR0b25zX2FkZGVkIC5wbHVzIHtcbiAgcGFkZGluZzogN3B4IDEwcHggOHB4O1xuICBoZWlnaHQ6IDQxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZmVmZWY7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnF1YW50aXR5LmJ1dHRvbnNfYWRkZWQgLm1pbnVzIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzODgwZmY7XG4gIGJvcmRlci1yaWdodDogMDtcbn1cblxuLnF1YW50aXR5LmJ1dHRvbnNfYWRkZWQgLnBsdXMge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM4ODBmZjtcbiAgYm9yZGVyLWxlZnQ6IDA7XG59XG5cbi5xdWFudGl0eSBpbnB1dDo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbixcbi5xdWFudGl0eSBpbnB1dDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICBtYXJnaW46IDA7XG59XG5cbi5xdWFudGl0eS5idXR0b25zX2FkZGVkIC5taW51czpmb2N1cyxcbi5xdWFudGl0eS5idXR0b25zX2FkZGVkIC5wbHVzOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/message-center/message-center.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/message-center/message-center.page.ts ***!
  \*************************************************************/
/*! exports provided: MessageCenterPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageCenterPage", function() { return MessageCenterPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _providers_messages_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../providers/messages.service */ "./src/app/providers/messages.service.ts");
/* harmony import */ var _simulator_simulator_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../simulator/simulator.page */ "./src/app/pages/simulator/simulator.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");







let MessageCenterPage = class MessageCenterPage {
    constructor(modalController, Message, router, location) {
        this.modalController = modalController;
        this.Message = Message;
        this.router = router;
        this.location = location;
        this.selectedSlide = 0;
        this.messages = [];
        this.slideOpts = {
            initialSlide: 0,
            speed: 400
        };
        this.errorInfos = [
            {
                "id": -1,
                "text": "Your transactions this month show that you spent 2450€ compared to 1260€ on average. Based on this trend, you might be overdrawn in the next days",
                "type": "text",
                "selected": false,
                "display": true,
                "sender": "script",
                "redirection": true,
                "next_node": { '0': 0 },
                "data": true
            },
            {
                "id": 0,
                "text": "Your transactions this month show that you spent 2450€ compared to 1260€ on average. Based on this trend, you might be overdrawn in the next days",
                "type": "text",
                "selected": false,
                "display": true,
                "sender": "script",
                "redirection": true,
                "next_node": { '0': 1 },
                "data": true
            }
        ];
    }
    ngOnInit() {
        this.messages = this.Message.getMessages();
        if (!this.messages.length) {
            this.Message.sendnextmessage(-1, 0);
        }
        this.scrollToBottom();
    }
    ionViewDidEnter() {
    }
    onButtonClick(parentId, optionId, buttype, buttext) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.Message.addMessage({ text: buttext, sender: 'user' });
            if (buttype == 'simulation') {
                const modal = yield this.modalController.create({
                    component: _simulator_simulator_page__WEBPACK_IMPORTED_MODULE_4__["SimulatorPage"],
                    componentProps: { title: 123, successpayload: { 'parentId': 24 }, weburl: 'https://simulator.attila.tech' }
                });
                modal.onDidDismiss().then((result) => {
                    if (result !== null) {
                        this.Message.setsimulationresult(result.data);
                        console.log(parentId, optionId, result.data);
                        this.Message.sendnextmessage(parentId, optionId);
                        this.scrollToBottom();
                    }
                });
                return yield modal.present();
            }
            else {
                this.Message.sendnextmessage(parentId, optionId);
            }
            this.scrollToBottom();
        });
    }
    onReplyClick(parentId, optionId, optText) {
        this.Message.quickReplyshown();
        this.Message.addMessage({ text: optText, sender: 'user' });
        this.Message.sendnextmessage(parentId, optionId);
        this.scrollToBottom();
    }
    senduserinput(parentId, optText) {
        this.Message.quickReplyshown();
        this.Message.addMessage({ text: optText, sender: 'user' });
        this.Message.sendnextmessage(parentId, 0);
        this.scrollToBottom();
    }
    sendMessage(event) {
        this.msg = '';
        this.Message.addMessage({ text: event, sender: 'user' });
        this.Message.sendinputnext();
        this.scrollToBottom();
    }
    scrollToBottom() {
        try {
            setTimeout(() => {
                this.content.scrollToBottom(300);
            }, 800);
        }
        catch (err) {
            console.log(err);
        }
    }
    myBackButton() {
        this.location.back();
    }
    minus(msgindex, dataindex) {
        this.Message.editobjective(msgindex, dataindex, 'munis');
    }
    plus(msgindex, dataindex) {
        this.Message.editobjective(msgindex, dataindex, 'plus');
    }
};
MessageCenterPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _providers_messages_service__WEBPACK_IMPORTED_MODULE_3__["MessagesService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('scrollMe', { static: true }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], MessageCenterPage.prototype, "myScrollContainer", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('content', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], MessageCenterPage.prototype, "content", void 0);
MessageCenterPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-message-center',
        template: __webpack_require__(/*! raw-loader!./message-center.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/message-center/message-center.page.html"),
        styles: [__webpack_require__(/*! ./message-center.page.scss */ "./src/app/pages/message-center/message-center.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _providers_messages_service__WEBPACK_IMPORTED_MODULE_3__["MessagesService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
        _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"]])
], MessageCenterPage);



/***/ }),

/***/ "./src/app/pages/simulator/simulator.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/pages/simulator/simulator.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "app-simulatorview {\n  height: 100%;\n}\n\n.modal-open .modal {\n  overflow-y: hidden;\n}\n\n.modal-header {\n  padding: 0.3rem 1rem;\n}\n\n.modal-header .modal-title {\n  margin: 0 auto;\n}\n\n.modal-header .close {\n  margin-left: 0;\n  font-weight: normal;\n}\n\n.modal-dialog {\n  position: absolute;\n  bottom: 0;\n  top: 25px;\n  margin: 0 auto;\n  width: 100%;\n  height: auto;\n  -webkit-transform: none;\n          transform: none;\n  -webkit-transition: none;\n  transition: none;\n}\n\n.modal-dialog .modal-content {\n  border-radius: 0.5rem;\n  border: none;\n  height: 100%;\n}\n\n.modal-dialog .modal-content .modal-header {\n  padding: 0.3rem 1rem;\n}\n\n.modal-dialog .modal-content .modal-header .modal-title {\n  margin: 0 auto;\n}\n\n.modal-dialog .modal-content .modal-header .close {\n  margin-left: 0;\n  font-weight: normal;\n}\n\n.modal-dialog .modal-content .modal-body {\n  height: calc(100% - 35px);\n}\n\n.modal-dialog .modal-content .modal-body .iframestyle {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  border: 0;\n}\n\n.modal-body {\n  height: calc(100% - 35px);\n}\n\n.modal-body .iframestyle {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  border: 0;\n}\n\n.modal.fade {\n  opacity: 1;\n}\n\n.modal.hide {\n  display: block;\n}\n\n.modal.hide .modal-dialog {\n  -webkit-animation: slideOutDown 0.1s linear;\n          animation: slideOutDown 0.1s linear;\n}\n\n.modal.show .modal-dialog {\n  -webkit-animation: slideInUp 0.3s linear;\n          animation: slideInUp 0.3s linear;\n}\n\n.modal.fade .modal-dialog {\n  -webkit-transform: translate(0);\n  transform: translate(0);\n}\n\n@-webkit-keyframes slideInUp {\n  from {\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%);\n    visibility: visible;\n  }\n  to {\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n}\n\n@keyframes slideInUp {\n  from {\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%);\n    visibility: visible;\n  }\n  to {\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n}\n\n@-webkit-keyframes slideOutDown {\n  0% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n  100% {\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%);\n    visibility: hidden;\n  }\n}\n\n@keyframes slideOutDown {\n  0% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n  100% {\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%);\n    visibility: hidden;\n  }\n}\n\nion-text h5 {\n  border-bottom: var(--ion-color-primary) 1px solid;\n  padding-bottom: 0.5rem;\n}\n\n.result {\n  font-weight: bold;\n}\n\nion-item.input-container {\n  margin-top: 0.5rem;\n  border: 1px solid #dddddd;\n  border-bottom: none;\n  border-radius: 4px;\n  --min-height: 40px;\n  --highlight-color-valid: var(--ion-color-primary);\n}\n\nion-item.input-container ion-input {\n  height: 40px;\n}\n\nion-item.header ion-thumbnail {\n  height: 42px;\n  width: 42px;\n}\n\nion-item.header ion-label {\n  font-size: 22px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudGZpdC9wc2QyL2lvbmljLWNvbmZlcmVuY2UtYXBwL3NyYy9hcHAvcGFnZXMvc2ltdWxhdG9yL3NpbXVsYXRvci5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL3NpbXVsYXRvci9zaW11bGF0b3IucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtBQ0NGOztBREVFO0VBQ0Usa0JBQUE7QUNDSjs7QURFQTtFQUVNLG9CQUFBO0FDQU47O0FEQ007RUFDRSxjQUFBO0FDQ1I7O0FEQ007RUFDRSxjQUFBO0VBQ0EsbUJBQUE7QUNDUjs7QURFQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtVQUFBLGVBQUE7RUFDQSx3QkFBQTtFQUFBLGdCQUFBO0FDQ0Y7O0FEQUU7RUFDRSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FDRUo7O0FEREk7RUFFRSxvQkFBQTtBQ0VOOztBRERNO0VBQ0UsY0FBQTtBQ0dSOztBRERNO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0FDR1I7O0FEQ0k7RUFFRSx5QkFBQTtBQ0FOOztBRENNO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7QUNDUjs7QURLQTtFQUVNLHlCQUFBO0FDSE47O0FESU07RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtBQ0ZSOztBRE9FO0VBQ0UsVUFBQTtBQ0pKOztBRE1FO0VBQ0UsY0FBQTtBQ0pKOztBREtJO0VBQ0UsMkNBQUE7VUFBQSxtQ0FBQTtBQ0hOOztBRFNJO0VBQ0Usd0NBQUE7VUFBQSxnQ0FBQTtBQ05OOztBRFVBO0VBQ0csK0JBQUE7RUFFQSx1QkFBQTtBQ1BIOztBRFVBO0VBQ0U7SUFDRSxtQ0FBQTtZQUFBLDJCQUFBO0lBQ0EsbUJBQUE7RUNQRjtFRFNBO0lBQ0UsZ0NBQUE7WUFBQSx3QkFBQTtFQ1BGO0FBQ0Y7O0FEQUE7RUFDRTtJQUNFLG1DQUFBO1lBQUEsMkJBQUE7SUFDQSxtQkFBQTtFQ1BGO0VEU0E7SUFDRSxnQ0FBQTtZQUFBLHdCQUFBO0VDUEY7QUFDRjs7QURTQTtFQUNFO0lBQ0UsZ0NBQUE7WUFBQSx3QkFBQTtFQ1BGO0VEU0E7SUFDRSxtQ0FBQTtZQUFBLDJCQUFBO0lBQ0Esa0JBQUE7RUNQRjtBQUNGOztBREFBO0VBQ0U7SUFDRSxnQ0FBQTtZQUFBLHdCQUFBO0VDUEY7RURTQTtJQUNFLG1DQUFBO1lBQUEsMkJBQUE7SUFDQSxrQkFBQTtFQ1BGO0FBQ0Y7O0FEV0U7RUFDRSxpREFBQTtFQUNBLHNCQUFBO0FDVEo7O0FEYUE7RUFDRSxpQkFBQTtBQ1ZGOztBRGFFO0VBQ0Usa0JBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlEQUFBO0FDVko7O0FEWUk7RUFDRSxZQUFBO0FDVk47O0FEZ0JJO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUNiTjs7QURlSTtFQUNFLGVBQUE7QUNiTiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3NpbXVsYXRvci9zaW11bGF0b3IucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLXNpbXVsYXRvcnZpZXcge1xuICBoZWlnaHQ6IDEwMCU7XG59XG4ubW9kYWwtb3BlbiB7XG4gIC5tb2RhbCB7XG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xuICB9XG59XG4ubW9kYWwtaGVhZGVyIHtcbiAgICAgIC8vIGJhY2tncm91bmQtY29sb3I6ICNmNWY2Zjc7XG4gICAgICBwYWRkaW5nOiAwLjNyZW0gMXJlbTtcbiAgICAgIC5tb2RhbC10aXRsZSB7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgfVxuICAgICAgLmNsb3NlIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICB9XG4gICAgfVxuLm1vZGFsLWRpYWxvZyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICB0b3A6IDI1cHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xuICB0cmFuc2Zvcm06IG5vbmU7XG4gIHRyYW5zaXRpb246IG5vbmU7XG4gIC5tb2RhbC1jb250ZW50IHtcbiAgICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAubW9kYWwtaGVhZGVyIHtcbiAgICAgIC8vIGJhY2tncm91bmQtY29sb3I6ICNmNWY2Zjc7XG4gICAgICBwYWRkaW5nOiAwLjNyZW0gMXJlbTtcbiAgICAgIC5tb2RhbC10aXRsZSB7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgfVxuICAgICAgLmNsb3NlIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLm1vZGFsLWJvZHkge1xuICAgICAgLy8gaGVpZ2h0OiA0MDBweDtcbiAgICAgIGhlaWdodDogY2FsYygxMDAlIC0gMzVweCk7XG4gICAgICAuaWZyYW1lc3R5bGUge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJvcmRlcjogMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLm1vZGFsLWJvZHkge1xuICAgICAgLy8gaGVpZ2h0OiA0MDBweDtcbiAgICAgIGhlaWdodDogY2FsYygxMDAlIC0gMzVweCk7XG4gICAgICAuaWZyYW1lc3R5bGUge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJvcmRlcjogMDtcbiAgICAgIH1cbiAgICB9XG5cbi5tb2RhbCB7XG4gICYuZmFkZSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAmLmhpZGUge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIC5tb2RhbC1kaWFsb2cge1xuICAgICAgYW5pbWF0aW9uOiBzbGlkZU91dERvd24gMC4xcyBsaW5lYXI7XG4gICAgfVxuICB9XG59XG4ubW9kYWwge1xuICAmLnNob3cge1xuICAgIC5tb2RhbC1kaWFsb2cge1xuICAgICAgYW5pbWF0aW9uOiBzbGlkZUluVXAgMC4zcyBsaW5lYXI7XG4gICAgfVxuICB9XG59XG4ubW9kYWwuZmFkZSAubW9kYWwtZGlhbG9nIHtcbiAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCk7XG4gICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDApO1xuICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCk7XG59XG5cbkBrZXlmcmFtZXMgc2xpZGVJblVwIHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwMCUpO1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuQGtleWZyYW1lcyBzbGlkZU91dERvd24ge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDAlKTtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cbn1cblxuaW9uLXRleHQge1xuICBoNSB7XG4gICAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpIDFweCBzb2xpZDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMC41cmVtO1xuICB9XG59XG5cbi5yZXN1bHQge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbmlvbi1pdGVtIHtcbiAgJi5pbnB1dC1jb250YWluZXIge1xuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIC0tbWluLWhlaWdodDogNDBweDtcbiAgICAtLWhpZ2hsaWdodC1jb2xvci12YWxpZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuXG4gICAgaW9uLWlucHV0IHtcbiAgICAgIGhlaWdodDogNDBweDtcbiAgICB9XG4gIH1cbn1cbmlvbi1pdGVtIHtcbiAgJi5oZWFkZXIge1xuICAgIGlvbi10aHVtYm5haWwge1xuICAgICAgaGVpZ2h0OiA0MnB4O1xuICAgICAgd2lkdGg6IDQycHg7XG4gICAgfVxuICAgIGlvbi1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDIycHg7XG4gICAgfVxuICB9XG59XG4iLCJhcHAtc2ltdWxhdG9ydmlldyB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLm1vZGFsLW9wZW4gLm1vZGFsIHtcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xufVxuXG4ubW9kYWwtaGVhZGVyIHtcbiAgcGFkZGluZzogMC4zcmVtIDFyZW07XG59XG4ubW9kYWwtaGVhZGVyIC5tb2RhbC10aXRsZSB7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuLm1vZGFsLWhlYWRlciAuY2xvc2Uge1xuICBtYXJnaW4tbGVmdDogMDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cblxuLm1vZGFsLWRpYWxvZyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICB0b3A6IDI1cHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xuICB0cmFuc2Zvcm06IG5vbmU7XG4gIHRyYW5zaXRpb246IG5vbmU7XG59XG4ubW9kYWwtZGlhbG9nIC5tb2RhbC1jb250ZW50IHtcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICBib3JkZXI6IG5vbmU7XG4gIGhlaWdodDogMTAwJTtcbn1cbi5tb2RhbC1kaWFsb2cgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWhlYWRlciB7XG4gIHBhZGRpbmc6IDAuM3JlbSAxcmVtO1xufVxuLm1vZGFsLWRpYWxvZyAubW9kYWwtY29udGVudCAubW9kYWwtaGVhZGVyIC5tb2RhbC10aXRsZSB7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuLm1vZGFsLWRpYWxvZyAubW9kYWwtY29udGVudCAubW9kYWwtaGVhZGVyIC5jbG9zZSB7XG4gIG1hcmdpbi1sZWZ0OiAwO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuLm1vZGFsLWRpYWxvZyAubW9kYWwtY29udGVudCAubW9kYWwtYm9keSB7XG4gIGhlaWdodDogY2FsYygxMDAlIC0gMzVweCk7XG59XG4ubW9kYWwtZGlhbG9nIC5tb2RhbC1jb250ZW50IC5tb2RhbC1ib2R5IC5pZnJhbWVzdHlsZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xufVxuXG4ubW9kYWwtYm9keSB7XG4gIGhlaWdodDogY2FsYygxMDAlIC0gMzVweCk7XG59XG4ubW9kYWwtYm9keSAuaWZyYW1lc3R5bGUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbn1cblxuLm1vZGFsLmZhZGUge1xuICBvcGFjaXR5OiAxO1xufVxuLm1vZGFsLmhpZGUge1xuICBkaXNwbGF5OiBibG9jaztcbn1cbi5tb2RhbC5oaWRlIC5tb2RhbC1kaWFsb2cge1xuICBhbmltYXRpb246IHNsaWRlT3V0RG93biAwLjFzIGxpbmVhcjtcbn1cblxuLm1vZGFsLnNob3cgLm1vZGFsLWRpYWxvZyB7XG4gIGFuaW1hdGlvbjogc2xpZGVJblVwIDAuM3MgbGluZWFyO1xufVxuXG4ubW9kYWwuZmFkZSAubW9kYWwtZGlhbG9nIHtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwKTtcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCk7XG59XG5cbkBrZXlmcmFtZXMgc2xpZGVJblVwIHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwMCUpO1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuQGtleWZyYW1lcyBzbGlkZU91dERvd24ge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDAlKTtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cbn1cbmlvbi10ZXh0IGg1IHtcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpIDFweCBzb2xpZDtcbiAgcGFkZGluZy1ib3R0b206IDAuNXJlbTtcbn1cblxuLnJlc3VsdCB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5pb24taXRlbS5pbnB1dC1jb250YWluZXIge1xuICBtYXJnaW4tdG9wOiAwLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGRkZGQ7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgLS1taW4taGVpZ2h0OiA0MHB4O1xuICAtLWhpZ2hsaWdodC1jb2xvci12YWxpZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuaW9uLWl0ZW0uaW5wdXQtY29udGFpbmVyIGlvbi1pbnB1dCB7XG4gIGhlaWdodDogNDBweDtcbn1cblxuaW9uLWl0ZW0uaGVhZGVyIGlvbi10aHVtYm5haWwge1xuICBoZWlnaHQ6IDQycHg7XG4gIHdpZHRoOiA0MnB4O1xufVxuaW9uLWl0ZW0uaGVhZGVyIGlvbi1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/simulator/simulator.page.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/simulator/simulator.page.ts ***!
  \***************************************************/
/*! exports provided: SimulatorPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulatorPage", function() { return SimulatorPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");




let SimulatorPage = class SimulatorPage {
    constructor(modalController, navParams, sanitizer) {
        this.modalController = modalController;
        this.sanitizer = sanitizer;
        // "value" passed in componentProps
        //@Input() value: number;
        this.title = `Webview`;
        this.successpayload = `success`;
        this.params = {
            amount: 1000,
            loanTerm: 12,
        };
        // componentProps can also be accessed at construction time using NavParams
    }
    ngOnInit() {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.weburl);
        const acmodal = this.modalController;
        const payload = this.successpayload;
        const onClosedData = "Wrapped Up!";
        window.addEventListener('message', receiveMessage, false);
        function receiveMessage(event) {
            const origin = event.origin || event.originalEvent.origin;
            console.log(event.data);
            acmodal.dismiss(event.data);
            window.removeEventListener('message', receiveMessage, false);
        }
    }
    closeModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const onClosedData = "Wrapped Up!";
            yield this.modalController.dismiss(onClosedData);
        });
    }
    validate() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.modalController.dismiss({
                amount: this.params.amount,
                months: this.params.loanTerm,
                payment: this.result,
            });
        });
    }
    operation({ amount, loanTerm }) {
        const principal = parseFloat(amount);
        const interest = (2 / 100) / 12;
        const payments = parseFloat(loanTerm);
        // compute the monthly payment figure
        const x = Math.pow(1 + interest, payments);
        const monthly = (principal * x * interest) / (x - 1);
        return Math.round(monthly * 100) / 100;
    }
    ngOnDestroy() {
        // this.formChangesSubscription.unsubscribe();
    }
};
SimulatorPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavParams"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SimulatorPage.prototype, "title", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SimulatorPage.prototype, "weburl", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SimulatorPage.prototype, "successpayload", void 0);
SimulatorPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-simultaor-page',
        template: __webpack_require__(/*! raw-loader!./simulator.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/simulator/simulator.page.html"),
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
        styles: [__webpack_require__(/*! ./simulator.page.scss */ "./src/app/pages/simulator/simulator.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavParams"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]])
], SimulatorPage);



/***/ })

}]);
//# sourceMappingURL=default~pages-message-center-message-center-module~pages-tabs-page-tabs-page-module-es2015.js.map