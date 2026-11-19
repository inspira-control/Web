# Inspira · Regalos personalizados

Aplicación web dinámica y responsiva para la tienda **Inspira**.

- **Frontend:** React 19 + Vite + Tailwind CSS 4 (carpeta `frontend/`)
- **Backend:** Django 5.2 + Django REST Framework + MySQL (carpeta `backend/`)
- **Colores:** lila `#8b68d9` y menta `#33aa80` · **Tipografías (Google Fonts):** Nunito y Pacifico

## Estructura

```
inspira/
├── backend/                  Django + MySQL (API)
│   ├── config/               settings.py, urls.py (configuración general)
│   ├── tienda/               models.py (Producto, Cliente), serializers.py, views.py, urls.py
│   ├── database.sql          Crea la base de datos "inspira"
│   ├── requirements.txt
│   ├── Procfile              Comando para el servidor (Railway / Render)
│   └── .env.example
├── frontend/                 React (.jsx)
│   ├── src/
│   │   ├── components/       Sidebar.jsx, Layout.jsx, Modal.jsx, Acciones.jsx, ...
│   │   ├── pages/            Inicio.jsx, Nosotros.jsx, MisionVision.jsx, Productos.jsx, Clientes.jsx
│   │   ├── hooks/useCrud.js  Lógica de agregar / editar / eliminar
│   │   ├── services/api.js   Conexión con la API de Django
│   │   └── config.js         WhatsApp, Facebook, Instagram, URL de la API
│   ├── netlify.toml
│   └── .env.example
└── .vscode/                  Extensiones recomendadas
```

Solo hay **2 tablas** propias: `productos` (nombre, descripción, precio, fecha de registro) y `clientes` (nombre, dirección, teléfono, fecha de nacimiento). Las demás tablas que verás en MySQL (`auth_*`, `django_*`) las crea Django automáticamente para su funcionamiento interno.

---

## 1. Lo que necesitas instalar (una sola vez)

| Programa | Para qué | Descarga |
|---|---|---|
| Visual Studio Code | Editar el proyecto | code.visualstudio.com |
| Python 3.10 o superior | Backend Django | python.org (en Windows marca **"Add Python to PATH"**) |
| Node.js 20 LTS o superior | Frontend React | nodejs.org |
| MySQL 8 (Community Server + Workbench) | Base de datos | dev.mysql.com/downloads/installer |
| Git | Subir a GitHub después | git-scm.com |

Al abrir la carpeta `inspira` en VS Code te sugerirá instalar las extensiones recomendadas (Python, Tailwind, React snippets, MySQL). Acéptalas.

## 2. Crear la base de datos MySQL

Abre **MySQL Workbench** (o la terminal de MySQL) con tu usuario `root` y ejecuta el archivo `backend/database.sql`, o simplemente:

```sql
CREATE DATABASE IF NOT EXISTS inspira CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 3. Levantar el backend (Django)

En VS Code abre una terminal (**Terminal > New Terminal**):

```bash
cd backend
python -m venv venv

# Activar el entorno virtual
venv\Scripts\activate          # Windows (PowerShell o CMD)
source venv/bin/activate       # Mac / Linux

