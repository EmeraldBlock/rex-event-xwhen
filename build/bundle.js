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
        // TODO: don't do this here
        return tracks;
    }
    initEvents(events) {
        const eventsElem = this.getClass("events");
        this.tracks = this.getTracks(events).map(track => track.items);
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
        const viewport = this.getClass("viewport");
        const mainElem = this.element;
        mainElem.addEventListener("mousemove", (event) => {
            if (!(event.buttons & 1))
                return;
            viewport.scrollBy(0, -event.movementY);
            mainElem.scrollBy(-event.movementX, 0);
        });
        mainElem.addEventListener("wheel", (event) => {
            event.preventDefault();
            const oldMinPx = this.minPx;
            this.minPx -= event.deltaY / 200;
            this.minPx = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.clamp)(this.minPx, Math.log2(mainElem.clientWidth / (this.end - this.start) * _utils__WEBPACK_IMPORTED_MODULE_1__.T.min), 3);
            mainElem.style.setProperty("--min", `${2 ** this.minPx}px`);
            mainElem.scroll((mainElem.scrollLeft + event.clientX) * 2 ** (this.minPx - oldMinPx) - event.clientX, 0);
            this.initMarkings();
        });
        mainElem.addEventListener("scroll", (event) => {
            this.initMarkings();
        });
        window.addEventListener("resize", (event) => {
            this.initMarkings();
        });
    }
    init(events) {
        let start = Math.min(...events.map(event => event.start));
        let end = Math.max(...events.map(event => event.end));
        this.start = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.mitDay)(start);
        this.end = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.mitDay)(end - 1) + _utils__WEBPACK_IMPORTED_MODULE_1__.T.day;
        this.initMarkings();
        const fieldElem = this.getClass("field");
        fieldElem.style.width = `max(100vw, calc(${(this.end - this.start) / _utils__WEBPACK_IMPORTED_MODULE_1__.T.min}*var(--min)))`;
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

