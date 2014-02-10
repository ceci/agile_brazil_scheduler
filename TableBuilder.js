function TableBuilder() {

	function buildTableHead(date) {
		var thead = $("<thead>");
		var tr = $("<tr>");
		var firstColumn = $("<th>").attr("class", "day")
									.html(date.toLocaleDateString())
									.appendTo(tr);
		for (var i = 8; i <= 13; i++) {
			var td = $("<th>").attr("data-room", i).html("Sala "+ i).appendTo(tr);
		}
		tr.appendTo(thead);
		return thead;
	}

	function buildTableLine(date) {
		var tr = $("<tr>");
		var th = $("<th>").html(date.timeToJSON()).appendTo(tr);

		for (var i = 8; i <= 13; i++) {
			var td = $("<td>").attr("data-room", i)
						.attr("data-time", date.toJSON())
						.droppable({drop: addSessionToTable});
			td.appendTo(tr);
		}
		return tr;
	}

	this.buildCell = function(date, room) {
		return $("<td>").attr("data-room", room)
						.attr("data-time", date.toJSON())
						.droppable({drop: addSessionToTable, accept: ".notAllocated"});
	}

	function addSessionToTable(event, ui) {
		var sessionDiv = ui.draggable;
		var session = sessions[sessionDiv.html()];
		if (session.fitIn(this)){
			session.startTime = new Date($(this).attr("data-time"));
			session.room = parseInt($(this).attr("data-room"));
			session.positionYourself();
		}
		sessionDiv.remove();
	}

	this.build = function(date) {
		var table = $("<table>").attr("data-date", date.dateToJSON());

		buildTableHead(date).appendTo(table);
		while(date.getHours() < 19) {
			buildTableLine(date).appendTo(table);
			date.addHalfHour();
		}
		table.appendTo("#schedule");
	}
}
