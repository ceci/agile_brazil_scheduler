function Session(session) {
	this.id = session.id;
	this.room = session.room_id;
	this.roomspan = session.roomspan;
	if (session.detail_type == "AllHands"){
		this.roomspan = 6;
	}
	if (session.start_at)
		this.startTime = new Date(session.start_at);
	if (session.end_at)
		this.endTime = new Date(session.end_at);

	this.allocated = function() {
		return this.startTime && this.endTime;
	}

	this.positionYourself = function() {
		var td = $("[data-room='" + this.room + "']" +
					"[data-time='" + this.startTime.toJSON() + "']")
					.attr("colspan", this.roomspan);
		td.text(this.id);

		var cellToRemove = (this.roomspan - 1) + this.room;
		while (cellToRemove > this.room) {
			$("[data-room='" + cellToRemove + "']" +
				"[data-time='" + this.startTime.toJSON() + "']").remove();
			cellToRemove--;
		}
	}
}
