/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/calendar.tsx":
/*!*************************!*\
  !*** ./js/calendar.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Calendar: () => (/* binding */ Calendar)
/* harmony export */ });
/* harmony import */ var root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! root/jsx-runtime */ "./js/jsx-runtime.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./js/utils.ts");


const intervals = [_utils__WEBPACK_IMPORTED_MODULE_1__.T.min * 15, _utils__WEBPACK_IMPORTED_MODULE_1__.T.min * 30, _utils__WEBPACK_IMPORTED_MODULE_1__.T.hr, _utils__WEBPACK_IMPORTED_MODULE_1__.T.hr * 2, _utils__WEBPACK_IMPORTED_MODULE_1__.T.hr * 6, _utils__WEBPACK_IMPORTED_MODULE_1__.T.hr * 12, _utils__WEBPACK_IMPORTED_MODULE_1__.T.day];
const emphs = [_utils__WEBPACK_IMPORTED_MODULE_1__.T.hr, _utils__WEBPACK_IMPORTED_MODULE_1__.T.hr, _utils__WEBPACK_IMPORTED_MODULE_1__.T.hr * 6, _utils__WEBPACK_IMPORTED_MODULE_1__.T.hr * 6, _utils__WEBPACK_IMPORTED_MODULE_1__.T.day, _utils__WEBPACK_IMPORTED_MODULE_1__.T.day, _utils__WEBPACK_IMPORTED_MODULE_1__.T.day];
class Calendar {
    element;
    start;
    end;
    minPx = 0;
    tracks;
    constructor(element) {
        this.element = element;
    }
    getClass(className) {
        const collection = this.element.getElementsByClassName(className);
        if (collection.length !== 1) {
            throw new Error(`"${className}" does not uniquely exist`);
        }
        return collection[0];
    }
    makeDate(time) {
        const tim = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.mitTime)(time);
        const date = new Date(tim);
        const dat = date.getUTCDate();
        const day = date.getUTCDay();
        const str = `${_utils__WEBPACK_IMPORTED_MODULE_1__.daysOfWeek[day]} ${dat}`;
        return (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { class: "date", style: `left: calc(${(time - this.start) / _utils__WEBPACK_IMPORTED_MODULE_1__.T.min}*var(--min))`, children: str });
    }
    makeMarking(time, dt) {
        const tim = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.mitTime)(time);
        const frac = (tim % _utils__WEBPACK_IMPORTED_MODULE_1__.T.day) / _utils__WEBPACK_IMPORTED_MODULE_1__.T.hr;
        const bold = tim % dt == 0 ? "bold" : "";
        return [
            (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { class: `time ${bold}`, style: `
                left: calc(${(time - this.start) / _utils__WEBPACK_IMPORTED_MODULE_1__.T.min}*var(--min) + 1px);
                --color: color-mix(in srgb, orange, blue ${Math.abs(frac - 12) / 12 * 100}%);
            `, children: [(0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { class: "tab" }), (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { class: "hour", children: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.time12)(tim) })] }),
            (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { class: `bar ${bold}`, style: `
                left: calc(${(time - this.start) / _utils__WEBPACK_IMPORTED_MODULE_1__.T.min}*var(--min) - 1px);
                --color: color-mix(in srgb, orange, blue ${Math.abs(frac - 12) / 12 * 100}%);
            ` }),
        ];
    }
    initMarkings() {
        const left = this.start + this.element.scrollLeft / 2 ** this.minPx * _utils__WEBPACK_IMPORTED_MODULE_1__.T.min;
        const right = left + this.element.clientWidth / 2 ** this.minPx * _utils__WEBPACK_IMPORTED_MODULE_1__.T.min;
        const dates = this.getClass("dates");
        const times = this.getClass("times");
        const markings = this.getClass("markings");
        dates.replaceChildren();
        times.replaceChildren();
        markings.replaceChildren();
        const i = intervals.findIndex(dt => dt / _utils__WEBPACK_IMPORTED_MODULE_1__.T.min * 2 ** this.minPx > 60) ?? -1;
        const dt = intervals.at(i);
        const et = emphs.at(i);
        for (let time = left - (0,_utils__WEBPACK_IMPORTED_MODULE_1__.mod)(left + _utils__WEBPACK_IMPORTED_MODULE_1__.offset * _utils__WEBPACK_IMPORTED_MODULE_1__.T.hr, dt) - dt; time <= right + dt; time += dt) {
            const [tab, bar] = this.makeMarking(time, et);
            times.append(tab);
            markings.append(bar);
        }
        for (let time = left - (0,_utils__WEBPACK_IMPORTED_MODULE_1__.mod)(left + _utils__WEBPACK_IMPORTED_MODULE_1__.offset * _utils__WEBPACK_IMPORTED_MODULE_1__.T.hr, et) + et / 2; time < right; time += et) {
            dates.append(this.makeDate(time));
        }
    }
    getTracks(events) {
        const items = events.map(event => {
            const { start, end } = event;
            return { start, end, event };
        }).sort((a, b) => a.start - b.start);
        const tracks = [];
        for (const { start, end, event } of items) {
            const track = tracks.find(track => track.end <= start)
                ?? (() => {
                    const track = { end: 0, items: [] };
                    tracks.push(track);
                    return track;
                })();
            track.items.push(event);
            track.end = end;
        }
        return tracks;
    }
    initEvents(events) {
        const eventsElem = this.getClass("events");
        this.tracks = this.getTracks(events).map(track => track.items);
        eventsElem.replaceChildren();
        for (const track of this.tracks) {
            const telem = (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { class: "track" });
            for (const { name, dorm, location, start, end, description, tags, group, color } of track) {
                telem.append((0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { class: "event", style: `
                    left: calc(${(start - this.start) / _utils__WEBPACK_IMPORTED_MODULE_1__.T.min}*var(--min));
                    width: calc(${(end - start) / _utils__WEBPACK_IMPORTED_MODULE_1__.T.min}*var(--min));
                    --color: ${color};
                `, children: [(0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", { children: name }), (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { class: "info", children: [(0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i", { children: dorm.join(", ") }), (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br", {}), description, (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br", {}), "\uD83D\uDCCD ", location, group == null ? "" : ` 👥 ${group}`, (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br", {}), tags.join(" ⋅ ")] })] }));
            }
            eventsElem.append(telem);
        }
    }
    registerListeners() {
        const clamped = (px) => (0,_utils__WEBPACK_IMPORTED_MODULE_1__.clamp)(px, Math.log2(mainElem.clientWidth / (this.end - this.start) * _utils__WEBPACK_IMPORTED_MODULE_1__.T.min), 3);
        const viewport = this.getClass("viewport");
        const mainElem = this.element;
        mainElem.addEventListener("mousemove", (event) => {
            if (!(event.buttons & 1))
                return;
            viewport.scrollBy(0, -event.movementY);
            mainElem.scrollBy(-event.movementX, 0);
        });
        mainElem.addEventListener("wheel", (event) => {
            if (event.ctrlKey)
                return;
            event.preventDefault();
            const oldMinPx = this.minPx;
            this.minPx -= event.deltaY / 200;
            this.minPx = clamped(this.minPx);
            mainElem.style.setProperty("--min", `${2 ** this.minPx}px`);
            const x = event.clientX - mainElem.getBoundingClientRect().x;
            mainElem.scroll((mainElem.scrollLeft + x) * 2 ** (this.minPx - oldMinPx) - x, 0);
            this.initMarkings();
        });
        mainElem.addEventListener("scroll", (event) => {
            this.initMarkings();
        });
        new ResizeObserver((entries) => {
            const px = clamped(this.minPx);
            if (px !== this.minPx) {
                this.minPx = px;
                mainElem.style.setProperty("--min", `${2 ** this.minPx}px`);
            }
            this.initMarkings();
        }).observe(mainElem);
    }
    init(events) {
        let start = Math.min(...events.map(event => event.start));
        let end = Math.max(...events.map(event => event.end));
        this.start = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.mitDay)(start);
        this.end = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.mitDay)(end - 1) + _utils__WEBPACK_IMPORTED_MODULE_1__.T.day;
        const fieldElem = this.getClass("field");
        fieldElem.style.width = `calc(${(this.end - this.start) / _utils__WEBPACK_IMPORTED_MODULE_1__.T.min}*var(--min))`;
        this.initMarkings();
        this.initEvents(events);
        this.getClass("field").style.height = `calc(${this.tracks.length}*var(--height))`;
        this.registerListeners();
    }
}


/***/ }),

