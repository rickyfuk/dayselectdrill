$(document).ready(function () {
	var nowDateTime = moment();
	var nowHour = moment(nowDateTime).hour();
	var nowYear = moment(nowDateTime).year();
	console.log(nowHour);
	var nowDate = moment(nowDateTime).format('dddd, MMMM Do YYYY');
	console.log(nowDate);
	// var nowDateSave = moment(nowDateTime).format('MMMM Do YYYY');
	var selectDate = nowDateTime;
	console.log(selectDate);
	var selectDisplayDate = moment(selectDate).format('dddd, MMMM Do YYYY');
	var selectDateSave = moment(selectDate).format('MMMM Do YYYY');
	var selectDateArray = [];
	var maxday = 0;

	let yearCount = nowYear;
	for (let m = 0; m < nowYear - 1899; m++) {
		createYearList(yearCount);
		yearCount--;
	}

	createYearList();

	function createYearList() {
		var option1 = document.createElement('option');
		$(option1).text(yearCount);
		option1.setAttribute('value', yearCount);
		$('#yearSelection').append(option1);
	}

	function createDateList(dateCount) {
		var option2 = document.createElement('option');
		$(option2).text(dateCount);
		option2.setAttribute('value', dateCount);
		$('#dateSelection').append(option2);
	}

	var selectYear = moment(nowDateTime).year();
	// when the year selection is change
	$('#yearSelection').change(function () {
		selectDateArray = [];
		console.log(selectDateArray);
		// the selected year will drop into the selectedDateArray-year position
		selectYear = $('#yearSelection').val();
		selectDateArray[0] = selectYear;
		console.log(selectDateArray);
		// enable the month selection
		$('#monthSelection').removeAttr('disabled');
		$('#monthSelection').change(function () {
			// the selected month will drop into the selectedDateArray-month position
			selectDateArray[1] = $('#monthSelection').val();
			console.log(selectDateArray);
			// enable the date selection
			$('#dateSelection').removeAttr('disabled');
			// empty the date coloum (in case the user click the month mulitple times)
			$('#dateSelection').empty();
			// find out the date for the month and put the date into the selection box
			maxday = moment(selectDateArray).daysInMonth();
			console.log(maxday);
			// recreate the "Choose Date" heading as the drop down is empty
			var option2 = document.createElement('option');
			$(option2).text('Choose Date');
			option2.setAttribute('value', '');
			option2.setAttribute('disabled', true);
			option2.setAttribute('selected', true);
			$('#dateSelection').append(option2);
			// for loop to load the date into the selection list
			for (n = 0; n < maxday; n++) {
				createDateList(n + 1);
			}
			// when the date is selected, put the date into the selectedDateArray-date position
			$('#dateSelection').change(function () {
				selectDateArray[2] = $('#dateSelection').val();
				console.log(selectDateArray);
				selectDate = moment(selectDateArray);
				selectDisplayDate = moment(selectDate).format('dddd, MMMM Do YYYY');
				selectDateSave = moment(selectDate).format('MMMM Do YYYY');
				$('#currentDay').empty();
				$('#currentDay').append(selectDisplayDate);
				$('#yearSelection').val('');
				$('#monthSelection').val('');
				$('#dateSelection').val('');
				$('#monthSelection').attr('disabled', true);
				$('#dateSelection').attr('disabled', true);
				// console.log(selectDate);
				// console.log(selectDisplayDate);
				// console.log(selectDateSave);
			});
		});
	});
});
