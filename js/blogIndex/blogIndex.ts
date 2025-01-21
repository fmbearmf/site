async function convertCamelCaseToReadable(text: string): Promise<string> {
  // i have no idea how this regex works
  return new Promise<string>((resolve) => {
    resolve(text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/(\d{4}-\d{2}-\d{2})/g, ' $1')
    .replace(/\b\w/g, c => c.toUpperCase()))
  });
}

async function blogIndex(): Promise<void> {
  if (!document.getElementById('blogIndex') || !document.getElementById('latestPost')) return;

  document.getElementById('blogIndex')!.innerHTML = "";
  document.getElementById('latestPost')!.innerHTML = "";

  fetch("/blogindex.txt")
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

      entries.forEach(async entry => {
        if (entry.uri) {
          const fileName = entry.uri.split('/').pop()!.replace('.html', '');

          const readableName = `${await convertCamelCaseToReadable(fileName)}`;

          if (fileName.toLowerCase() !== 'index') {
            const liElement = document.createElement('li');
            const aElement = document.createElement('a');
            const pElement = document.createElement('p');

            liElement.style.whiteSpace = "nowrap";
            pElement.style.gap = "10px";

            pElement.textContent = `${new Intl.DateTimeFormat(navigator.language).format(new Date(entry.timestamp * 1000))}⠀`;
            aElement.href = entry.uri.substring(entry.uri.indexOf('/blog/'));
            aElement.textContent = readableName;

            aElement.style.display = "inline-block";
            pElement.style.display = "inline-block";

            liElement.appendChild(pElement);
            liElement.appendChild(aElement);
            ulElement.appendChild(liElement);
          }
        }
      });

      document.getElementById('blogIndex')!.appendChild(ulElement);
    })
    .catch(error => {
      console.error('Error fetching and processing blog index:', error);
    });
}

document.addEventListener('DOMContentLoaded', blogIndex);