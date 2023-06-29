// Your code here
const createEmployeeRecord = (record) => {
  // record parameter is an array with 4 elements
  const obj = {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return obj;
};

const createEmployeeRecords = (records) => {
  // records is array of arrays
  const objs = records.map((record) => createEmployeeRecord(record));
  return objs;
};

const createTimeInEvent = (bpRecord, date) => {
  const [d, h] = date.split(" ");

  const timeInEvent = {
    type: "TimeIn",
    hour: Number.parseInt(h),
    date: d,
  };
  bpRecord.timeInEvents.push(timeInEvent);
  return bpRecord;
};

const createTimeOutEvent = (bpRecord, date) => {
  const [d, h] = date.split(" ");

  const timeOutEvent = {
    type: "TimeOut",
    hour: Number.parseInt(h),
    date: d,
  };
  bpRecord.timeOutEvents.push(timeOutEvent);
  return bpRecord;
};

const hoursWorkedOnDate = (bpRecord, date) => {
  const timeIn = bpRecord.timeInEvents.find((ob) => ob.date === date).hour;
  const timeOut = bpRecord.timeOutEvents.find((ob) => ob.date === date).hour;
  return Math.abs(timeOut - timeIn) / 100;
};

const wagesEarnedOnDate = (bpRecord, date) => {
  const numberOfHoursWorked = hoursWorkedOnDate(bpRecord, date);
  return numberOfHoursWorked * bpRecord.payPerHour;
};

const allWagesFor = (bpRecord) => {
  const totalWages = bpRecord.timeOutEvents
    .map((date) => wagesEarnedOnDate(bpRecord, date.date))
    .reduce((total, amout) => (total += amout), 0);
  console.log(totalWages);
  return totalWages;
};

const calculatePayroll = (employees) => {
  const payRoll = employees.reduce(
    (total, employee) => total + allWagesFor(employee),
    0
  );
  return payRoll;
};
