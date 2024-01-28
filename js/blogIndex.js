function convertCamelCaseToReadable(text) {
    return text
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/(\d{4}-\d{2}-\d{2})/g, ' $1')
      .replace(/\b\w/g, c => c.toUpperCase());
}

function blogIndex() {
    document.getElementById('blogIndex').innerHTML = null;
    document.getElementById('latestPost').innerHTML = null;


    fetch('/blogindex.txt')
    .then(response => response.text())
    .then(data => {
      const uriList = data.split('\n');
      const filteredUriList = uriList.filter(entry => entry.trim() !== '');

      const entries = filteredUriList.map(entry => {
        const parts = entry.split(' ');
        return { timestamp: parseInt(parts[0]), uri: parts[1] || '' };
      });

      entries.sort((a, b) => b.timestamp - a.timestamp);
      const ulElement = document.createElement('ul');
  
      entries.forEach(entry => {
        if (entry.uri) {
          const fileName = entry.uri.split('/').pop().replace('.html', '');

          const readableName = convertCamelCaseToReadable(fileName);
  
          if (fileName.toLowerCase() !== 'index') {
            const liElement = document.createElement('li');
            const aElement = document.createElement('a');

            aElement.href = entry.uri.substring(entry.uri.indexOf('/blog/'));
            aElement.textContent = readableName;
            liElement.appendChild(aElement);
            ulElement.appendChild(liElement);
          }
        }
      });

      document.getElementById('blogIndex').appendChild(ulElement);
    })
    .catch(error => {
      console.error('Error fetching and processing blog index:', error);
    });
}