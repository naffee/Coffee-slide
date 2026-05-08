document.addEventListener('DOMContentLoaded', () => {
    const drinks = document.querySelectorAll('.drink');
    const nameEl = document.getElementById('drink-name');
    const priceEl = document.getElementById('drink-price');
    const descEl = document.getElementById('drink-description');
    let currentIndex = 0;
    let lastIndex = 0;
    let isDragging = false;
    let startX = 0;

    function updateDrink(index) {
        drinks.forEach((drink, i) => {
            drink.classList.remove('active', 'prev', 'next');
            if (i === index) {
                drink.classList.add('active');
            } else if (i < index) {
                drink.classList.add('prev');
            } else {
                drink.classList.add('next');
            }
        });

        const activeDrink = drinks[index];
        
        // Update Content
        nameEl.textContent = activeDrink.dataset.name;
        priceEl.textContent = activeDrink.dataset.price;
        descEl.textContent = activeDrink.dataset.description;
        
        // Animate text based on direction
        const directionClass = index > lastIndex ? 'text-slide-up' : 'text-slide-down';
        
        [nameEl, priceEl, descEl].forEach(el => {
            el.classList.remove('text-slide-up', 'text-slide-down');
            void el.offsetWidth; // Force reflow
            el.classList.add(directionClass);
        });

        lastIndex = index;
    }

    function nextDrink() {
        if (currentIndex < drinks.length - 1) {
            currentIndex++;
            updateDrink(currentIndex);
        } else {
            // Optional: loop back to start
            currentIndex = 0;
            updateDrink(currentIndex);
        }
    }

    function prevDrink() {
        if (currentIndex > 0) {
            currentIndex--;
            updateDrink(currentIndex);
        } else {
            // Optional: loop to end
            currentIndex = drinks.length - 1;
            updateDrink(currentIndex);
        }
    }

    // Touch and Mouse Events for Swiping
    const handleStart = (e) => {
        isDragging = true;
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    };

    const handleEnd = (e) => {
        if (!isDragging) return;
        const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const diff = startX - endX;

        // More sensitive threshold for easier swiping (30px instead of 50px)
        if (Math.abs(diff) > 30) {
            if (diff > 0) {
                nextDrink();
            } else {
                prevDrink();
            }
        }
        isDragging = false;
    };

    window.addEventListener('mousedown', handleStart);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('mouseleave', handleEnd);
    window.addEventListener('touchstart', handleStart);
    window.addEventListener('touchend', handleEnd);

    // Button Listeners
    document.querySelector('.prev-btn').addEventListener('click', prevDrink);
    document.querySelector('.next-btn').addEventListener('click', nextDrink);

    // Initial load
    updateDrink(currentIndex);
});
