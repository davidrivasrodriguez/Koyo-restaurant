document.addEventListener('DOMContentLoaded', function() {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.querySelector('.current-month');
    const prevButton = document.querySelector('.calendar-nav.prev');
    const nextButton = document.querySelector('.calendar-nav.next');
    
    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;
    let selectedGuests = null;

    function generateCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        currentMonthElement.textContent = new Date(year, month).toLocaleString('default', { 
            month: 'long', 
            year: 'numeric' 
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        calendarDays.innerHTML = '';
        
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day';
            calendarDays.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = day;
            
            const currentDay = new Date(year, month, day);
            if (currentDay < new Date().setHours(0,0,0,0)) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.addEventListener('click', () => selectDate(currentDay, dayElement));
            }
            
            calendarDays.appendChild(dayElement);
        }
    }

    function selectDate(date, element) {
        document.querySelectorAll('.day.selected').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        selectedDate = date;
        document.getElementById('selectedDate').value = date.toISOString().split('T')[0];
    }

    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.time-btn.selected').forEach(el => el.classList.remove('selected'));
            btn.classList.add('selected');
            selectedTime = btn.textContent;
            document.getElementById('selectedTime').value = selectedTime;
        });
    });

    document.querySelectorAll('.guest-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.guest-btn.selected').forEach(el => el.classList.remove('selected'));
            btn.classList.add('selected');
            selectedGuests = btn.textContent;
            document.getElementById('selectedGuests').value = selectedGuests;
        });
    });

    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });

    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });

    document.getElementById('reservationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!selectedDate || !selectedTime || !selectedGuests) {
            alert('Please select date, time, and number of guests');
            return;
        }

        const formData = {
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime,
            guests: selectedGuests,
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value
        };

        alert(`Reservation received for ${formData.guests} guests on ${formData.date} at ${formData.time}`);
    });

    generateCalendar(currentDate);
});