var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var clearConsole = function () { return console.clear; };
var ConsoleLog = function (time) { return console.log(time); };
var currentTime = function () { return new Date(); };
var oneSecond = function () { return 1000; };
var runSequantialFunctions = function () {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i] = arguments[_i];
    }
    return function (fisrtValue) {
        return functions.reduce(function (value, transform) { return transform(value); }, fisrtValue);
    };
};
var getObjectTime = function (time) { return ({
    hour: time.getHours(),
    min: time.getMinutes(),
    seg: time.getSeconds(),
}); };
var toCivilianHour = function (time) { return (__assign(__assign({}, time), { hour: time.hour > 12 ? time.hour - 12 : time.hour })); };
var appendAmPm = function (time) { return (__assign(__assign({}, time), { amPm: time.hour > 12 ? "PM" : "AM" })); };
var prependZero = function (field) { return function (time) { return (__assign(__assign({}, time), { field: time[field] < 10 ? "0".concat(time[field]) : "".concat(time[field]) })); }; };
var display = function (pureFunction) { return function (value) {
    return pureFunction(value);
}; };
var formatObjectTimetoString = function (formatString) { return function (time) {
    return formatString
        .replace("hh", time.hour)
        .replace("mm", time.min)
        .replace("ss", time.seg);
}; };
var toCivilianAndAMPMHour = function (time) {
    return runSequantialFunctions(appendAmPm, toCivilianHour)(time);
};
var doubleDigitFormat = function (civilianTime) {
    return runSequantialFunctions(prependZero("hh"), prependZero("mm"), prependZero("ss"))(civilianTime);
};
var startTimer = function () {
    return setInterval(runSequantialFunctions(clearConsole, currentTime, toCivilianAndAMPMHour, doubleDigitFormat, formatObjectTimetoString, display(ConsoleLog)), oneSecond());
};
startTimer();
