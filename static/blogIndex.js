function blogIndex() {
    document.getElementById('blogIndex').innerHTML = null;

    fetch('/blogindex.txt')

    .then(response => response.text())
    .then(data => {
        const uriList = data.split('\n');
        const ulElement = document.createElement('ul');

        uriList.forEach(uri => {
            const name = uri.split('/').pop().replace('.html', ''); 

            if (name.toLowerCase() !== 'index') {
                const liElement = document.createElement('li');
                const aElement = document.createElement('a');

                aElement.href = uri;
                aElement.textContent = name;
                liElement.appendChild(aElement);
                ulElement.appendChild(liElement);
            }
        });

        document.getElementById('blogIndex').appendChild(ulElement);
    })
    .catch(error => {
        console.error('Error fetching blog index:', error);
    });
}