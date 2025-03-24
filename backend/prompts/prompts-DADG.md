### Create by Cursor

## Prompt 1:

@backend Crea un endpoint tipo GET que permita obtener todos los candidatos en proceso para una determinada posición, teniendo en cuenta la estructura para peticiones HTTP e implementando el siguiente path de consulta: /positions/:id/candidates. Se espera obtener la siguiente información en formato obj con el listado de candidatos (candidates) y sus aplicaciones según un determinado positionID:

- full_name que será relacionado desde la tabla candidate
- current_interview_step que será relacionado de la tabla application
- candidate_average_score que será la puntuación media del candidato según la acumulación de su score en cada entrevista o interview 

# RTA Prompt 1:

Te ayudaré a crear el endpoint para obtener los candidatos en proceso para una posición específica. Primero, necesitamos crear el controlador y luego implementar la lógica necesaria.

**Se generará el controlador en el archivo src/presentation/controllers/positionController.ts**

Ahora necesitamos crear el archivo de rutas para manejar este endpoint:

**Se generará el archivo de rutas en el archivo src/presentation/routes/positionRoutes.ts**  

Finalmente, necesitamos registrar estas rutas en el archivo principal de la aplicación:

**Se generará el archivo de rutas en el archivo src/presentation/routes/positionRoutes.ts**  

Este endpoint implementará:
1. La ruta /positions/:id/candidates que acepta el ID de la posición como parámetro.
2. Retornará un objeto JSON con un array de candidatos que contiene:
    - full_name: Nombre completo del candidato (combinación de firstName y lastName)
    - current_interview_step: El paso actual de la entrevista
    - candidate_average_score: Promedio de las puntuaciones de todas las entrevistas del candidato
3. La respuesta tendrá este formato:

{
    "candidates": [
        {
            "full_name": "John Doe",
            "current_interview_step": 2,
            "candidate_average_score": 4.5
        },
        {
            "full_name": "Jane Smith",
            "current_interview_step": 1,
            "candidate_average_score": 3.75
        }
    ]
}

- El controlador maneja los siguientes casos:
    - Obtiene todos los candidatos que han aplicado a una posición específica
    - Calcula el promedio de puntuación de las entrevistas para cada candidato
    - Maneja errores y devuelve respuestas apropiadas
    - Formatea los datos según la estructura requerida
Si ocurre algún error, el endpoint devolverá un código de estado 500 con un mensaje de error apropiado.


## Prompt 2 y 3:

**Se solicita arreglar temas de tipado en las modificaciones implementadas en el prompt 1**

# RTA Prompt 2 y 3:

En ambos casos genera el tipado de los datos, adiciona interface ApplicationWithInterviews para tipar el resultado de la consulta GET /positions/:id/candidates.


## Prompt 4:

@backend Crea un endpoint de tipo PUT como /candidates/:id/stage que realizará una actualización de la etapa del candidato movido. De igual manera, que la petición GET, esta debe contar con la estructura para peticiones HTTP con el path /candidates/:id/stage y permitirá modificar el current_interview_step según la fase actual del proceso de entrevista del candidato.

# RTA Prompt 4:

**Se generará el controlador en el archivo src/presentation/controllers/candidateController.ts**

**Se generará el archivo de rutas en el archivo src/presentation/routes/candidateRoutes.ts**

Este endpoint:
1. Recibe el ID del candidato como parámetro de ruta y el nuevo current_interview_step en el cuerpo de la petición.

2. Realiza las siguientes validaciones:
    - Verifica que se proporcione el current_interview_step y sea un número
    - Comprueba que el candidato existe y tiene una aplicación activa
    - Verifica que la etapa de entrevista especificada existe

3. Actualiza la etapa actual del candidato en la base de datos
4. Devuelve una respuesta con:
    - Mensaje de éxito
    - Datos actualizados del candidato incluyendo:
        - Nombre del candidato
        - Posición a la que aplicó
        - Nueva etapa de entrevista

**Genera el siguiente Ejemplo de uso:**

PUT /candidates/1/stage
Content-Type: application/json

{
    "current_interview_step": 2
}

- Respuesta exitosa:

{
    "message": "Etapa de entrevista actualizada exitosamente",
    "data": {
        "candidate_name": "John Doe",
        "position": "Software Engineer",
        "current_interview_step": 2
    }
}

**Finalmente, genera los status**

El endpoint maneja varios casos de error y devuelve códigos de estado HTTP apropiados:
- 400: Datos de entrada inválidos
- 404: Candidato o aplicación no encontrada
- 500: Error interno del servidor

## Prompt 5:

Se solicita arreglar errores de tipado directamente en el código usando el chat de Cursor.

# RTA Prompt 5:

**Genera cambio el tipado para el controlador de la petición PUT /candidates/:id/stage solucionando los errores de tipado any y de tipado de respuesta**