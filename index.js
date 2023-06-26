// Your code here
const createEmployeeRecord = (employeeData) => {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  };
  
  const createEmployeeRecords = (employeesData) => {
    return employeesData.map(createEmployeeRecord);
  };
  
  const createTimeInEvent = (employee, dateTime) => {
    const [date, hour] = dateTime.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employee;
  };
  
  const createTimeOutEvent = (employee, dateTime) => {
    const [date, hour] = dateTime.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employee;
  };
  
  const hoursWorkedOnDate = (employee, date) => {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  };
  
  const wagesEarnedOnDate = (employee, date) => {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  };
  
  const allWagesFor = (employee) => {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const wages = datesWorked.map(date => wagesEarnedOnDate(employee, date));
    return wages.reduce((total, wage) => total + wage, 0);
  };
  
  const calculatePayroll = (employees) => {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  };
  