pip install -r requirements.txt
```

> En Windows, si PowerShell no deja activar el entorno, ejecuta una vez:
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

Copia `.env.example` como `.env` y pon tu contraseña de MySQL:

```bash
copy .env.example .env         # Windows
cp .env.example .env           # Mac / Linux
```

```
DB_NAME=inspira
DB_USER=root
DB_PASSWORD=la_contraseña_de_tu_mysql
```

Crea las tablas y arranca el servidor:

```bash
python manage.py migrate
python manage.py createsuperuser   # opcional: para entrar a /admin
python manage.py runserver
```

Comprueba en el navegador: <http://127.0.0.1:8000/api/productos/> (debe mostrar `[]`).

## 4. Levantar el frontend (React)

Abre **otra** terminal en VS Code (botón `+`), sin cerrar la del backend:

```bash
cd frontend
npm install
copy .env.example .env         # Windows  (cp en Mac / Linux)
npm run dev
```

Abre <http://localhost:5173>. Ya puedes agregar, editar y eliminar productos y clientes.

En `frontend/.env` cambia también tus datos de contacto:

```
VITE_WHATSAPP_NUMBER=5215512345678     # 52 + 1 + número a 10 dígitos, sin espacios
VITE_FACEBOOK_URL=https://www.facebook.com/tu-pagina
VITE_INSTAGRAM_URL=https://www.instagram.com/tu-cuenta
```

(Cada vez que cambies el `.env` detén `npm run dev` con `Ctrl + C` y vuelve a ejecutarlo.)

## 5. Dónde cambiar cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Textos de Inicio / Nosotros / Misión y visión | `frontend/src/pages/*.jsx` |
| Opciones del menú lateral, botón de WhatsApp | `frontend/src/components/Sidebar.jsx` |
| Colores y tipografías | `frontend/src/index.css` (bloque `@theme`) e `index.html` (Google Fonts) |
| Campos de las tablas | `backend/tienda/models.py` y luego `python manage.py makemigrations` + `migrate` |
| Validaciones (precio, teléfono…) | `backend/tienda/serializers.py` |

---

## 6. Publicar la página: opciones

La idea es: **tu código en GitHub → cada `git push` desde VS Code actualiza la página publicada automáticamente**.

| Opción | Frontend | Backend Django | MySQL | Costo aprox. | Comentario |
|---|---|---|---|---|---|
| **A. Netlify + Railway** ⭐ | Netlify | Railway | Railway (MySQL nativo) | Netlify gratis · Railway ~5 USD/mes (tiene prueba gratis) | La más sencilla para Django + **MySQL**. Todo se despliega solo al hacer push. |
| B. Todo en Railway | Railway | Railway | Railway | ~5 USD/mes | Un solo panel. Bien si no quieres usar Netlify. |
| C. Netlify + Render | Netlify | Render (plan gratis se "duerme") | ❌ Render no ofrece MySQL; habría que usar uno externo (p. ej. Aiven) o cambiar a PostgreSQL | Gratis con limitaciones | Más piezas y te obliga a salir de MySQL. |
| D. GitHub Pages | Solo frontend | — | — | Gratis | No ejecuta Django; sirve solo para la parte visual. |

**Recomendación: opción A (GitHub + Netlify + Railway).** Netlify es ideal y gratuito para React; Railway es de los pocos que ofrece MySQL administrado y ejecuta Django sin configuraciones raras. GitHub es el puente: guarda tu código y dispara las actualizaciones.

### Pasos resumidos (opción A)

1. **GitHub:** crea un repositorio y sube la carpeta `inspira` (los `.env`, `venv` y `node_modules` ya están excluidos en `.gitignore`).
   ```bash
   git init
   git add .
   git commit -m "Primera versión de Inspira"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/inspira.git
   git push -u origin main
   ```
2. **Railway (backend + MySQL):**
   - New Project → *Deploy from GitHub repo* → elige el repo. En *Settings* pon **Root Directory = `backend`**.
   - En el mismo proyecto: *+ New → Database → MySQL*.
   - En el servicio del backend, pestaña *Variables*, agrega:
     - `DATABASE_URL` = `${{MySQL.MYSQL_URL}}` (referencia a la base de Railway)
     - `DJANGO_SECRET_KEY` = una clave larga y aleatoria
     - `DJANGO_DEBUG` = `False`
     - `DJANGO_ALLOWED_HOSTS` = el dominio que te da Railway (ej. `inspira-api.up.railway.app`)
     - `CORS_ALLOWED_ORIGINS` = la URL de Netlify (ej. `https://inspira.netlify.app`)
     - `CSRF_TRUSTED_ORIGINS` = `https://inspira-api.up.railway.app`
   - *Settings → Networking → Generate Domain*. El `Procfile` ya ejecuta las migraciones y arranca el servidor.
3. **Netlify (frontend):**
   - *Add new site → Import from GitHub* → elige el repo. **Base directory = `frontend`** (el resto lo toma de `netlify.toml`).
   - En *Environment variables* agrega `VITE_API_URL = https://inspira-api.up.railway.app/api` y tus datos de WhatsApp / redes.
4. Desde ese momento trabajas en VS Code en local y, cuando quieras publicar:
   ```bash
   git add .
   git commit -m "Describe tu cambio"
   git push
   ```
   Netlify y Railway detectan el push y actualizan la página en 1–3 minutos.

> **Importante:** la base de datos local (tu MySQL) y la publicada (Railway) son distintas. Los productos que registres en local no aparecen en la página publicada, y viceversa. Es lo normal: local es para probar.

> **Seguridad:** por ahora cualquier persona que entre a la página publicada puede agregar, editar o eliminar registros. Antes de compartir la dirección conviene agregar un inicio de sesión para la parte de administración.

## Problemas comunes

- **"No se pudo conectar con el servidor"** en la página: el backend no está corriendo, o `VITE_API_URL` apunta a otra dirección.
- **`Access denied for user 'root'`**: revisa `DB_PASSWORD` en `backend/.env`.
- **`Unknown database 'inspira'`**: falta el paso 2.
- **Error de CORS en la consola del navegador**: agrega la URL del frontend a `CORS_ALLOWED_ORIGINS`.