/***/ "./js/jsx-runtime.ts":
/*!***************************!*\
  !*** ./js/jsx-runtime.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fragment: () => (/* binding */ Fragment),
/* harmony export */   jsx: () => (/* binding */ jsx),
/* harmony export */   jsxs: () => (/* binding */ jsx)
/* harmony export */ });
/*
originally used at https://github.com/tobspr-games/shapez-community-edition/pull/12/commits/56330a1433e81a260be66648f90df77c8172308f
relicensed by me, the original author
*/
function isDisplayed(node) {
    return typeof node !== "boolean" && node != null;
}
function jsx(tag, props) {
    if (typeof tag === "function")
        return tag(props);
    const { children, ...attrs } = props;
    const element = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
        switch (typeof value) {
            case "boolean":
                if (!value)
                    return;
                return element.setAttribute(key, "");
            case "number":
            case "string":
                return element.setAttribute(key, `${value}`);
        }
        throw new TypeError("JSX element attribute assigned invalid type");
    });
    element.append(...[children].flat(Infinity).filter(isDisplayed));
    return element;
}
// functional component, called indirectly as `jsx(Fragment, props)`
/**
 * Groups elements without introducing a parent element.
 */
const Fragment = (props) => props.children;
// jsxs is used when there are multiple children



/***/ }),

/***/ "./js/main.tsx":
/*!*********************!*\
  !*** ./js/main.tsx ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar */ "./js/calendar.tsx");
/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selector */ "./js/selector.tsx");
/* harmony import */ var _searcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./searcher */ "./js/searcher.tsx");



const api = await (await fetch("https://rex.mit.edu/api.json")).json();
const dormColors = new Map(Object.entries(api.colors.dorms));
const tagColors = new Map(Object.entries(api.colors.tags));
const events = api.events.map(({ name, dorm, location, start, end, description, tags, group }) => {
    return {
        name,
        dorm,
        location,
        start: Date.parse(start),
        end: Date.parse(end),
        description,
        tags,
        group,
        color: dormColors.get(dorm[0]) ?? "black",
        keywords: [name, dorm.join(" "), location, description, tags.join(" "), group ?? ""].join("\n"),
    };
});
const searcher = new _searcher__WEBPACK_IMPORTED_MODULE_2__.Searcher(document.getElementById("search"));
searcher.init();
const selectorHosts = new _selector__WEBPACK_IMPORTED_MODULE_1__.Selector(document.getElementById("hosts"));
selectorHosts.init(api.dorms, dormColors);
const selectorTags = new _selector__WEBPACK_IMPORTED_MODULE_1__.Selector(document.getElementById("tags"));
selectorTags.init(api.tags, tagColors);
const calendar = new _calendar__WEBPACK_IMPORTED_MODULE_0__.Calendar(document.getElementsByClassName("interface")[0]);
calendar.init(events);
function update() {
    calendar.initEvents(events.filter(event => event.dorm.some(d => selectorHosts.match(d))
        && event.tags.some(tag => selectorTags.match(tag))
        && searcher.match(event.keywords)));
}
searcher.signal.add(update);
selectorHosts.signal.add(update);
selectorTags.signal.add(update);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./js/searcher.tsx":
/*!*************************!*\
  !*** ./js/searcher.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Searcher: () => (/* binding */ Searcher)
/* harmony export */ });
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signal */ "./js/signal.ts");

class Searcher {
    element;
    values = [];
    signal = new _signal__WEBPACK_IMPORTED_MODULE_0__.Signal();
    constructor(element) {
        this.element = element;
    }
    init() {
        this.element.addEventListener("input", (event) => {
            this.values = this.element.value.trim().split(/\s+/).map(v => v.toLowerCase());
            this.signal.fire();
        });
    }
    match(text) {
        const txt = text.toLowerCase();
        return this.values.every(value => txt.includes(value));
    }
}


