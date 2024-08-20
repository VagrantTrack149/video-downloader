function downloadVideo() {
    const url = document.getElementById('videoUrl').value;
    if (url) {
        fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        })
        .then(response => response.blob())
        .then(blob => {
            const a = document.createElement('a');
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = 'video.mp4';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            document.getElementById('message').innerText = 'Error al descargar el video';
        });
    } else {
        document.getElementById('message').innerText = 'Por favor, ingresa una URL válida';
    }
}
