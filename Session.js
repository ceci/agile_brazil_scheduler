function Session(session) {
	this.id = session.id;
	this.room = session.room_id;
	this.roomspan = session.roomspan;
	if (session.detail_type == "AllHands")
		this.roomspan = 6;

	if (session.start_at)
		this.startTime = new Date(session.start_at);
	if (session.end_at)
		this.endTime = new Date(session.end_at);
	this.timespan = this.startTime.halfHoursUntil(this.endTime);

	this.allocated = function() {
		return this.startTime && this.endTime;
	}

	this.positionYourself = function() {
		var time = new Date(this.startTime.toJSON());
		var td = $("[data-room='" + this.room + "']" +
					"[data-time='" + time.toJSON() + "']")
					.attr("colspan", this.roomspan)
					.attr("rowspan", this.timespan);
		td.text(this.id);
		removeCells(this.roomspan - 1, this.room + 1, time);
		time.addHalfHour();
		for (var i = 1; i < this.timespan; i++) {
			removeCells(this.roomspan, this.room, time);
			time.addHalfHour();
		}
	}

	function removeCells(howMany, actualRoom, time) {
		var roomToBeRemoved = howMany + actualRoom - 1;
		while (roomToBeRemoved >=	 actualRoom) {
			console.log("=== Removing cell " + time + " from " + roomToBeRemoved);
			var cell = $("[data-room='" + roomToBeRemoved + "']" +
				"[data-time='" + time.toJSON() + "']");
			console.log(cell);
			cell.remove();
			roomToBeRemoved--;
		}
	}
}