/***/ }),

/***/ "./js/selector.tsx":
/*!*************************!*\
  !*** ./js/selector.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Selector: () => (/* binding */ Selector)
/* harmony export */ });
/* harmony import */ var root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! root/jsx-runtime */ "./js/jsx-runtime.ts");
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signal */ "./js/signal.ts");


class Selector {
    element;
    values = new Set();
    signal = new _signal__WEBPACK_IMPORTED_MODULE_1__.Signal();
    constructor(element) {
        this.element = element;
    }
    init(options, colors) {
        this.element.replaceChildren((0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("output", { tabindex: "0", children: [...[...options.map(option => {
                        const input = (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { type: "checkbox", id: option });
                        input.addEventListener("change", (event) => {
                            if (input.checked) {
                                this.values.add(option);
                            }
                            else {
                                this.values.delete(option);
                            }
                            this.signal.fire();
                        });
                        return (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", { tabindex: "-1", style: `--color: ${colors.get(option) ?? "white"}`, children: [input, option] });
                    }), (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "+" })]] }), (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { class: "options", tabindex: "0", children: [...options.map(option => (0,root_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", { for: option, style: `--color: ${colors.get(option) ?? "white"}`, children: option }))] }));
    }
    match(value) {
        if (this.values.size === 0)
            return true;
        return this.values.has(value);
    }
}


/***/ }),

/***/ "./js/signal.ts":
/*!**********************!*\
  !*** ./js/signal.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Signal: () => (/* binding */ Signal)
/* harmony export */ });
class Signal {
    listeners = new Set();
    constructor() { }
    add(listener) {
        this.listeners.add(listener);
    }
    fire(...args) {
        for (const listener of this.listeners) {
            listener(...args);
        }
    }
}


/***/ }),

