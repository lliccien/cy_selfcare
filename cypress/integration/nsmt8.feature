#language: es
Característica: Compra de paquetes con TC/TD

Como a usuario móvil de mitigo
Quiero comprar paquetes con TC/TD
Para hacer la compra de paquetes sin saldo

Escenario: Mostrar radio-button de compra de paquetes 'Con tarjetas crédito o débito'
Dado que estoy en el dashboard con una cuenta prepago
Y que selecciono un paquete
Y hago clic en compra
Entonces se debe mostrar un modal el radio-button 'Con tarjetas crédito o débito'

Escenario: Clic en botón pagar 'Con tarjetas crédito o débito'
Dado que estoy en modal de compra de paquetes 
Y Selecciono 'Con tarjetas crédito o débito'
Y hago clic en botón pagar 
Entonces se debe redireccionar a "https://transaccionesco-stg.tigocloud.net/gateway/" mas el token