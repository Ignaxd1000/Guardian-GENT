# Guardian-GENT

Mi proyecto final/integrador para Generación T, orientado a lo que me estoy especializando por mi cuenta (ciberseguridad).

Guardian-GENT es una aplicación web educativa para evaluar y mejorar la seguridad de tus contraseñas. Está desarrollada en React y utiliza Web Crypto API, siguiendo buenas prácticas de privacidad y seguridad.

---

### Links

- **Pagina**: [https://ignaxd1000.github.io/Guardian-GENT/](https://ignaxd1000.github.io/Guardian-GENT/)
- **Trello**: [https://trello.com/b/x0nPFlzh/guardian-gent](https://trello.com/b/x0nPFlzh/guardian-gent)

---

## Características principales

- **Evaluación de contraseñas**: Calcula la fortaleza de la contraseña y muestra recomendaciones para mejorarla.
- **Verificación contra brechas (HIBP)**: Consulta la API de Have I Been Pwned usando k-anonymity.
- **Generador de contraseñas seguras**: Genera contraseñas permitiendo personalizar la longitud y el tipo de caracteres.
- **Modo oscuro**: Cambia el tema de la interfaz según preferencia del usuario o del sistema.
- **Privacidad**: Nada se almacena, las contraseñas no se envían nunca completas.

---

## Estructura del proyecto

```
src/
  App.jsx
  styles.css
  components/
    Generator.jsx
    PasswordStrength.jsx
    BreachCheck.jsx
  utils/
    crypto.js
public/
  index.html
```

---

## Tecnologías usadas

- React
- JavaScript (ES6+)
- CSS moderno (variables, color-scheme)
- Web Crypto API
- HaveIBeenPwned API (k-anonymity)

---

## Notas de privacidad

- La contraseña se evalúa y procesa **localmente**.
- Para la verificación en brechas, solo se envía un prefijo hash SHA-1 (no la contraseña completa).
- No se guarda información sensible.

---

## Aporte y licencia

- Pull requests y sugerencias son bienvenidos.
- Licencia: MIT

---

## Autor

Ignaxd1000  
[github.com/Ignaxd1000](https://github.com/Ignaxd1000)
