## Resumen del abordaje de la prueba técnica —  QA HelpPeople

Para desarrollar esta prueba técnica, seleccioné SauceDemo como aplicación de demostración y utilicé **Node.js, JavaScript y Playwright Test** para construir una solución de automatización orientada a la mantenibilidad, la reproducibilidad y el diagnóstico de fallos.

Organicé el proyecto aplicando el patrón **Page Object Model (POM)**, separando los casos de prueba, los componentes reutilizables de cada página, los datos de prueba y la configuración de los ambientes. También trabajé en la parametrización de las credenciales mediante variables de entorno y en la definición de las suites Smoke y Regression.

La cobertura contempla seis escenarios: inicio de sesión válido, rechazo de un usuario bloqueado, compra exitosa, validación de campos obligatorios, modificación del carrito y ordenamiento de productos. Para comprobar los resultados utilicé aserciones de Playwright y localizadores basados en atributos estables de la aplicación. Durante la validación, corregí una aserción que podía producir un falso positivo en QA05, fortaleciendo las comprobaciones del contador y del contenido del carrito antes y después de eliminar un producto.

Adicionalmente, configuré la generación de reportes HTML y las evidencias de ejecución. Preparé una demostración independiente de fallo controlado para verificar que Playwright detectara una aserción fallida y generara una captura de pantalla, video y traza para su análisis. Esta demostración se diferencia de los defectos reales del producto.

Finalmente, elaboré una estrategia de calidad y liderazgo basada en la priorización por riesgos, los criterios de liberación, la investigación de pruebas intermitentes, la colaboración entre QA y desarrollo y los indicadores de seguimiento. También identifiqué las limitaciones de SauceDemo, especialmente la imposibilidad de consultar un historial público de pedidos para demostrar la persistencia de una compra después de finalizarla.

Como apoyo al desarrollo y la documentación utilicé ChatGPT para analizar errores, revisar el código y estructurar los entregables. Las ejecuciones y sus resultados se validan en el entorno local. Distingo los avances comprobados de los pendientes, entre ellos la demostración completa de persistencia y la consolidación de las evidencias finales.

Mi enfoque fue construir una base funcional y comprensible, priorizando la calidad de las aserciones, la trazabilidad de los resultados y la transparencia sobre las limitaciones y los riesgos pendientes.