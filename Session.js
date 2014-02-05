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
		var div = $("<div>").addClass("session")
							.text(this.id)
							.draggable({helper: "clone"});
		div.appendTo(td);
		removeCells(this.roomspan - 1, this.room + 1, time);
		time.addHalfHour();
		for (var i = 1; i < this.timespan; i++) {
			removeCells(this.roomspan, this.room, time);
			time.addHalfHour();
		}
	}

	function removeCells(howMany, actualRoom, time) {
		var roomToBeRemoved = howMany + actualRoom - 1;
		while (roomToBeRemoved >= actualRoom) {
			var cell = $("[data-room='" + roomToBeRemoved + "']" +
				"[data-time='" + time.toJSON() + "']");
			cell.remove();
			roomToBeRemoved--;
		}
	}

	this.removeYourself = function() {
		var time = new Date(this.startTime.toJSON());
		var td = $("[data-room='" + this.room + "']" +
					"[data-time='" + time.toJSON() + "']");
		var tr = td.parent();
		td.remove();
		for (var i = 1; i <= this.timespan; i++) {
			this.recoverCellsFrom(tr, time);
			tr = tr.next();
			time.addHalfHour();
		}
		cleanSession();
	}

	var cleanSession = (function() {
		this.room = undefined;
		this.startTime = undefined;
		this.endTime = undefined;
	}).bind(this);

	this.recoverCellsFrom = function(line, time) {
		var tableBuilder = new TableBuilder();
		var lastRoom = this.roomspan + this.room - 1;
		for (var r = this.room; r <= lastRoom; r++) {
			var cell = tableBuilder.buildCell(time, r);
			placeCell(line, cell);
		}
	}

	function placeCell(line, cell) {
		var room = cell.attr("data-room");
		console.log("room number: " + room)
		for (var i =  room - 1; i >= 8; i--) {
			var object = line.find("[data-room='" + i + "']");
			if (object.is("td")) {
				cell.insertAfter(object);
				return;
			}
		}
		var th = line.find("th");
		cell.insertAfter(th);
	}
}
