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
		var tr = $("<tr>").attr("class", "30minutes");
		var th = $("<th>").html(date.timeToJSON()).appendTo(tr);

		for (var i = 8; i <= 13; i++) {
			var td =   $("<td>").attr("data-room", i)
								.attr("data-time", date.toJSON())
								.appendTo(tr);
		}
		return tr;
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