/***/ "./js/utils.ts":
/*!*********************!*\
  !*** ./js/utils.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ T),
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   daysOfWeek: () => (/* binding */ daysOfWeek),
/* harmony export */   mitDay: () => (/* binding */ mitDay),
/* harmony export */   mitTime: () => (/* binding */ mitTime),
/* harmony export */   mod: () => (/* binding */ mod),
/* harmony export */   offset: () => (/* binding */ offset),
/* harmony export */   time12: () => (/* binding */ time12)
/* harmony export */ });
function mod(a, b) {
    return (a % b + b) % b;
}
function clamp(x, min, max) {
    return Math.max(min, Math.min(max, x));
}
const offset = -4;
const s = 1000;
const min = 60 * s;
const hr = 60 * min;
const day = 24 * hr;
const T = { s, min, hr, day };
function mitTime(time) {
    return time + offset * hr;
}
function mitDay(time) {
    return time - mod(time + offset * hr, day);
}
function time12(time) {
    const dday = time % day;
    const dhour = time % hr;
    const dmin = time % min;
    const hour = (dday - dhour) / hr;
    const minute = (dhour - dmin) / min;
    return `${mod(hour - 1, 12) + 1}:${`${minute}`.padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
}
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.tsx");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0Esc0dBQXNHO1dBQ3RHO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQSxFQUFFO1dBQ0Y7V0FDQTs7Ozs7V0NoRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXgtZXZlbnQteHdoZW4vLi9qcy9jYWxlbmRhci50c3giLCJ3ZWJwYWNrOi8vcmV4LWV2ZW50LXh3aGVuLy4vanMvanN4LXJ1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vcmV4LWV2ZW50LXh3aGVuLy4vanMvbWFpbi50c3giLCJ3ZWJwYWNrOi8vcmV4LWV2ZW50LXh3aGVuLy4vanMvc2VhcmNoZXIudHN4Iiwid2VicGFjazovL3JleC1ldmVudC14d2hlbi8uL2pzL3NlbGVjdG9yLnRzeCIsIndlYnBhY2s6Ly9yZXgtZXZlbnQteHdoZW4vLi9qcy9zaWduYWwudHMiLCJ3ZWJwYWNrOi8vcmV4LWV2ZW50LXh3aGVuLy4vanMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vcmV4LWV2ZW50LXh3aGVuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JleC1ldmVudC14d2hlbi93ZWJwYWNrL3J1bnRpbWUvYXN5bmMgbW9kdWxlIiwid2VicGFjazovL3JleC1ldmVudC14d2hlbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmV4LWV2ZW50LXh3aGVuL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmV4LWV2ZW50LXh3aGVuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmV4LWV2ZW50LXh3aGVuL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcmV4LWV2ZW50LXh3aGVuL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9yZXgtZXZlbnQteHdoZW4vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNsYW1wLCB0aW1lMTIsIG1pdERheSwgbW9kLCBULCBtaXRUaW1lLCBvZmZzZXQsIGRheXNPZldlZWsgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgQ2FsZW5kYXJFdmVudCA9IHtcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICBkb3JtOiBzdHJpbmdbXSxcclxuICAgIGdyb3VwOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgbG9jYXRpb246IHN0cmluZyxcclxuICAgIHN0YXJ0OiBudW1iZXIsXHJcbiAgICBlbmQ6IG51bWJlcixcclxuICAgIHRhZ3M6IHN0cmluZ1tdLFxyXG4gICAgY29sb3I6IHN0cmluZyxcclxuICAgIGtleXdvcmRzOiBzdHJpbmcsXHJcbn07XHJcblxyXG5jb25zdCBpbnRlcnZhbHMgPSBbVC5taW4qMTUsIFQubWluKjMwLCBULmhyLCBULmhyKjIsIFQuaHIqNiwgVC5ocioxMiwgVC5kYXldO1xyXG5jb25zdCBlbXBocyA9IFtULmhyLCBULmhyLCBULmhyKjYsIFQuaHIqNiwgVC5kYXksIFQuZGF5LCBULmRheV07XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXIge1xyXG4gICAgcHVibGljIHN0YXJ0ITogbnVtYmVyO1xyXG4gICAgcHVibGljIGVuZCE6IG51bWJlcjtcclxuICAgIHB1YmxpYyBtaW5QeCA9IDA7XHJcbiAgICBwdWJsaWMgdHJhY2tzITogQ2FsZW5kYXJFdmVudFtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7fVxyXG5cclxuICAgIGdldENsYXNzKGNsYXNzTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgaWYgKGNvbGxlY3Rpb24ubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgXCIke2NsYXNzTmFtZX1cIiBkb2VzIG5vdCB1bmlxdWVseSBleGlzdGApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvblswXSBhcyBIVE1MRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlRGF0ZSh0aW1lOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB0aW0gPSBtaXRUaW1lKHRpbWUpO1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW0pO1xyXG4gICAgICAgIGNvbnN0IGRhdCA9IGRhdGUuZ2V0VVRDRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0VVRDRGF5KCk7XHJcbiAgICAgICAgY29uc3Qgc3RyID0gYCR7ZGF5c09mV2Vla1tkYXldfSAke2RhdH1gXHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3M9XCJkYXRlXCIgc3R5bGU9e2BsZWZ0OiBjYWxjKCR7KHRpbWUtdGhpcy5zdGFydCkvVC5taW59KnZhcigtLW1pbikpYH0+XHJcbiAgICAgICAgICAgIHtzdHJ9XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VNYXJraW5nKHRpbWU6IG51bWJlciwgZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHRpbSA9IG1pdFRpbWUodGltZSk7XHJcbiAgICAgICAgY29uc3QgZnJhYyA9ICh0aW0lVC5kYXkpL1QuaHI7XHJcbiAgICAgICAgY29uc3QgYm9sZCA9IHRpbSVkdCA9PSAwID8gXCJib2xkXCIgOiBcIlwiO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9e2B0aW1lICR7Ym9sZH1gfSBzdHlsZT17YFxyXG4gICAgICAgICAgICAgICAgbGVmdDogY2FsYygkeyh0aW1lLXRoaXMuc3RhcnQpL1QubWlufSp2YXIoLS1taW4pICsgMXB4KTtcclxuICAgICAgICAgICAgICAgIC0tY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCBvcmFuZ2UsIGJsdWUgJHtNYXRoLmFicyhmcmFjLTEyKS8xMioxMDB9JSk7XHJcbiAgICAgICAgICAgIGB9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYlwiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG91clwiPnt0aW1lMTIodGltKX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+LFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPXtgYmFyICR7Ym9sZH1gfSBzdHlsZT17YFxyXG4gICAgICAgICAgICAgICAgbGVmdDogY2FsYygkeyh0aW1lLXRoaXMuc3RhcnQpL1QubWlufSp2YXIoLS1taW4pIC0gMXB4KTtcclxuICAgICAgICAgICAgICAgIC0tY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCBvcmFuZ2UsIGJsdWUgJHtNYXRoLmFicyhmcmFjLTEyKS8xMioxMDB9JSk7XHJcbiAgICAgICAgICAgIGB9IC8+LFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdE1hcmtpbmdzKCkge1xyXG4gICAgICAgIGNvbnN0IGxlZnQgPSB0aGlzLnN0YXJ0ICsgdGhpcy5lbGVtZW50LnNjcm9sbExlZnQgLyAyKip0aGlzLm1pblB4ICogVC5taW47XHJcbiAgICAgICAgY29uc3QgcmlnaHQgPSBsZWZ0ICsgdGhpcy5lbGVtZW50LmNsaWVudFdpZHRoIC8gMioqdGhpcy5taW5QeCAqIFQubWluO1xyXG4gICAgICAgIGNvbnN0IGRhdGVzID0gdGhpcy5nZXRDbGFzcyhcImRhdGVzXCIpO1xyXG4gICAgICAgIGNvbnN0IHRpbWVzID0gdGhpcy5nZXRDbGFzcyhcInRpbWVzXCIpO1xyXG4gICAgICAgIGNvbnN0IG1hcmtpbmdzID0gdGhpcy5nZXRDbGFzcyhcIm1hcmtpbmdzXCIpO1xyXG4gICAgICAgIGRhdGVzLnJlcGxhY2VDaGlsZHJlbigpO1xyXG4gICAgICAgIHRpbWVzLnJlcGxhY2VDaGlsZHJlbigpO1xyXG4gICAgICAgIG1hcmtpbmdzLnJlcGxhY2VDaGlsZHJlbigpO1xyXG4gICAgICAgIGNvbnN0IGkgPSBpbnRlcnZhbHMuZmluZEluZGV4KGR0ID0+IGR0IC8gVC5taW4gKiAyKip0aGlzLm1pblB4ID4gNjApID8/IC0xO1xyXG4gICAgICAgIGNvbnN0IGR0ID0gaW50ZXJ2YWxzLmF0KGkpITtcclxuICAgICAgICBjb25zdCBldCA9IGVtcGhzLmF0KGkpITtcclxuICAgICAgICBmb3IgKGxldCB0aW1lID0gbGVmdCAtIG1vZChsZWZ0K29mZnNldCpULmhyLCBkdCkgLSBkdDsgdGltZSA8PSByaWdodCArIGR0OyB0aW1lICs9IGR0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFt0YWIsIGJhcl0gPSB0aGlzLm1ha2VNYXJraW5nKHRpbWUsIGV0KTtcclxuICAgICAgICAgICAgdGltZXMuYXBwZW5kKHRhYik7XHJcbiAgICAgICAgICAgIG1hcmtpbmdzLmFwcGVuZChiYXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCB0aW1lID0gbGVmdCAtIG1vZChsZWZ0K29mZnNldCpULmhyLCBldCkgKyBldC8yOyB0aW1lIDwgcmlnaHQ7IHRpbWUgKz0gZXQpIHtcclxuICAgICAgICAgICAgZGF0ZXMuYXBwZW5kKHRoaXMubWFrZURhdGUodGltZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRUcmFja3MoZXZlbnRzOiBDYWxlbmRhckV2ZW50W10pIHtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IGV2ZW50cy5tYXAoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IGV2ZW50O1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdGFydCwgZW5kLCBldmVudCB9O1xyXG4gICAgICAgIH0pLnNvcnQoKGEsIGIpID0+IGEuc3RhcnQgLSBiLnN0YXJ0KTtcclxuXHJcbiAgICAgICAgY29uc3QgdHJhY2tzOiB7IGVuZDogbnVtYmVyLCBpdGVtczogQ2FsZW5kYXJFdmVudFtdIH1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgeyBzdGFydCwgZW5kLCBldmVudCB9IG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrID0gdHJhY2tzLmZpbmQodHJhY2sgPT4gdHJhY2suZW5kIDw9IHN0YXJ0KVxyXG4gICAgICAgICAgICAgICAgPz8gKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFjayA9IHsgZW5kOiAwLCBpdGVtczogW10gfTtcclxuICAgICAgICAgICAgICAgICAgICB0cmFja3MucHVzaCh0cmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNrO1xyXG4gICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgdHJhY2suaXRlbXMucHVzaChldmVudCk7XHJcbiAgICAgICAgICAgIHRyYWNrLmVuZCA9IGVuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRyYWNrcztcclxuICAgIH1cclxuXHJcbiAgICBpbml0RXZlbnRzKGV2ZW50czogQ2FsZW5kYXJFdmVudFtdKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzRWxlbSA9IHRoaXMuZ2V0Q2xhc3MoXCJldmVudHNcIik7XHJcbiAgICAgICAgdGhpcy50cmFja3MgPSB0aGlzLmdldFRyYWNrcyhldmVudHMpLm1hcCh0cmFjayA9PiB0cmFjay5pdGVtcyk7XHJcbiAgICAgICAgZXZlbnRzRWxlbS5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHRyYWNrIG9mIHRoaXMudHJhY2tzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbGVtID0gPGRpdiBjbGFzcz1cInRyYWNrXCIgLz47XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBuYW1lLCBkb3JtLCBsb2NhdGlvbiwgc3RhcnQsIGVuZCwgZGVzY3JpcHRpb24sIHRhZ3MsIGdyb3VwLCBjb2xvciB9IG9mIHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWxlbS5hcHBlbmQoPGRpdiBjbGFzcz1cImV2ZW50XCIgc3R5bGU9e2BcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBjYWxjKCR7KHN0YXJ0LXRoaXMuc3RhcnQpL1QubWlufSp2YXIoLS1taW4pKTtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY2FsYygkeyhlbmQtc3RhcnQpL1QubWlufSp2YXIoLS1taW4pKTtcclxuICAgICAgICAgICAgICAgICAgICAtLWNvbG9yOiAke2NvbG9yfTtcclxuICAgICAgICAgICAgICAgIGB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxiPntuYW1lfTwvYj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aT57ZG9ybS5qb2luKFwiLCBcIil9PC9pPjxiciAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVzY3JpcHRpb259PGJyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIPCfk40ge2xvY2F0aW9ufXtncm91cCA9PSBudWxsID8gXCJcIiA6IGAg8J+RpSAke2dyb3VwfWB9PGJyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YWdzLmpvaW4oXCIg4ouFIFwiKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXZlbnRzRWxlbS5hcHBlbmQodGVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlckxpc3RlbmVycygpIHtcclxuICAgICAgICBjb25zdCBjbGFtcGVkID0gKHB4OiBudW1iZXIpID0+IGNsYW1wKHB4LCBNYXRoLmxvZzIobWFpbkVsZW0uY2xpZW50V2lkdGgvKHRoaXMuZW5kLXRoaXMuc3RhcnQpKlQubWluKSwgMyk7XHJcbiAgICAgICAgY29uc3Qgdmlld3BvcnQgPSB0aGlzLmdldENsYXNzKFwidmlld3BvcnRcIik7XHJcbiAgICAgICAgY29uc3QgbWFpbkVsZW0gPSB0aGlzLmVsZW1lbnQ7XHJcbiAgICAgICAgbWFpbkVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKCEoZXZlbnQuYnV0dG9ucyAmIDEpKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZpZXdwb3J0LnNjcm9sbEJ5KDAsIC1ldmVudC5tb3ZlbWVudFkpO1xyXG4gICAgICAgICAgICBtYWluRWxlbS5zY3JvbGxCeSgtZXZlbnQubW92ZW1lbnRYLCAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBtYWluRWxlbS5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5jdHJsS2V5KSByZXR1cm47XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9sZE1pblB4ID0gdGhpcy5taW5QeDtcclxuICAgICAgICAgICAgdGhpcy5taW5QeCAtPSBldmVudC5kZWx0YVkvMjAwO1xyXG4gICAgICAgICAgICB0aGlzLm1pblB4ID0gY2xhbXBlZCh0aGlzLm1pblB4KTtcclxuICAgICAgICAgICAgbWFpbkVsZW0uc3R5bGUuc2V0UHJvcGVydHkoXCItLW1pblwiLCBgJHsyICoqIHRoaXMubWluUHh9cHhgKTtcclxuICAgICAgICAgICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSBtYWluRWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54O1xyXG4gICAgICAgICAgICBtYWluRWxlbS5zY3JvbGwoKG1haW5FbGVtLnNjcm9sbExlZnQgKyB4KSAqIDIgKiogKHRoaXMubWluUHggLSBvbGRNaW5QeCkgLSB4LCAwKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0TWFya2luZ3MoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBtYWluRWxlbS5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRNYXJraW5ncygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5ldyBSZXNpemVPYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBweCA9IGNsYW1wZWQodGhpcy5taW5QeCk7XHJcbiAgICAgICAgICAgIGlmIChweCAhPT0gdGhpcy5taW5QeCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5taW5QeCA9IHB4O1xyXG4gICAgICAgICAgICAgICAgbWFpbkVsZW0uc3R5bGUuc2V0UHJvcGVydHkoXCItLW1pblwiLCBgJHsyICoqIHRoaXMubWluUHh9cHhgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmluaXRNYXJraW5ncygpO1xyXG4gICAgICAgIH0pLm9ic2VydmUobWFpbkVsZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoZXZlbnRzOiBDYWxlbmRhckV2ZW50W10pIHtcclxuICAgICAgICBsZXQgc3RhcnQgPSBNYXRoLm1pbiguLi5ldmVudHMubWFwKGV2ZW50ID0+IGV2ZW50LnN0YXJ0KSk7XHJcbiAgICAgICAgbGV0IGVuZCA9IE1hdGgubWF4KC4uLmV2ZW50cy5tYXAoZXZlbnQgPT4gZXZlbnQuZW5kKSk7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IG1pdERheShzdGFydCk7XHJcbiAgICAgICAgdGhpcy5lbmQgPSBtaXREYXkoZW5kLTEpK1QuZGF5O1xyXG4gICAgICAgIGNvbnN0IGZpZWxkRWxlbSA9IHRoaXMuZ2V0Q2xhc3MoXCJmaWVsZFwiKTtcclxuICAgICAgICBmaWVsZEVsZW0uc3R5bGUud2lkdGggPSBgY2FsYygkeyh0aGlzLmVuZC10aGlzLnN0YXJ0KS9ULm1pbn0qdmFyKC0tbWluKSlgO1xyXG4gICAgICAgIHRoaXMuaW5pdE1hcmtpbmdzKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RXZlbnRzKGV2ZW50cyk7XHJcbiAgICAgICAgdGhpcy5nZXRDbGFzcyhcImZpZWxkXCIpLnN0eWxlLmhlaWdodCA9IGBjYWxjKCR7dGhpcy50cmFja3MubGVuZ3RofSp2YXIoLS1oZWlnaHQpKWA7XHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qXHJcbm9yaWdpbmFsbHkgdXNlZCBhdCBodHRwczovL2dpdGh1Yi5jb20vdG9ic3ByLWdhbWVzL3NoYXBlei1jb21tdW5pdHktZWRpdGlvbi9wdWxsLzEyL2NvbW1pdHMvNTYzMzBhMTQzM2U4MWEyNjBiZTY2NjQ4ZjkwZGY3N2M4MTcyMzA4ZlxyXG5yZWxpY2Vuc2VkIGJ5IG1lLCB0aGUgb3JpZ2luYWwgYXV0aG9yXHJcbiovXHJcblxyXG5mdW5jdGlvbiBpc0Rpc3BsYXllZChub2RlOiBKU1guTm9kZSk6IG5vZGUgaXMgRXhjbHVkZTxKU1guTm9kZSwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHJldHVybiB0eXBlb2Ygbm9kZSAhPT0gXCJib29sZWFuXCIgJiYgbm9kZSAhPSBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogSlNYIGZhY3RvcnkuXHJcbiAqL1xyXG5mdW5jdGlvbiBqc3g8VCBleHRlbmRzIGtleW9mIEpTWC5JbnRyaW5zaWNFbGVtZW50cz4odGFnOiBULCBwcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzW1RdKTogSFRNTEVsZW1lbnQ7XHJcbmZ1bmN0aW9uIGpzeDxVIGV4dGVuZHMgSlNYLlByb3BzPih0YWc6IEpTWC5Db21wb25lbnQ8VT4sIHByb3BzOiBVKTogRWxlbWVudDtcclxuZnVuY3Rpb24ganN4PFUgZXh0ZW5kcyBKU1guUHJvcHM+KFxyXG4gICAgdGFnOiBrZXlvZiBKU1guSW50cmluc2ljRWxlbWVudHMgfCBKU1guQ29tcG9uZW50PFU+LFxyXG4gICAgcHJvcHM6IFVcclxuKTogSlNYLkVsZW1lbnQge1xyXG4gICAgaWYgKHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRhZyhwcm9wcyk7XHJcblxyXG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uYXR0cnMgfSA9IHByb3BzIGFzIEpTWC5JbnRyaW5zaWNFbGVtZW50c1trZXlvZiBKU1guSW50cmluc2ljRWxlbWVudHNdO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcbiAgICBPYmplY3QuZW50cmllcyhhdHRycykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcclxuICAgICAgICAgICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xyXG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGAke3ZhbHVlfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSlNYIGVsZW1lbnQgYXR0cmlidXRlIGFzc2lnbmVkIGludmFsaWQgdHlwZVwiKTtcclxuICAgIH0pO1xyXG4gICAgZWxlbWVudC5hcHBlbmQoLi4uKFtjaGlsZHJlbl0uZmxhdChJbmZpbml0eSkgYXMgSlNYLk5vZGVbXSkuZmlsdGVyKGlzRGlzcGxheWVkKSk7XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuLy8gZnVuY3Rpb25hbCBjb21wb25lbnQsIGNhbGxlZCBpbmRpcmVjdGx5IGFzIGBqc3goRnJhZ21lbnQsIHByb3BzKWBcclxuLyoqXHJcbiAqIEdyb3VwcyBlbGVtZW50cyB3aXRob3V0IGludHJvZHVjaW5nIGEgcGFyZW50IGVsZW1lbnQuXHJcbiAqL1xyXG5jb25zdCBGcmFnbWVudCA9IChwcm9wczogSlNYLlByb3BzKSA9PiBwcm9wcy5jaGlsZHJlbiBhcyBKU1guRWxlbWVudDtcclxuXHJcbi8vIGpzeHMgaXMgdXNlZCB3aGVuIHRoZXJlIGFyZSBtdWx0aXBsZSBjaGlsZHJlblxyXG5leHBvcnQgeyBqc3gsIGpzeCBhcyBqc3hzLCBGcmFnbWVudCB9O1xyXG4iLCJpbXBvcnQgdHlwZSB7IFRSZXhBUElSZXNwb25zZSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IENhbGVuZGFyLCBDYWxlbmRhckV2ZW50IH0gZnJvbSBcIi4vY2FsZW5kYXJcIjtcclxuaW1wb3J0IHsgU2VsZWN0b3IgfSBmcm9tIFwiLi9zZWxlY3RvclwiO1xyXG5pbXBvcnQgeyBTZWFyY2hlciB9IGZyb20gXCIuL3NlYXJjaGVyXCI7XHJcblxyXG5jb25zdCBhcGk6IFRSZXhBUElSZXNwb25zZSA9IGF3YWl0IChhd2FpdCBmZXRjaChcImh0dHBzOi8vcmV4Lm1pdC5lZHUvYXBpLmpzb25cIikpLmpzb24oKTtcclxuXHJcbmNvbnN0IGRvcm1Db2xvcnMgPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKGFwaS5jb2xvcnMuZG9ybXMpKTtcclxuY29uc3QgdGFnQ29sb3JzID0gbmV3IE1hcChPYmplY3QuZW50cmllcyhhcGkuY29sb3JzLnRhZ3MpKTtcclxuXHJcbmNvbnN0IGV2ZW50cyA9IGFwaS5ldmVudHMubWFwKCh7IG5hbWUsIGRvcm0sIGxvY2F0aW9uLCBzdGFydCwgZW5kLCBkZXNjcmlwdGlvbiwgdGFncywgZ3JvdXAgfSkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGRvcm0sXHJcbiAgICAgICAgbG9jYXRpb24sXHJcbiAgICAgICAgc3RhcnQ6IERhdGUucGFyc2Uoc3RhcnQpLFxyXG4gICAgICAgIGVuZDogRGF0ZS5wYXJzZShlbmQpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIHRhZ3MsXHJcbiAgICAgICAgZ3JvdXAsXHJcbiAgICAgICAgY29sb3I6IGRvcm1Db2xvcnMuZ2V0KGRvcm1bMF0pID8/IFwiYmxhY2tcIixcclxuICAgICAgICBrZXl3b3JkczogW25hbWUsIGRvcm0uam9pbihcIiBcIiksIGxvY2F0aW9uLCBkZXNjcmlwdGlvbiwgdGFncy5qb2luKFwiIFwiKSwgZ3JvdXAgPz8gXCJcIl0uam9pbihcIlxcblwiKSxcclxuICAgIH0gc2F0aXNmaWVzIENhbGVuZGFyRXZlbnQ7XHJcbn0pO1xyXG5cclxuY29uc3Qgc2VhcmNoZXIgPSBuZXcgU2VhcmNoZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIikgYXMgSFRNTElucHV0RWxlbWVudCk7XHJcbnNlYXJjaGVyLmluaXQoKTtcclxuXHJcbmNvbnN0IHNlbGVjdG9ySG9zdHMgPSBuZXcgU2VsZWN0b3IoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3N0c1wiKSEpO1xyXG5zZWxlY3Rvckhvc3RzLmluaXQoYXBpLmRvcm1zLCBkb3JtQ29sb3JzKTtcclxuXHJcbmNvbnN0IHNlbGVjdG9yVGFncyA9IG5ldyBTZWxlY3Rvcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhZ3NcIikhKTtcclxuc2VsZWN0b3JUYWdzLmluaXQoYXBpLnRhZ3MsIHRhZ0NvbG9ycyk7XHJcblxyXG5jb25zdCBjYWxlbmRhciA9IG5ldyBDYWxlbmRhcihkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaW50ZXJmYWNlXCIpWzBdIGFzIEhUTUxFbGVtZW50KTtcclxuY2FsZW5kYXIuaW5pdChldmVudHMpO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgY2FsZW5kYXIuaW5pdEV2ZW50cyhldmVudHMuZmlsdGVyKGV2ZW50ID0+XHJcbiAgICAgICAgZXZlbnQuZG9ybS5zb21lKGQgPT4gc2VsZWN0b3JIb3N0cy5tYXRjaChkKSlcclxuICAgICAgICAmJiBldmVudC50YWdzLnNvbWUodGFnID0+IHNlbGVjdG9yVGFncy5tYXRjaCh0YWcpKVxyXG4gICAgICAgICYmIHNlYXJjaGVyLm1hdGNoKGV2ZW50LmtleXdvcmRzKVxyXG4gICAgKSk7XHJcbn1cclxuXHJcbnNlYXJjaGVyLnNpZ25hbC5hZGQodXBkYXRlKTtcclxuc2VsZWN0b3JIb3N0cy5zaWduYWwuYWRkKHVwZGF0ZSk7XHJcbnNlbGVjdG9yVGFncy5zaWduYWwuYWRkKHVwZGF0ZSk7XHJcbiIsImltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlYXJjaGVyIHtcclxuICAgIHB1YmxpYyB2YWx1ZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICBwdWJsaWMgc2lnbmFsID0gbmV3IFNpZ25hbCgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCkge31cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVzID0gdGhpcy5lbGVtZW50LnZhbHVlLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcCh2ID0+IHYudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2lnbmFsLmZpcmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBtYXRjaCh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCB0eHQgPSB0ZXh0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmV2ZXJ5KHZhbHVlID0+IHR4dC5pbmNsdWRlcyh2YWx1ZSkpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdG9yIHtcclxuICAgIHB1YmxpYyB2YWx1ZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICAgIHB1YmxpYyBzaWduYWwgPSBuZXcgU2lnbmFsKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7fVxyXG5cclxuICAgIGluaXQob3B0aW9uczogc3RyaW5nW10sIGNvbG9yczogTWFwPHN0cmluZywgc3RyaW5nPikge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oXHJcbiAgICAgICAgICAgIDxvdXRwdXQgdGFiaW5kZXg9XCIwXCI+XHJcbiAgICAgICAgICAgICAgICB7Li4uWy4uLm9wdGlvbnMubWFwKG9wdGlvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9e29wdGlvbn0gLz4gYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMuYWRkKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcy5kZWxldGUob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNpZ25hbC5maXJlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxsYWJlbCB0YWJpbmRleD1cIi0xXCIgc3R5bGU9e2AtLWNvbG9yOiAke2NvbG9ycy5nZXQob3B0aW9uKSA/PyBcIndoaXRlXCJ9YH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpbnB1dH1cclxuICAgICAgICAgICAgICAgICAgICAgICAge29wdGlvbn1cclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPjtcclxuICAgICAgICAgICAgICAgIH0pLCA8c3Bhbj4rPC9zcGFuPl19XHJcbiAgICAgICAgICAgIDwvb3V0cHV0PixcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9wdGlvbnNcIiB0YWJpbmRleD1cIjBcIj5cclxuICAgICAgICAgICAgICAgIHsuLi5vcHRpb25zLm1hcChvcHRpb24gPT4gPGxhYmVsIGZvcj17b3B0aW9ufSBzdHlsZT17YC0tY29sb3I6ICR7Y29sb3JzLmdldChvcHRpb24pID8/IFwid2hpdGVcIn1gfT5cclxuICAgICAgICAgICAgICAgICAgICB7b3B0aW9ufVxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD4pfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIG1hdGNoKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZXMuc2l6ZSA9PT0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmhhcyh2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFNpZ25hbDxUIGV4dGVuZHMgdW5rbm93bltdID0gW10+IHtcclxuICAgIHB1YmxpYyBsaXN0ZW5lcnMgPSBuZXcgU2V0PCguLi5hcmdzOiBUKSA9PiB2b2lkPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBhZGQobGlzdGVuZXI6ICguLi5hcmdzOiBUKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlKC4uLmFyZ3M6IFQpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMubGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyKC4uLmFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gbW9kKGE6IG51bWJlciwgYjogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gKGElYitiKSViO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAoeDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKG1heCwgeCkpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgb2Zmc2V0ID0gLTQ7XHJcblxyXG5jb25zdCBzID0gMTAwMDtcclxuY29uc3QgbWluID0gNjAgKiBzO1xyXG5jb25zdCBociA9IDYwICogbWluO1xyXG5jb25zdCBkYXkgPSAyNCAqIGhyO1xyXG5leHBvcnQgY29uc3QgVCA9IHsgcywgbWluLCBociwgZGF5IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWl0VGltZSh0aW1lOiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aW1lK29mZnNldCpocjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1pdERheSh0aW1lOiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aW1lIC0gbW9kKHRpbWUrb2Zmc2V0KmhyLCBkYXkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGltZTEyKHRpbWU6IG51bWJlcikge1xyXG4gICAgY29uc3QgZGRheSA9IHRpbWUgJSBkYXk7XHJcbiAgICBjb25zdCBkaG91ciA9IHRpbWUgJSBocjtcclxuICAgIGNvbnN0IGRtaW4gPSB0aW1lICUgbWluO1xyXG4gICAgY29uc3QgaG91ciA9IChkZGF5LWRob3VyKS9ocjtcclxuICAgIGNvbnN0IG1pbnV0ZSA9IChkaG91ci1kbWluKS9taW47XHJcbiAgICByZXR1cm4gYCR7bW9kKGhvdXItMSwgMTIpKzF9OiR7YCR7bWludXRlfWAucGFkU3RhcnQoMiwgXCIwXCIpfSAke2hvdXI8MTIgPyBcIkFNXCIgOiBcIlBNXCJ9YDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRheXNPZldlZWsgPSBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmIHF1ZXVlLmQgPCAxKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IC0xKTtcblx0dmFyIGRlcFF1ZXVlcyA9IG5ldyBTZXQoKTtcblx0dmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblx0dmFyIGN1cnJlbnREZXBzO1xuXHR2YXIgb3V0ZXJSZXNvbHZlO1xuXHR2YXIgcmVqZWN0O1xuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblx0XHRyZWplY3QgPSByZWo7XG5cdFx0b3V0ZXJSZXNvbHZlID0gcmVzb2x2ZTtcblx0fSk7XG5cdHByb21pc2Vbd2VicGFja0V4cG9ydHNdID0gZXhwb3J0cztcblx0cHJvbWlzZVt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKHF1ZXVlICYmIGZuKHF1ZXVlKSwgZGVwUXVldWVzLmZvckVhY2goZm4pLCBwcm9taXNlW1wiY2F0Y2hcIl0oeCA9PiB7fSkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IHByb21pc2U7XG5cdGJvZHkoKGRlcHMpID0+IHtcblx0XHRjdXJyZW50RGVwcyA9IHdyYXBEZXBzKGRlcHMpO1xuXHRcdHZhciBmbjtcblx0XHR2YXIgZ2V0UmVzdWx0ID0gKCkgPT4gKGN1cnJlbnREZXBzLm1hcCgoZCkgPT4ge1xuXHRcdFx0aWYoZFt3ZWJwYWNrRXJyb3JdKSB0aHJvdyBkW3dlYnBhY2tFcnJvcl07XG5cdFx0XHRyZXR1cm4gZFt3ZWJwYWNrRXhwb3J0c107XG5cdFx0fSkpXG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0Zm4gPSAoKSA9PiAocmVzb2x2ZShnZXRSZXN1bHQpKTtcblx0XHRcdGZuLnIgPSAwO1xuXHRcdFx0dmFyIGZuUXVldWUgPSAocSkgPT4gKHEgIT09IHF1ZXVlICYmICFkZXBRdWV1ZXMuaGFzKHEpICYmIChkZXBRdWV1ZXMuYWRkKHEpLCBxICYmICFxLmQgJiYgKGZuLnIrKywgcS5wdXNoKGZuKSkpKTtcblx0XHRcdGN1cnJlbnREZXBzLm1hcCgoZGVwKSA9PiAoZGVwW3dlYnBhY2tRdWV1ZXNdKGZuUXVldWUpKSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZuLnIgPyBwcm9taXNlIDogZ2V0UmVzdWx0KCk7XG5cdH0sIChlcnIpID0+ICgoZXJyID8gcmVqZWN0KHByb21pc2Vbd2VicGFja0Vycm9yXSA9IGVycikgOiBvdXRlclJlc29sdmUoZXhwb3J0cykpLCByZXNvbHZlUXVldWUocXVldWUpKSk7XG5cdHF1ZXVlICYmIHF1ZXVlLmQgPCAwICYmIChxdWV1ZS5kID0gMCk7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ21vZHVsZScgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9qcy9tYWluLnRzeFwiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==