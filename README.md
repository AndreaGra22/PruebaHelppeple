## Prueba técnica  QA — HelpPeople

    Automatización web con Playwright Test, Node.js, JavaScript y Chromium, usando SauceDemo como aplicación de práctica.

  ##  Objetivo y alcance

        La solución automatiza seis escenarios UI, organizados en Page Objects y ejecutables desde consola. El objetivo es demostrar cobertura basada en riesgo, pruebas independientes, configuración por ambiente, diagnóstico con evidencias y decisiones de calidad.

        Se eligió SauceDemo porque ofrece un inventario, inicio de sesión de demostración, carrito y checkout, sin conexión a HelpPeople ni uso de datos internos.

  ##  Reglas de negocio cubiertas

        Un usuario estándar puede iniciar sesión y consultar el inventario.
	Un usuario bloqueado no puede iniciar sesión y recibe un mensaje de rechazo.
	Un usuario puede agregar un producto al carrito y recorrer el flujo de compra.
	El formulario del checkout impide continuar cuando falta un dato obligatorio.
	Al retirar un producto, este debe desaparecer del carrito y el contador debe reflejar el cambio.
	El catálogo puede ordenarse por precio ascendente.

    Limitación importante: SauceDemo es un sitio de demostración de terceros. Este proyecto valida el recorrido de compra desde UI, el resumen y la confirmación final. La aplicación no proporciona un endpoint público de pedidos ni un historial adecuado para comprobar persistencia externa después de cerrar la sesión. No se declara cobertura API ni persistencia backend que no se haya verificado.

  ##  Requisitos

       - Node.js 20 o superior; se recomienda una versión LTS compatible.
        npm incluido con Node.js.
       - Acceso a Internet para instalar dependencias y abrir SauceDemo.
       - Chromium instalado mediante Playwright.

   ## Instalación
        Clona el repositorio o abre la carpeta del proyecto en Visual Studio Code. Ejecuta los comandos desde la raíz, donde se encuentra package.json.
            npm ci
            npx playwright install chromium

  ## Variables necesarias

El archivo .env.example debe incluir, como mínimo, las siguientes variables:

- Ambiente de pruebas
TEST_ENV=demo
BASE_URL_DEMO=https://www.saucedemo.com

- Perfil alternativo de ejemplo (no es un ambiente funcional)
BASE_URL_EXAMPLE=https://example.invalid

- Usuario de demostración con acceso permitido
SAUCE_STANDARD_USER=standard_user
SAUCE_STANDARD_PASSWORD=secret_sauce

- Usuario de demostración bloqueado
SAUCE_LOCKED_USER=locked_out_user
SAUCE_LOCKED_PASSWORD=secret_sauce

  ##  Casos de prueba

        QA01	
            Acceso válido	      
            P1	
            Smoke y Regression	
            Abre inventario, título y productos visibles
        QA02	
            Rechazo de usuario bloqueado	
            P1	
            Smoke y Regression	
            Mensaje de bloqueo y no entra al inventario
        QA03	
            Compra de un producto	
            P1	
            Smoke y Regression	
            Producto en resumen y confirmación de compra
        QA04	
            Checkout con datos obligatorios vacíos	
            P1	
            Regression	
            Muestra validación y no avanza
        QA05	
            Retirar un producto	
            P2	Regression	
            Producto ausente y contador actualizado
        QA06	
            Ordenar por precio	
            P2	
            Regression	Precios ordenados numéricamente de menor a mayor

    Cada prueba debe crear su propio contexto de navegador y preparar sus datos; no debe depender del resultado ni del orden de otra prueba. Para localizar los elementos se priorizan atributos estables data-test, roles y nombres accesibles. Las aserciones comprueban estado y contenido, no solo que un mensaje o clic haya ocurrido.

## Estructura del proyecto
La estructura relevante del proyecto es la siguiente. 
```mi-proyecto-playwright/
├── config/
│   └── environments.js
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── test-data/
│   ├── users.js
│   └── customer.js
├── tests/
│   ├── smoke/
│   │   ├── login.spec.js                # QA01
│   │   ├── access-rules.spec.js         # QA02
│   │   └── checkout.spec.js             # QA03
│   ├── regression/
│   │   ├── checkout-validation.spec.js  # QA04
│   │   ├── cart.spec.js                 # QA05
│   │   └── product-sort.spec.js         # QA06
│   ├── demo-failure.spec.js             # Fallo controlado aislado
│   ├── example.spec.js                 
│   └── helpers.js
├── evidence/
│   └── controlled-failure/
├── playwright.config.js
├── playwright.demo-failure.config.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
   ## Ejecución desde consola
        Listar pruebas sin ejecutarlas
            node runner.js --env=demo --suite=regression --list
            
        Ejecutar Smoke
            npm run test:smoke

        Equivalente explícito:
            node runner.js --env=demo --suite=smoke

        Ejecutar Regression (los seis casos)
            npm run test:regression
            node runner.js --env=demo --suite=regression

        Ejecutar con Chromium visible
            node runner.js --env=demo --suite=smoke --headed
## Ejecutar un caso a la vez
- npx playwright test tests/smoke/login.spec.js --workers=1 --reporter=list
- npx playwright test tests/smoke/access-rules.spec.js --workers=1 --reporter=list
- npx playwright test tests/smoke/checkout.spec.js --workers=1 --reporter=list
- npx playwright test tests/regression/checkout-validation.spec.js --workers=1 --reporter=list
- npx playwright test tests/regression/cart.spec.js --workers=1 --reporter=list
- npx playwright test tests/regression/product-sort.spec.js --workers=1 --reporter=list

   ## Ambientes
        El archivo config/environments.js mantiene la configuración fuera de los casos.
            - demo: usa BASE_URL_DEMO o https://www.saucedemo.com.
            - example: perfil de ejemplo sin credenciales; usa BASE_URL_EXAMPLE. Su valor inicial es https://example.invalid y debe cambiarse por una URL autorizada antes de utilizarlo.

            $env:BASE_URL_EXAMPLE = "https://mi-ambiente-qa.example"
            node runner.js --env=example --suite=smoke

            El perfil alternativo solo funcionará sin cambios adicionales si la aplicación configurada ofrece un flujo y selectores compatibles con estos casos. Cambiar la URL no adapta automáticamente los Page Objects a otra aplicación.

   ## Reporte HTML y evidencias
        Las ejecuciones normales están configuradas para generar:
        - Reporte HTML en playwright-report/.
        - Capturas y trazas ante fallos en test-results/.
        - Video retenido ante fallos, cuando Playwright lo genere en la ejecución.

        npm run report

  ## Publicación en GitHub
                   git init -b main
            git add .
            git status --short
            git commit -m "test: add HelpPeople QA Lead Playwright solution"
            git remote add origin https://github.com/AndreaGra22/PruebaHelppeople.git
            git push -u origin main
            git rev-parse HEAD
    
##  Balance de entrega

### 1. Declaración de uso de inteligencia artificial

Se utilizó ChatGPT como herramienta de apoyo para estructurar el proyecto, desarrollar y depurar código de Playwright, analizar errores de ejecución y preparar la documentación técnica y la estrategia de calidad. Las ejecuciones y los resultados deben verificarse en el entorno local antes de ser reportados como definitivos.

