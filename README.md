# GiveChain 🌐
### Plataforma Transparente de Donaciones Globales sobre Stellar

> **Build on Stellar Chile Hackathon 2026**

---

## 📌 Resumen del Proyecto

GiveChain es una plataforma de donaciones globales construida sobre la blockchain de Stellar que resuelve la crisis de confianza en el sistema filantrópico actual. Mediante contratos inteligentes de custodia (Soroban) y verificación por hitos, garantiza que cada donación llegue a su destino de forma transparente, rápida y con comisiones prácticamente nulas.

---

## ❗ El Problema

El sistema global de donaciones enfrenta una crisis de confianza estructural:

- **67%** de los donantes no sabe en qué se utilizó su dinero
- **3–10%** de comisiones en plataformas tradicionales reduce el impacto real
- **3–5 días** de demora en transferencias internacionales
- Casos recurrentes de **fraude** y mal uso de fondos sin mecanismos de auditoría externa

El dinero llega tarde, cuesta demasiado y nadie puede rastrear su destino.

---

## 💡 La Solución

GiveChain introduce cuatro mecanismos clave:

**1. Transparencia Total**
Cada transacción queda registrada de forma inmutable en la blockchain de Stellar, visible para cualquier persona en tiempo real.

**2. Custodia por Hitos (Escrow)**
Los fondos se almacenan en contratos inteligentes Soroban y solo se liberan cuando la organización beneficiaria demuestra el cumplimiento de cada hito mediante evidencias verificables.

**3. Comisiones Casi Nulas**
Gracias a la red Stellar, el costo por transacción es de apenas $0.00001 USD, habilitando microdonaciones desde cualquier parte del mundo.

**4. Reembolso Automático**
Si una campaña no alcanza su objetivo o no cumple los hitos en el plazo establecido, los fondos se devuelven automáticamente al donante.

---

## ⚙️ Cómo Funciona

```
Donante → Fondos en Escrow → Organización sube evidencia → Verificación → Liberación por Hito
```

**Ejemplo real:** Una campaña para construir una escuela en Nairobi recauda $10,000 divididos en tres hitos: adquisición del terreno (30%), compra de materiales (40%) y construcción (30%). Los fondos de cada hito solo se liberan tras verificar la evidencia correspondiente.

---

## 🚀 Demo

La plataforma incluye un prototipo interactivo completamente funcional con:

- **Homepage** con estadísticas globales en tiempo real
- **Listado de campañas activas** con progreso de recaudación
- **Detalle de campaña** con seguimiento de hitos
- **Modal de donación** con cálculo de comisiones
- **Confirmación de transacción** con hash de blockchain
- **Dashboard personal** con historial e impacto del donante
- **Explorador de blockchain** con transacciones en vivo

---

## 👥 Público Objetivo

**Donantes Individuales**
Personas de cualquier parte del mundo que quieren donar con la certeza de que su dinero se usa correctamente, desde $0.01 hasta cualquier cantidad.

**ONGs y Organizaciones Sin Fines de Lucro**
Especialmente en países en desarrollo que necesitan acceso a financiamiento internacional sin las barreras de los sistemas bancarios tradicionales.

**Responsabilidad Social Empresarial (RSE)**
Empresas que requieren transparencia verificable y trazabilidad completa de sus donaciones para reportes de impacto.

---

## ⭐ ¿Por Qué Stellar?

| Característica | Beneficio para GiveChain |
|---|---|
| $0.00001 por transacción | Habilita microdonaciones sin que las comisiones se coman el valor |
| Confirmación en 3–5 segundos | Ayuda de emergencia sin demoras |
| Soroban (Smart Contracts) | Contratos de custodia seguros escritos en Rust |
| USDC nativo | Elimina la volatilidad para donantes y organizaciones |
| Red de Anclajes | Conversión a monedas locales en 50+ países |
| Horizon API | Transparencia y trazabilidad completa en tiempo real |

Stellar es la única blockchain que combina velocidad, costo mínimo, estabilidad (USDC) e infraestructura de pagos globales necesaria para que GiveChain funcione a escala mundial.

---

## 📊 Ventaja Competitiva

| Característica | Plataformas Tradicionales | GiveChain |
|---|---|---|
| Comisiones | 3–10% | ~$0.00001 |
| Velocidad de transferencia | 3–5 días | 3–5 segundos |
| Transparencia | Informes propios | Blockchain verificable |
| Liberación de fondos | Inmediata y total | Por hitos verificados |
| Reembolso ante fracaso | Proceso manual | Automático |
| Cobertura global | Limitada por banca | 50+ países vía anclajes |
| Auditoría externa | No disponible | Inmutable en blockchain |

---

## 🌍 Impacto Potencial

**Restaurar la Confianza**
Al hacer cada transacción públicamente verificable, GiveChain devuelve la confianza a los donantes que han sido defraudados por sistemas opacos.

**Democratizar la Filantropía**
Con comisiones casi nulas, cualquier persona puede donar desde $0.01, abriendo la filantropía global a millones de personas en economías emergentes.

**Empoderar ONGs Locales**
Organizaciones pequeñas en países en desarrollo pueden acceder a financiamiento internacional sin necesidad de cuentas bancarias internacionales ni intermediarios costosos.

**Acelerar la Ayuda de Emergencia**
En crisis humanitarias, los fondos llegan en segundos, no en días. La diferencia puede ser crítica.

---

## 🏗️ Arquitectura Técnica

```
Frontend          Backend           Blockchain
─────────         ────────          ──────────
Next.js           Supabase          Stellar Network
TypeScript        PostgreSQL        Soroban Contracts
Tailwind CSS      Edge Functions    Horizon API
React 18                            USDC / XLM
```

**Contratos Soroban (Rust):**
- `DonationEscrow` — gestión de custodia por hitos
- `MilestoneVerifier` — verificación de evidencias
- `AutoRefund` — lógica de reembolso automático

---

## 🗺️ Hoja de Ruta

**MVP (Actual)**
Prototipo funcional con flujo completo de donación, escrow básico por hitos, explorador de transacciones y dashboard del donante.

**v1.5 — Q3 2026**
Verificación multicapa con oráculos externos, sistema de reputación para organizaciones, notificaciones push y soporte multiidioma completo.

**v2.0 — Q1 2027**
DAO de gobernanza para decisiones comunitarias, integración con sistemas de RSE corporativa, API pública para terceros y app móvil nativa.

---

## 👨‍💻 Equipo

**BlueNode** — Equipo de desarrollo participante en el Build on Stellar Chile Hackathon 2026.

📧 cjinwoo1218@gmail.com
🔗 [github.com/superjin1218/GiveChain](https://github.com/superjin1218/GiveChain)

---

> *"Porque cada donación merece ser transparente."*
> *"모든 기부는 투명해야 하니까요."*
