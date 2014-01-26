Date.prototype.addHalfHour = function() {
	this.setTime(this.getTime() + 30 * 60 * 1000);
};
Date.prototype.dateToJSON = function() {
	return this.toJSON().substring(0, 11);
};
Date.prototype.timeToJSON = function() {
	return this.toLocaleTimeString().substring(0,5);
};
Date.prototype.halfHoursUntil = function(otherTime) {
	var hour = new Date(this);
	var numberOfHalfHours = 0;
	while (hour < otherTime) {
		numberOfHalfHours++;
		hour.addHalfHour();
	}
	return numberOfHalfHours;
};
