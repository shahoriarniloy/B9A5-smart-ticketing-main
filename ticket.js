const seatSelection = {};
let selectedSeat =0;

function addTicket(event) {
    const elementId = event.target.id;
    const element = document.getElementById(elementId);
    const seatLeftElement = document.getElementById('seatLeft');

    if (seatSelection[elementId]) {
        element.classList.remove('text-white');
        
        let parentDiv = event.target.closest('div');
        parentDiv.classList.remove('bg-green-500');
        parentDiv.classList.add('bg-stone-50');

        selectedSeat--;

        seatSelection[elementId] = false; 
    } else {
        element.classList.add('text-white');
        
        let parentDiv = event.target.closest('div');
        parentDiv.classList.remove('bg-stone-50');
        parentDiv.classList.add('bg-green-500');
        selectedSeat++;

        seatSelection[elementId] = true; 
    }
    const remainingSeats = 40 - selectedSeat;
    seatLeftElement.textContent = 'Number of remaining seats: ${remainingSeats}';



}

document.addEventListener('click', addTicket);



