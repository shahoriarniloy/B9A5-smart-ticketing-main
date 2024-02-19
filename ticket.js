const seatSelection = {};
let selectedSeat = 0;

const seatTable = document.getElementById('selectedSeatsTable');
const applyCouponButton = document.getElementById('applyCoupon');
const couponInput = document.getElementById('couponInput');
const couponElement = document.getElementById('coupon');
const seatLeftElement = document.getElementById('seatLeft');
const seatCountElement = document.getElementById('selectedSeat');
const totalPriceElement = document.getElementById('totalPrice');
const grandTotalElement = document.getElementById('grandTotal');
const phoneElement = document.getElementById('phone');
const submitElement = document.getElementById('submitButton');

const modal = document.getElementById('myModal');
const continueButton = document.getElementById('continueButton');

let totalPrice = 0;
let grandTotal = 0;

function addTicket(event) {
    if (event.target.id.match(/[A-J][1-4]/i)) {
        const elementId = event.target.id.toLowerCase();
        const element = document.getElementById(elementId);
        
       

        if (seatSelection[elementId]) {
            element.classList.remove('text-white', 'bg-green-500');
            element.classList.add('text-gray-400', 'bg-stone-50');
            delete seatSelection[elementId];
            selectedSeat--;
            removeSeatFromTable(elementId);
        } else {
            if (selectedSeat >= 4) {
                alert("You Can Purchase Maximum 4 Tickets");
                return;
            }
            element.classList.remove('text-gray-400', 'bg-stone-50');
            element.classList.add('text-white', 'bg-green-500');
            seatSelection[elementId] = true;
            selectedSeat++;
            addSeatToTable(elementId);
        }

        const remainingSeats = 40 - selectedSeat;
        seatLeftElement.textContent = `Number of remaining seats: ${remainingSeats}`;
        seatCountElement.textContent = `${selectedSeat}`;
        totalPrice = selectedSeat * 550;
        grandTotal = totalPrice;
        totalPriceElement.textContent = `${totalPrice}`;
        grandTotalElement.textContent = `${grandTotal}`;

        if (selectedSeat === 4) {
            couponElement.classList.remove('hidden');
        } else {
            couponElement.classList.add('hidden');
        }
    }
}

function addSeatToTable(seatId) {
    const row = seatTable.insertRow();
    const cellSeatId = row.insertCell();
    const cellClass = row.insertCell();
    const cellPrice = row.insertCell();

    cellSeatId.textContent = seatId.toUpperCase();
    cellClass.textContent = 'Economy';
    cellPrice.textContent = '550';
}

function removeSeatFromTable(seatId) {
    for (let i = 0; i < seatTable.rows.length; i++) {
        if (seatTable.rows[i].cells[0].textContent === seatId.toUpperCase()) {
            seatTable.deleteRow(i);
            break;
        }
    }
}

applyCouponButton.addEventListener('click', function () {
    const couponValue = couponInput.value.trim();

    if (isValidCoupon(couponValue)) {
        if(couponValue=== "NEW15"){
            grandTotal = (85 * grandTotal) / 100;
        }
        else {
            grandTotal = (80 * grandTotal) / 100;

        }
        grandTotalElement.textContent = `${grandTotal}`;
        couponElement.classList.add('hidden');
    }
    else {
        alert('Invalid Coupon!');
    }
});

function isValidCoupon(coupon) {
    return coupon === "NEW15" || coupon === "Couple 20";
}

phoneElement.addEventListener('input', function() {
    if (phoneElement.value.trim() !== '' && selectedSeat>0) {
        submitElement.disabled = false;
    } else {
        submitElement.disabled = true;
    }
});


submitElement.addEventListener('click', function() {
    openModal();
});


function openModal() {
    modal.style.display = "block";
}


continueButton.addEventListener('click', function() {
    modal.style.display = "none";
});

function scrollToSection() {
    var element = document.getElementById("buyTickets");
    element.scrollIntoView();
}




document.addEventListener('click', addTicket);
