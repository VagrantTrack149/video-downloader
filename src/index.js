const express = require('express');
const ytdl = require('ytdl-core');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join("D:/Xammp/htdocs/VideoDownloader/src", '/'));

// Configurar la carpeta pública para archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join("D:/Xammp/htdocs/VideoDownloader/src", 'css')));
app.use(express.static(path.join("D:/Xammp/htdocs/VideoDownloader/src", 'js')));

app.get('/', (req, res) => {
    res.render('vista', {
        title: 'Descargar Videos de YouTube',
        description: 'Ingresa la URL del video de YouTube que deseas descargar.'
    });
});

// Ruta para manejar la descarga del video
app.post('/download', (req, res) => {
    const videoUrl = req.body.url;
    if (ytdl.validateURL(videoUrl)) {
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');

        ytdl(videoUrl, {
            filter: (format) => format.container === 'mp4' && format.qualityLabel === '480p'
        }).pipe(res);
        
    } else {
        res.status(400).json({ error: 'URL inválida' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
