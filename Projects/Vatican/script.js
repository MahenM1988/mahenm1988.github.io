document.addEventListener('DOMContentLoaded', function() {
    const verseDisplay = document.getElementById('verse-display');
    const referenceInput = document.getElementById('reference-input');
    const submitBtn = document.getElementById('submit-btn');
    const hintDisplay = document.getElementById('hint');
    
    let verses = [];
    let currentVerseIndex = -1;

    fetch('verses.json')
        .then(response => response.json())
        .then(data => {
            verses = data;
            showRandomVerse();
        })
        .catch(error => console.error('Error loading verses.json:', error));
    
    function showRandomVerse() {
        currentVerseIndex = Math.floor(Math.random() * verses.length);
        const verse = verses[currentVerseIndex];
        verseDisplay.textContent = verse.text;
        hintDisplay.textContent = '';
        referenceInput.value = '';
        referenceInput.focus();
    }

    function checkReference() {
        const userReference = referenceInput.value.trim();
        const correctReference = verses[currentVerseIndex].reference;

        if (userReference === correctReference) {
            verseDisplay.textContent = '"Hitherto shall thou come, but no further!" - JOB 38:11';
            hintDisplay.textContent = '';
            setTimeout(showRandomVerse, 5000); // Show a new verse after a 5-second delay
        } else {
            hintDisplay.textContent = `Hint: The correct reference is ${correctReference}`;
            setTimeout(showRandomVerse, 5000); // Show a new verse after a 5-second delay
        }
    }

    submitBtn.addEventListener('click', checkReference);

    referenceInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission or other default behavior
            checkReference();
        }
    });
});
