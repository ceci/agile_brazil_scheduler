function Session(session) {
	this.id = session.id;
	this.room = session.room_id;

	if (session.start_at)
		this.startTime = new Date(session.start_at);
	if (session.end_at)
		this.endTime = new Date(session.end_at);

	this.allocated = function() {
		return this.startTime && this.endTime;
	}

	this.positionYourself = function() {
		var td = $("[data-room='" + this.room + "'][data-time='" + this.startTime.toJSON() + "']");
		td.text(this.id);
	}
}
