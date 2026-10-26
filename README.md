Prueba técnica Líder QA — HelpPeople

    Automatización web con Playwright Test, Node.js, JavaScript y Chromium, usando SauceDemo como aplicación de práctica.

    Objetivo y alcance

        La solución automatiza seis escenarios UI, organizados en Page Objects y ejecutables desde consola. El objetivo es demostrar cobertura basada en riesgo, pruebas independientes, configuración por ambiente, diagnóstico con evidencias y decisiones de calidad.

        Se eligió SauceDemo porque ofrece un inventario, inicio de sesión de demostración, carrito y checkout, sin conexión a HelpPeople ni uso de datos internos.

    Reglas de negocio cubiertas

        -El usuario estándar puede ingresar al inventario.
       - El usuario bloqueado no puede iniciar sesión y recibe un mensaje de rechazo.
       - El usuario puede agregar un producto al carrito y completar el checkout.
       - El checkout no permite continuar si faltan datos obligatorios.
        -Al retirar un producto del carrito, este deja de aparecer y se actualiza el contador.
        -El catálogo puede ordenarse por precio ascendente y los precios quedan en orden numérico.

    Limitación importante: SauceDemo es un sitio de demostración de terceros. Este proyecto valida el recorrido de compra desde UI, el resumen y la confirmación final. La aplicación no proporciona un endpoint público de pedidos ni un historial adecuado para comprobar persistencia externa después de cerrar la sesión. No se declara cobertura API ni persistencia backend que no se haya verificado.

    Requisitos

       - Node.js 20 o superior; se recomienda una versión LTS compatible.
        npm incluido con Node.js.
       - Acceso a Internet para instalar dependencias y abrir SauceDemo.
       - Chromium instalado mediante Playwright.

    Instalación
        Clona el repositorio o abre la carpeta del proyecto en Visual Studio Code. Ejecuta los comandos desde la raíz, donde se encuentra package.json.
            npm ci
            npx playwright install chromium

    Usuarios de prueba
        Propósito	          Usuario	    Contraseña
        Acceso válido	    standard_user	secret_sauce
        Usuario bloqueado	locked_out_user	secret_sauce

    Casos de prueba

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


    Ejecución desde consola
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

    Ambientes
        El archivo config/environments.js mantiene la configuración fuera de los casos.
            - demo: usa BASE_URL_DEMO o https://www.saucedemo.com.
            - example: perfil de ejemplo sin credenciales; usa BASE_URL_EXAMPLE. Su valor inicial es https://example.invalid y debe cambiarse por una URL autorizada antes de utilizarlo.

            $env:BASE_URL_EXAMPLE = "https://mi-ambiente-qa.example"
            node runner.js --env=example --suite=smoke

            El perfil alternativo solo funcionará sin cambios adicionales si la aplicación configurada ofrece un flujo y selectores compatibles con estos casos. Cambiar la URL no adapta automáticamente los Page Objects a otra aplicación.

    Reporte HTML y evidencias
        Las ejecuciones normales están configuradas para generar:
        - Reporte HTML en playwright-report/.
        - Capturas y trazas ante fallos en test-results/.
        - Video retenido ante fallos, cuando Playwright lo genere en la ejecución.

        npm run report

    Publicación en GitHub
        Crea un repositorio vacío en GitHub. Desde la raíz del proyecto:
            git init -b main
            git add .
            git status --short
            git commit -m "test: add HelpPeople QA Lead Playwright solution"
            git remote add origin https://github.com/AndreaGra22/PruebaHelppeople.git
            git push -u origin main
            git rev-parse HEAD
    