const api = await (await fetch("https://rex.mit.edu/api.json")).json();
const colors = new Map(Object.entries(api.colors.dorms));
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
        color: colors.get(dorm[0]) ?? "black",
    };
});
const calendar = new _calendar__WEBPACK_IMPORTED_MODULE_0__.Calendar(document.getElementsByTagName("main")[0]);
calendar.init(events);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Jlbi1zaXRlLy4vanMvY2FsZW5kYXIudHN4Iiwid2VicGFjazovL2Jlbi1zaXRlLy4vanMvanN4LXJ1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vYmVuLXNpdGUvLi9qcy9tYWluLnRzeCIsIndlYnBhY2s6Ly9iZW4tc2l0ZS8uL2pzL3V0aWxzLnRzIiwid2VicGFjazovL2Jlbi1zaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Jlbi1zaXRlL3dlYnBhY2svcnVudGltZS9hc3luYyBtb2R1bGUiLCJ3ZWJwYWNrOi8vYmVuLXNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Jlbi1zaXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmVuLXNpdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iZW4tc2l0ZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Jlbi1zaXRlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iZW4tc2l0ZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2xhbXAsIHRpbWUxMiwgbWl0RGF5LCBtb2QsIFQsIG1pdFRpbWUsIG9mZnNldCwgZGF5c09mV2VlayB9IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBDYWxlbmRhckV2ZW50ID0ge1xyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIGRvcm06IHN0cmluZ1tdLFxyXG4gICAgZ3JvdXA6IHN0cmluZyB8IG51bGwsXHJcbiAgICBsb2NhdGlvbjogc3RyaW5nLFxyXG4gICAgc3RhcnQ6IG51bWJlcixcclxuICAgIGVuZDogbnVtYmVyLFxyXG4gICAgdGFnczogc3RyaW5nW10sXHJcbiAgICBjb2xvcjogc3RyaW5nLFxyXG59O1xyXG5cclxuY29uc3QgaW50ZXJ2YWxzID0gW1QubWluKjE1LCBULm1pbiozMCwgVC5ociwgVC5ocioyLCBULmhyKjYsIFQuaHIqMTIsIFQuZGF5XTtcclxuY29uc3QgZW1waHMgPSBbVC5ociwgVC5ociwgVC5ocio2LCBULmhyKjYsIFQuZGF5LCBULmRheSwgVC5kYXldO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyIHtcclxuICAgIHB1YmxpYyBzdGFydCE6IG51bWJlcjtcclxuICAgIHB1YmxpYyBlbmQhOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbWluUHggPSAwO1xyXG4gICAgcHVibGljIHRyYWNrcyE6IENhbGVuZGFyRXZlbnRbXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudCkge31cclxuXHJcbiAgICBnZXRDbGFzcyhjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLmVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xyXG4gICAgICAgIGlmIChjb2xsZWN0aW9uLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFwiJHtjbGFzc05hbWV9XCIgZG9lcyBub3QgdW5pcXVlbHkgZXhpc3RgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25bMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZURhdGUodGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdGltID0gbWl0VGltZSh0aW1lKTtcclxuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltKTtcclxuICAgICAgICBjb25zdCBkYXQgPSBkYXRlLmdldFVUQ0RhdGUoKTtcclxuICAgICAgICBjb25zdCBkYXkgPSBkYXRlLmdldFVUQ0RheSgpO1xyXG4gICAgICAgIGNvbnN0IHN0ciA9IGAke2RheXNPZldlZWtbZGF5XX0gJHtkYXR9YFxyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzPVwiZGF0ZVwiIHN0eWxlPXtgbGVmdDogY2FsYygkeyh0aW1lLXRoaXMuc3RhcnQpL1QubWlufSp2YXIoLS1taW4pKWB9PlxyXG4gICAgICAgICAgICB7c3RyfVxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlTWFya2luZyh0aW1lOiBudW1iZXIsIGR0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB0aW0gPSBtaXRUaW1lKHRpbWUpO1xyXG4gICAgICAgIGNvbnN0IGZyYWMgPSAodGltJVQuZGF5KS9ULmhyO1xyXG4gICAgICAgIGNvbnN0IGJvbGQgPSB0aW0lZHQgPT0gMCA/IFwiYm9sZFwiIDogXCJcIjtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPXtgdGltZSAke2JvbGR9YH0gc3R5bGU9e2BcclxuICAgICAgICAgICAgICAgIGxlZnQ6IGNhbGMoJHsodGltZS10aGlzLnN0YXJ0KS9ULm1pbn0qdmFyKC0tbWluKSArIDFweCk7XHJcbiAgICAgICAgICAgICAgICAtLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgb3JhbmdlLCBibHVlICR7TWF0aC5hYnMoZnJhYy0xMikvMTIqMTAwfSUpO1xyXG4gICAgICAgICAgICBgfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJcIiAvPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvdXJcIj57dGltZTEyKHRpbSl9PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PixcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz17YGJhciAke2JvbGR9YH0gc3R5bGU9e2BcclxuICAgICAgICAgICAgICAgIGxlZnQ6IGNhbGMoJHsodGltZS10aGlzLnN0YXJ0KS9ULm1pbn0qdmFyKC0tbWluKSAtIDFweCk7XHJcbiAgICAgICAgICAgICAgICAtLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgb3JhbmdlLCBibHVlICR7TWF0aC5hYnMoZnJhYy0xMikvMTIqMTAwfSUpO1xyXG4gICAgICAgICAgICBgfSAvPixcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRNYXJraW5ncygpIHtcclxuICAgICAgICBjb25zdCBsZWZ0ID0gdGhpcy5zdGFydCArIHRoaXMuZWxlbWVudC5zY3JvbGxMZWZ0IC8gMioqdGhpcy5taW5QeCAqIFQubWluO1xyXG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gbGVmdCArIHRoaXMuZWxlbWVudC5jbGllbnRXaWR0aCAvIDIqKnRoaXMubWluUHggKiBULm1pbjtcclxuICAgICAgICBjb25zdCBkYXRlcyA9IHRoaXMuZ2V0Q2xhc3MoXCJkYXRlc1wiKTtcclxuICAgICAgICBjb25zdCB0aW1lcyA9IHRoaXMuZ2V0Q2xhc3MoXCJ0aW1lc1wiKTtcclxuICAgICAgICBjb25zdCBtYXJraW5ncyA9IHRoaXMuZ2V0Q2xhc3MoXCJtYXJraW5nc1wiKTtcclxuICAgICAgICBkYXRlcy5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aW1lcy5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuICAgICAgICBtYXJraW5ncy5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuICAgICAgICBjb25zdCBpID0gaW50ZXJ2YWxzLmZpbmRJbmRleChkdCA9PiBkdCAvIFQubWluICogMioqdGhpcy5taW5QeCA+IDYwKSA/PyAtMTtcclxuICAgICAgICBjb25zdCBkdCA9IGludGVydmFscy5hdChpKSE7XHJcbiAgICAgICAgY29uc3QgZXQgPSBlbXBocy5hdChpKSE7XHJcbiAgICAgICAgZm9yIChsZXQgdGltZSA9IGxlZnQgLSBtb2QobGVmdCtvZmZzZXQqVC5ociwgZHQpIC0gZHQ7IHRpbWUgPD0gcmlnaHQgKyBkdDsgdGltZSArPSBkdCkge1xyXG4gICAgICAgICAgICBjb25zdCBbdGFiLCBiYXJdID0gdGhpcy5tYWtlTWFya2luZyh0aW1lLCBldCk7XHJcbiAgICAgICAgICAgIHRpbWVzLmFwcGVuZCh0YWIpO1xyXG4gICAgICAgICAgICBtYXJraW5ncy5hcHBlbmQoYmFyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgdGltZSA9IGxlZnQgLSBtb2QobGVmdCtvZmZzZXQqVC5ociwgZXQpICsgZXQvMjsgdGltZSA8IHJpZ2h0OyB0aW1lICs9IGV0KSB7XHJcbiAgICAgICAgICAgIGRhdGVzLmFwcGVuZCh0aGlzLm1ha2VEYXRlKHRpbWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VHJhY2tzKGV2ZW50czogQ2FsZW5kYXJFdmVudFtdKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSBldmVudHMubWFwKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSBldmVudDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQsIGVuZCwgZXZlbnQgfTtcclxuICAgICAgICB9KS5zb3J0KChhLCBiKSA9PiBhLnN0YXJ0IC0gYi5zdGFydCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRyYWNrczogeyBlbmQ6IG51bWJlciwgaXRlbXM6IENhbGVuZGFyRXZlbnRbXSB9W10gPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IHsgc3RhcnQsIGVuZCwgZXZlbnQgfSBvZiBpdGVtcykge1xyXG4gICAgICAgICAgICBjb25zdCB0cmFjayA9IHRyYWNrcy5maW5kKHRyYWNrID0+IHRyYWNrLmVuZCA8PSBzdGFydClcclxuICAgICAgICAgICAgICAgID8/ICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhY2sgPSB7IGVuZDogMCwgaXRlbXM6IFtdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tzLnB1c2godHJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmFjaztcclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIHRyYWNrLml0ZW1zLnB1c2goZXZlbnQpO1xyXG4gICAgICAgICAgICB0cmFjay5lbmQgPSBlbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFRPRE86IGRvbid0IGRvIHRoaXMgaGVyZVxyXG4gICAgICAgIHJldHVybiB0cmFja3M7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEV2ZW50cyhldmVudHM6IENhbGVuZGFyRXZlbnRbXSkge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50c0VsZW0gPSB0aGlzLmdldENsYXNzKFwiZXZlbnRzXCIpO1xyXG4gICAgICAgIHRoaXMudHJhY2tzID0gdGhpcy5nZXRUcmFja3MoZXZlbnRzKS5tYXAodHJhY2sgPT4gdHJhY2suaXRlbXMpO1xyXG4gICAgICAgIGZvciAoY29uc3QgdHJhY2sgb2YgdGhpcy50cmFja3MpIHtcclxuICAgICAgICAgICAgY29uc3QgdGVsZW0gPSA8ZGl2IGNsYXNzPVwidHJhY2tcIiAvPjtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB7IG5hbWUsIGRvcm0sIGxvY2F0aW9uLCBzdGFydCwgZW5kLCBkZXNjcmlwdGlvbiwgdGFncywgZ3JvdXAsIGNvbG9yIH0gb2YgdHJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRlbGVtLmFwcGVuZCg8ZGl2IGNsYXNzPVwiZXZlbnRcIiBzdHlsZT17YFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGNhbGMoJHsoc3RhcnQtdGhpcy5zdGFydCkvVC5taW59KnZhcigtLW1pbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjYWxjKCR7KGVuZC1zdGFydCkvVC5taW59KnZhcigtLW1pbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIC0tY29sb3I6ICR7Y29sb3J9O1xyXG4gICAgICAgICAgICAgICAgYH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGI+e25hbWV9PC9iPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpPntkb3JtLmpvaW4oXCIsIFwiKX08L2k+PGJyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkZXNjcmlwdGlvbn08YnIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAg8J+TjSB7bG9jYXRpb259e2dyb3VwID09IG51bGwgPyBcIlwiIDogYCDwn5GlICR7Z3JvdXB9YH08YnIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RhZ3Muam9pbihcIiDii4UgXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBldmVudHNFbGVtLmFwcGVuZCh0ZWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5nZXRDbGFzcyhcInZpZXdwb3J0XCIpO1xyXG4gICAgICAgIGNvbnN0IG1haW5FbGVtID0gdGhpcy5lbGVtZW50O1xyXG4gICAgICAgIG1haW5FbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghKGV2ZW50LmJ1dHRvbnMgJiAxKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2aWV3cG9ydC5zY3JvbGxCeSgwLCAtZXZlbnQubW92ZW1lbnRZKTtcclxuICAgICAgICAgICAgbWFpbkVsZW0uc2Nyb2xsQnkoLWV2ZW50Lm1vdmVtZW50WCwgMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWFpbkVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBvbGRNaW5QeCA9IHRoaXMubWluUHg7XHJcbiAgICAgICAgICAgIHRoaXMubWluUHggLT0gZXZlbnQuZGVsdGFZLzIwMDtcclxuICAgICAgICAgICAgdGhpcy5taW5QeCA9IGNsYW1wKHRoaXMubWluUHgsIE1hdGgubG9nMihtYWluRWxlbS5jbGllbnRXaWR0aC8odGhpcy5lbmQtdGhpcy5zdGFydCkqVC5taW4pLCAzKTtcclxuICAgICAgICAgICAgbWFpbkVsZW0uc3R5bGUuc2V0UHJvcGVydHkoXCItLW1pblwiLCBgJHsyICoqIHRoaXMubWluUHh9cHhgKTtcclxuICAgICAgICAgICAgbWFpbkVsZW0uc2Nyb2xsKChtYWluRWxlbS5zY3JvbGxMZWZ0ICsgZXZlbnQuY2xpZW50WCkgKiAyICoqICh0aGlzLm1pblB4IC0gb2xkTWluUHgpIC0gZXZlbnQuY2xpZW50WCwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdE1hcmtpbmdzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWFpbkVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbml0TWFya2luZ3MoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbml0TWFya2luZ3MoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGV2ZW50czogQ2FsZW5kYXJFdmVudFtdKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gTWF0aC5taW4oLi4uZXZlbnRzLm1hcChldmVudCA9PiBldmVudC5zdGFydCkpO1xyXG4gICAgICAgIGxldCBlbmQgPSBNYXRoLm1heCguLi5ldmVudHMubWFwKGV2ZW50ID0+IGV2ZW50LmVuZCkpO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBtaXREYXkoc3RhcnQpO1xyXG4gICAgICAgIHRoaXMuZW5kID0gbWl0RGF5KGVuZC0xKStULmRheTtcclxuICAgICAgICB0aGlzLmluaXRNYXJraW5ncygpO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkRWxlbSA9IHRoaXMuZ2V0Q2xhc3MoXCJmaWVsZFwiKTtcclxuICAgICAgICBmaWVsZEVsZW0uc3R5bGUud2lkdGggPSBgbWF4KDEwMHZ3LCBjYWxjKCR7KHRoaXMuZW5kLXRoaXMuc3RhcnQpL1QubWlufSp2YXIoLS1taW4pKSlgO1xyXG4gICAgICAgIHRoaXMuaW5pdEV2ZW50cyhldmVudHMpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q2xhc3MoXCJmaWVsZFwiKS5zdHlsZS5oZWlnaHQgPSBgY2FsYygke3RoaXMudHJhY2tzLmxlbmd0aH0qdmFyKC0taGVpZ2h0KSlgO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxufVxyXG4iLCIvKlxyXG5vcmlnaW5hbGx5IHVzZWQgYXQgaHR0cHM6Ly9naXRodWIuY29tL3RvYnNwci1nYW1lcy9zaGFwZXotY29tbXVuaXR5LWVkaXRpb24vcHVsbC8xMi9jb21taXRzLzU2MzMwYTE0MzNlODFhMjYwYmU2NjY0OGY5MGRmNzdjODE3MjMwOGZcclxucmVsaWNlbnNlZCBieSBtZSwgdGhlIG9yaWdpbmFsIGF1dGhvclxyXG4qL1xyXG5cclxuZnVuY3Rpb24gaXNEaXNwbGF5ZWQobm9kZTogSlNYLk5vZGUpOiBub2RlIGlzIEV4Y2x1ZGU8SlNYLk5vZGUsIGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIG5vZGUgIT09IFwiYm9vbGVhblwiICYmIG5vZGUgIT0gbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEpTWCBmYWN0b3J5LlxyXG4gKi9cclxuZnVuY3Rpb24ganN4PFQgZXh0ZW5kcyBrZXlvZiBKU1guSW50cmluc2ljRWxlbWVudHM+KHRhZzogVCwgcHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1tUXSk6IEhUTUxFbGVtZW50O1xyXG5mdW5jdGlvbiBqc3g8VSBleHRlbmRzIEpTWC5Qcm9wcz4odGFnOiBKU1guQ29tcG9uZW50PFU+LCBwcm9wczogVSk6IEVsZW1lbnQ7XHJcbmZ1bmN0aW9uIGpzeDxVIGV4dGVuZHMgSlNYLlByb3BzPihcclxuICAgIHRhZzoga2V5b2YgSlNYLkludHJpbnNpY0VsZW1lbnRzIHwgSlNYLkNvbXBvbmVudDxVPixcclxuICAgIHByb3BzOiBVXHJcbik6IEpTWC5FbGVtZW50IHtcclxuICAgIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0YWcocHJvcHMpO1xyXG5cclxuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmF0dHJzIH0gPSBwcm9wcyBhcyBKU1guSW50cmluc2ljRWxlbWVudHNba2V5b2YgSlNYLkludHJpbnNpY0VsZW1lbnRzXTtcclxuXHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG4gICAgT2JqZWN0LmVudHJpZXMoYXR0cnMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOlxyXG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBgJHt2YWx1ZX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkpTWCBlbGVtZW50IGF0dHJpYnV0ZSBhc3NpZ25lZCBpbnZhbGlkIHR5cGVcIik7XHJcbiAgICB9KTtcclxuICAgIGVsZW1lbnQuYXBwZW5kKC4uLihbY2hpbGRyZW5dLmZsYXQoSW5maW5pdHkpIGFzIEpTWC5Ob2RlW10pLmZpbHRlcihpc0Rpc3BsYXllZCkpO1xyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uYWwgY29tcG9uZW50LCBjYWxsZWQgaW5kaXJlY3RseSBhcyBganN4KEZyYWdtZW50LCBwcm9wcylgXHJcbi8qKlxyXG4gKiBHcm91cHMgZWxlbWVudHMgd2l0aG91dCBpbnRyb2R1Y2luZyBhIHBhcmVudCBlbGVtZW50LlxyXG4gKi9cclxuY29uc3QgRnJhZ21lbnQgPSAocHJvcHM6IEpTWC5Qcm9wcykgPT4gcHJvcHMuY2hpbGRyZW4gYXMgSlNYLkVsZW1lbnQ7XHJcblxyXG4vLyBqc3hzIGlzIHVzZWQgd2hlbiB0aGVyZSBhcmUgbXVsdGlwbGUgY2hpbGRyZW5cclxuZXhwb3J0IHsganN4LCBqc3ggYXMganN4cywgRnJhZ21lbnQgfTtcclxuIiwiaW1wb3J0IHsgQ2FsZW5kYXIsIENhbGVuZGFyRXZlbnQgfSBmcm9tIFwiLi9jYWxlbmRhclwiO1xyXG5pbXBvcnQgdHlwZSB7IFRSZXhBUElSZXNwb25zZSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcblxyXG5jb25zdCBhcGk6IFRSZXhBUElSZXNwb25zZSA9IGF3YWl0IChhd2FpdCBmZXRjaChcImh0dHBzOi8vcmV4Lm1pdC5lZHUvYXBpLmpzb25cIikpLmpzb24oKTtcclxuXHJcbmNvbnN0IGNvbG9ycyA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXMoYXBpLmNvbG9ycy5kb3JtcykpO1xyXG5cclxuY29uc3QgZXZlbnRzID0gYXBpLmV2ZW50cy5tYXAoKHsgbmFtZSwgZG9ybSwgbG9jYXRpb24sIHN0YXJ0LCBlbmQsIGRlc2NyaXB0aW9uLCB0YWdzLCBncm91cCB9KSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZG9ybSxcclxuICAgICAgICBsb2NhdGlvbixcclxuICAgICAgICBzdGFydDogRGF0ZS5wYXJzZShzdGFydCksXHJcbiAgICAgICAgZW5kOiBEYXRlLnBhcnNlKGVuZCksXHJcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgdGFncyxcclxuICAgICAgICBncm91cCxcclxuICAgICAgICBjb2xvcjogY29sb3JzLmdldChkb3JtWzBdKSA/PyBcImJsYWNrXCIsXHJcbiAgICB9IHNhdGlzZmllcyBDYWxlbmRhckV2ZW50O1xyXG59KTtcclxuXHJcbmNvbnN0IGNhbGVuZGFyID0gbmV3IENhbGVuZGFyKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibWFpblwiKVswXSBhcyBIVE1MRWxlbWVudCk7XHJcbmNhbGVuZGFyLmluaXQoZXZlbnRzKTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIG1vZChhOiBudW1iZXIsIGI6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIChhJWIrYiklYjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKHg6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbihtYXgsIHgpKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG9mZnNldCA9IC00O1xyXG5cclxuY29uc3QgcyA9IDEwMDA7XHJcbmNvbnN0IG1pbiA9IDYwICogcztcclxuY29uc3QgaHIgPSA2MCAqIG1pbjtcclxuY29uc3QgZGF5ID0gMjQgKiBocjtcclxuZXhwb3J0IGNvbnN0IFQgPSB7IHMsIG1pbiwgaHIsIGRheSB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1pdFRpbWUodGltZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGltZStvZmZzZXQqaHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtaXREYXkodGltZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGltZSAtIG1vZCh0aW1lK29mZnNldCpociwgZGF5KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRpbWUxMih0aW1lOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGRkYXkgPSB0aW1lICUgZGF5O1xyXG4gICAgY29uc3QgZGhvdXIgPSB0aW1lICUgaHI7XHJcbiAgICBjb25zdCBkbWluID0gdGltZSAlIG1pbjtcclxuICAgIGNvbnN0IGhvdXIgPSAoZGRheS1kaG91cikvaHI7XHJcbiAgICBjb25zdCBtaW51dGUgPSAoZGhvdXItZG1pbikvbWluO1xyXG4gICAgcmV0dXJuIGAke21vZChob3VyLTEsIDEyKSsxfToke2Ake21pbnV0ZX1gLnBhZFN0YXJ0KDIsIFwiMFwiKX0gJHtob3VyPDEyID8gXCJBTVwiIDogXCJQTVwifWA7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkYXlzT2ZXZWVrID0gW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwidmFyIHdlYnBhY2tRdWV1ZXMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIHF1ZXVlc1wiKSA6IFwiX193ZWJwYWNrX3F1ZXVlc19fXCI7XG52YXIgd2VicGFja0V4cG9ydHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIGV4cG9ydHNcIikgOiBcIl9fd2VicGFja19leHBvcnRzX19cIjtcbnZhciB3ZWJwYWNrRXJyb3IgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIGVycm9yXCIpIDogXCJfX3dlYnBhY2tfZXJyb3JfX1wiO1xudmFyIHJlc29sdmVRdWV1ZSA9IChxdWV1ZSkgPT4ge1xuXHRpZihxdWV1ZSAmJiBxdWV1ZS5kIDwgMSkge1xuXHRcdHF1ZXVlLmQgPSAxO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tKSk7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0gPyBmbi5yKysgOiBmbigpKSk7XG5cdH1cbn1cbnZhciB3cmFwRGVwcyA9IChkZXBzKSA9PiAoZGVwcy5tYXAoKGRlcCkgPT4ge1xuXHRpZihkZXAgIT09IG51bGwgJiYgdHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIikge1xuXHRcdGlmKGRlcFt3ZWJwYWNrUXVldWVzXSkgcmV0dXJuIGRlcDtcblx0XHRpZihkZXAudGhlbikge1xuXHRcdFx0dmFyIHF1ZXVlID0gW107XG5cdFx0XHRxdWV1ZS5kID0gMDtcblx0XHRcdGRlcC50aGVuKChyKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXhwb3J0c10gPSByO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSwgKGUpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFcnJvcl0gPSBlO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgb2JqID0ge307XG5cdFx0XHRvYmpbd2VicGFja1F1ZXVlc10gPSAoZm4pID0+IChmbihxdWV1ZSkpO1xuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9XG5cdH1cblx0dmFyIHJldCA9IHt9O1xuXHRyZXRbd2VicGFja1F1ZXVlc10gPSB4ID0+IHt9O1xuXHRyZXRbd2VicGFja0V4cG9ydHNdID0gZGVwO1xuXHRyZXR1cm4gcmV0O1xufSkpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5hID0gKG1vZHVsZSwgYm9keSwgaGFzQXdhaXQpID0+IHtcblx0dmFyIHF1ZXVlO1xuXHRoYXNBd2FpdCAmJiAoKHF1ZXVlID0gW10pLmQgPSAtMSk7XG5cdHZhciBkZXBRdWV1ZXMgPSBuZXcgU2V0KCk7XG5cdHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cdHZhciBjdXJyZW50RGVwcztcblx0dmFyIG91dGVyUmVzb2x2ZTtcblx0dmFyIHJlamVjdDtcblx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqKSA9PiB7XG5cdFx0cmVqZWN0ID0gcmVqO1xuXHRcdG91dGVyUmVzb2x2ZSA9IHJlc29sdmU7XG5cdH0pO1xuXHRwcm9taXNlW3dlYnBhY2tFeHBvcnRzXSA9IGV4cG9ydHM7XG5cdHByb21pc2Vbd2VicGFja1F1ZXVlc10gPSAoZm4pID0+IChxdWV1ZSAmJiBmbihxdWV1ZSksIGRlcFF1ZXVlcy5mb3JFYWNoKGZuKSwgcHJvbWlzZVtcImNhdGNoXCJdKHggPT4ge30pKTtcblx0bW9kdWxlLmV4cG9ydHMgPSBwcm9taXNlO1xuXHRib2R5KChkZXBzKSA9PiB7XG5cdFx0Y3VycmVudERlcHMgPSB3cmFwRGVwcyhkZXBzKTtcblx0XHR2YXIgZm47XG5cdFx0dmFyIGdldFJlc3VsdCA9ICgpID0+IChjdXJyZW50RGVwcy5tYXAoKGQpID0+IHtcblx0XHRcdGlmKGRbd2VicGFja0Vycm9yXSkgdGhyb3cgZFt3ZWJwYWNrRXJyb3JdO1xuXHRcdFx0cmV0dXJuIGRbd2VicGFja0V4cG9ydHNdO1xuXHRcdH0pKVxuXHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdGZuID0gKCkgPT4gKHJlc29sdmUoZ2V0UmVzdWx0KSk7XG5cdFx0XHRmbi5yID0gMDtcblx0XHRcdHZhciBmblF1ZXVlID0gKHEpID0+IChxICE9PSBxdWV1ZSAmJiAhZGVwUXVldWVzLmhhcyhxKSAmJiAoZGVwUXVldWVzLmFkZChxKSwgcSAmJiAhcS5kICYmIChmbi5yKyssIHEucHVzaChmbikpKSk7XG5cdFx0XHRjdXJyZW50RGVwcy5tYXAoKGRlcCkgPT4gKGRlcFt3ZWJwYWNrUXVldWVzXShmblF1ZXVlKSkpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBmbi5yID8gcHJvbWlzZSA6IGdldFJlc3VsdCgpO1xuXHR9LCAoZXJyKSA9PiAoKGVyciA/IHJlamVjdChwcm9taXNlW3dlYnBhY2tFcnJvcl0gPSBlcnIpIDogb3V0ZXJSZXNvbHZlKGV4cG9ydHMpKSwgcmVzb2x2ZVF1ZXVlKHF1ZXVlKSkpO1xuXHRxdWV1ZSAmJiBxdWV1ZS5kIDwgMCAmJiAocXVldWUuZCA9IDApO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdtb2R1bGUnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vanMvbWFpbi50c3hcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=