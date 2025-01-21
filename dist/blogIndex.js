/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/blogIndex/blogIndex.ts":
/*!***********************************!*\
  !*** ./js/blogIndex/blogIndex.ts ***!
  \***********************************/
/***/ (function() {

eval("var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nfunction convertCamelCaseToReadable(text) {\n    return __awaiter(this, void 0, void 0, function* () {\n        // i have no idea how this regex works\n        return new Promise((resolve) => {\n            resolve(text\n                .replace(/([a-z])([A-Z])/g, '$1 $2')\n                .replace(/(\\d{4}-\\d{2}-\\d{2})/g, ' $1')\n                .replace(/\\b\\w/g, c => c.toUpperCase()));\n        });\n    });\n}\nfunction blogIndex() {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (!document.getElementById('blogIndex') || !document.getElementById('latestPost'))\n            return;\n        document.getElementById('blogIndex').innerHTML = \"\";\n        document.getElementById('latestPost').innerHTML = \"\";\n        fetch(\"/blogindex.txt\")\n            .then(response => response.text())\n            .then(data => {\n            const uriList = data.split('\\n');\n            const filteredUriList = uriList.filter(entry => entry.trim() !== '');\n            const entries = filteredUriList.map(entry => {\n                const parts = entry.split(' ');\n                return { timestamp: parseInt(parts[0]), uri: parts[1] || '' };\n            });\n            entries.sort((a, b) => b.timestamp - a.timestamp);\n            const ulElement = document.createElement('ul');\n            entries.forEach((entry) => __awaiter(this, void 0, void 0, function* () {\n                if (entry.uri) {\n                    const fileName = entry.uri.split('/').pop().replace('.html', '');\n                    const readableName = `${yield convertCamelCaseToReadable(fileName)}`;\n                    if (fileName.toLowerCase() !== 'index') {\n                        const liElement = document.createElement('li');\n                        const aElement = document.createElement('a');\n                        const pElement = document.createElement('p');\n                        liElement.style.whiteSpace = \"nowrap\";\n                        pElement.style.gap = \"10px\";\n                        pElement.textContent = `${new Intl.DateTimeFormat(navigator.language).format(new Date(entry.timestamp * 1000))}⠀`;\n                        aElement.href = entry.uri.substring(entry.uri.indexOf('/blog/'));\n                        aElement.textContent = readableName;\n                        aElement.style.display = \"inline-block\";\n                        pElement.style.display = \"inline-block\";\n                        liElement.appendChild(pElement);\n                        liElement.appendChild(aElement);\n                        ulElement.appendChild(liElement);\n                    }\n                }\n            }));\n            document.getElementById('blogIndex').appendChild(ulElement);\n        })\n            .catch(error => {\n            console.error('Error fetching and processing blog index:', error);\n        });\n    });\n}\ndocument.addEventListener('DOMContentLoaded', blogIndex);\n\n\n//# sourceURL=webpack:///./js/blogIndex/blogIndex.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/blogIndex/blogIndex.ts"]();
/******/ 	
/******/ })()
;