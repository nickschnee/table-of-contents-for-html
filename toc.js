(function() {
    let headers = document.querySelectorAll('h2, h3, h4, h5, h6');  // Excluding h1
    let tocDiv = document.getElementById('toc-to-fill');
    if (!tocDiv) {
        console.error('No element with id="toc-to-fill" found.');
        return;
    }

    let counts = [0, 0, 0, 0, 0];  // For h2 through h6
    let lastLevel = 2;  // Starting at 2 for h2

    headers.forEach((header, index) => {
        let level = parseInt(header.tagName.slice(1));  // Extract the number from the tag name

        if (level > lastLevel) {
            counts[level - 2] = 0;  // Reset the counter for this level, considering the absence of h1
        }
        counts[level - 2]++;

        // Construct the numbering
        let numbering = counts.slice(0, level - 1).join('.');  // Adjust for h1 absence
        
        // Update the header in the document with the numbering
        let originalContent = header.textContent.replace('¶', '').trim(); // Save the original content without the pilcrow sign and trim any extra whitespace
        header.innerHTML = numbering + ' ' + originalContent;

        // Add an ID to the header for linking
        let id = 'toc_' + index;
        header.id = id;

        // Create the TOC entry
        let tocEntry = document.createElement('a');
        tocEntry.href = '#' + id;
        tocEntry.innerHTML = numbering + ' ' + originalContent;
        tocEntry.style.display = 'block';
        tocEntry.style.textIndent = (level - 2) * 20 + 'px';  // Adjust for h1 absence
        tocDiv.appendChild(tocEntry);
        
        lastLevel = level;
    });
})();
