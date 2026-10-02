# Matriz de diseño por expresión

Leer EXPRESSIONS y sus límites antes de diseñar. No copiar valores obsoletos como un contrato permanente.

| Expresión | Ojos | Boca | Verificación |
| --- | --- | --- | --- |
| neutral | Apertura normal, identidad reconocible | Reposo propio, abierta sólo si el diseño lo pide | No confundir reposo con happy |
| happy | Curvatura/pose alegre compatible con blink | Sonrisa propia; gatito y línea simple permanecen cerrados | Cachetes de gatito sólo donde corresponda |
| sad | Menor apertura/curvatura triste | Curvatura negativa legible | No conservar sonrisa por default |
| angry | Ángulo y tensión según geometría | Tensión/curvatura correspondiente | Cejas alineadas sin tapar ojos |
| surprised | Apertura mayor | Apertura definida por estilo; línea simple sigue siendo línea | Dientes pegados a borde; lengua contenida |
| sleepy | Apertura baja por expresión | Pose de reposo o bostezo propio de cada estilo | No convertir todas las bocas en la misma lente |

Trabajar con eyeOpen, eyeCurve, eyeAngle, eyeSpacing, pupilSize, mouthWidth, mouthCurve, mouthOpen, browAngle, browLift y browOpacity. Mantener valores finitos y dentro de límites establecidos.

## Reposo y transición

El helper relaxedMouth existente mezcla poses por apertura ocular baja y curvatura cercana a cero; leer su implementación. No usar blink como disparador del reposo de la boca. Para un estilo nuevo, asignar una pose propia y comprobar transición a surprise/happy sin cambios bruscos de contorno. No heredar una abertura genérica sólo porque reduce líneas de código.

## Dientes sobre una cuadrática

Si el borde superior va de (left, baseline) a (right, baseline) con control (50, controlY), para t∈[0,1]:
- x(t)=left+mouthWidth·t.
- y(t)=baseline+2·t·(1−t)·(controlY−baseline).
- y′(t)=2·(1−2t)·(controlY−baseline).

Para recortar un tramo [a,b], el control de la curva cuadrática de ese tramo tiene y=y(a)+y′(a)·(b−a)/2. Construir la base de los dientes sobre ese tramo. Ajustar profundidad con la apertura y clippear la decoración. Para otro contorno, derivar su parametrización; no reutilizar esta fórmula fuera de una cuadrática compatible.
