function convertCamelCaseToReadable(text) {
    return text
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Convert camelCase to separate words
      .replace(/(\d{4}-\d{2}-\d{2})/g, ' $1') // Add space before date-like patterns
      .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize each word
}

function blogIndex() {
    document.getElementById('blogIndex').innerHTML = null;
    document.getElementById('latestPost').innerHTML = null;


    fetch('/blogindex.txt')
    .then(response => response.text())
    .then(data => {
      // Split the data into an array of timestamped URIs
      const uriList = data.split('\n');
  
      // Remove any empty lines
      const filteredUriList = uriList.filter(entry => entry.trim() !== '');
  
      // Create an array of objects with timestamp and URI properties
      const entries = filteredUriList.map(entry => {
        const parts = entry.split(' ');
        return { timestamp: parseInt(parts[0]), uri: parts[1] || '' };
      });
  
      // Sort the entries by timestamp in descending order (latest first)
      entries.sort((a, b) => b.timestamp - a.timestamp);
  
      // Create an unordered list element
      const ulElement = document.createElement('ul');
  
      // Iterate through the sorted entries and extract pretty names, excluding the index page
      entries.forEach(entry => {
        // Check if the URI is defined before processing
        if (entry.uri) {
          // Extract the file name without extension
          const fileName = entry.uri.split('/').pop().replace('.html', '');

          const readableName = convertCamelCaseToReadable(fileName);
  
          // Exclude the index page
          if (fileName.toLowerCase() !== 'index') {
            // Create list items with links using relative paths
            const liElement = document.createElement('li');
            const aElement = document.createElement('a');
            // Use a relative link instead of the full URI
            aElement.href = entry.uri.substring(entry.uri.indexOf('/blog/'));
            aElement.textContent = readableName;
            liElement.appendChild(aElement);
            ulElement.appendChild(liElement);
          }
        }
      });
  
      // Append the unordered list to the blogIndex div
      document.getElementById('blogIndex').appendChild(ulElement);
    })
    .catch(error => {
      console.error('Error fetching and processing blog index:', error);
    });
}