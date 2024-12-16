document.getElementById('toggle-doors').addEventListener('click', function() {
    const doors = ['door1', 'door2', 'door3'];
    const prizeDoor = Math.floor(Math.random() * 3); // Randomly select the prize door

    doors.forEach((doorId, index) => {
        const door = document.getElementById(doorId);
        const parent = door.parentNode;

        if (door.src.includes('CERRADA.png')) {
            door.src = 'images/ABIERTA.png';
            const prizeOrGoat = document.createElement('img');
            prizeOrGoat.src = index === prizeDoor ? 'images/car.png' : 'images/goat.png';
            prizeOrGoat.classList.add('behind-door');
            parent.insertBefore(prizeOrGoat, door);
        } else {
            door.src = 'images/CERRADA.png';
            const previousSibling = door.previousSibling;
            if (previousSibling && previousSibling.classList.contains('behind-door')) {
                previousSibling.remove();
            }
        }
    });
});