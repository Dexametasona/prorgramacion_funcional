const clear = () => console.clear();
const ConsoleLog = (time: string) => console.log(time);
const currentTime = () => new Date();
const oneSecond = () => 1000;

const runSequantialFunctions =
  (...functions: Function[]) =>
  (fisrtValue: any) =>
    functions.reduce((value, transform) => transform(value), fisrtValue);

interface objectTimeFormat {
  hour: number;
  min: number;
  seg: number;
  amPm?: string;
}
type objectStringTimeFormat = {
  [K in keyof objectTimeFormat]: string;
};

const getObjectTime = (time: Date) => ({
  hour: time.getHours(),
  min: time.getMinutes(),
  seg: time.getSeconds(),
});

const toCivilianHour = (time: objectTimeFormat) => ({
  ...time,
  hour: time.hour > 12 ? time.hour - 12 : time.hour,
});

const appendAmPm = (time: objectTimeFormat) => ({
  ...time,
  amPm: time.hour > 12 ? "PM" : "AM",
});

const prependZero = (field: string) => (time: objectTimeFormat) => ({
  ...time,
  [field]: time[field] < 10 ? `0${time[field]}` : `${time[field]}`,
});

const display = (pureFunction: Function) => (value: string) =>
  pureFunction(value);

const formatObjectTimetoString =
  (formatString: string) => (time: objectStringTimeFormat) =>
    formatString
      .replace("hh", time.hour)
      .replace("mm", time.min)
      .replace("ss", time.seg)
      .replace("tt", time.amPm!)

const toCivilianAndAMPMHour = (time: objectTimeFormat) =>
  runSequantialFunctions(appendAmPm, toCivilianHour)(time);

const doubleDigitFormat = (civilianTime: objectTimeFormat) =>
  runSequantialFunctions(
    prependZero("hour"),
    prependZero("min"),
    prependZero("seg")
  )(civilianTime);

const startTimer = () =>
  setInterval(
    runSequantialFunctions(
      clear,
      currentTime,
      getObjectTime,
      toCivilianAndAMPMHour,
      doubleDigitFormat,
      formatObjectTimetoString("hh:mm:ss tt"),
      display(ConsoleLog)
    ),
    oneSecond()
  );

  startTimer();