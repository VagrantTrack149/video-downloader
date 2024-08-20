import express from 'express';
import morgan from 'morgan';
const app = express();

app.set('view engine','ejs');
app.set('views','D:/Documentos/Videodownloader/src/')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('D:/Documentos/Sistemas de información/Videodownloader/src/css/'));
// Rutas
app.use('/', inicioRoutes);
app.use(morgan('dev'));
export default app;