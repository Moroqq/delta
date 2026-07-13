# Дельта

Фитнес-трекер с ИИ-ассистенткой **Витой**. Замеры InBody, дневник питания с КБЖУ,
тренировки с прогрессией рабочих весов и чат с ИИ — в стиле «Spatial Glass»
(тёмный тёплый фон, стеклянные карточки, свечение вместо заливки).

> Слоган: *видно, как ты меняешься* — весь интерфейс построен на дельтах изменений.

## Структура

| Папка | Что это |
|---|---|
| `app/` | Приложение: Vite + React 18 + TypeScript + Capacitor (Android/iOS) |
| `logo/` | Логотип «искра Виты»: SVG + PNG |
| `design_handoff_fitness_tracker/` | Дизайн-хендофф (HTML-прототип, токены, раскадровка промо) |

## Запуск

```bash
cd app
npm install
npm run dev            # веб на http://127.0.0.1:5199
npm run mobile:sync    # сборка + синк в нативные проекты android/ и ios/
npm run mobile:android # то же + открыть Android Studio
```

## Архитектура заглушек

Бэкенд и ИИ пока эмулируются — UI не знает, откуда приходят данные:

- `app/src/lib/api.ts` — интерфейс `Backend`; сейчас `LocalBackend`
  (демо-данные + localStorage). При появлении VPS — реализовать `HttpBackend`
  и поменять одну строку в `createBackend()`.
- `app/src/lib/ai.ts` — интерфейс `Assistant`; сейчас `StubAssistant`
  (готовые ответы Виты + имитация задержки). При подключении ИИ-API —
  аналогично через `createAssistant()`.
- `app/src/lib/stub-data.ts` — демо-данные из дизайн-прототипа.

## Мобильные сборки

- **Android**: нужен Android Studio; `npm run mobile:android`, дальше Run.
- **iOS**: собирается только на macOS (или в облачном CI); проект — `app/ios/`.
- Иконки/сплеш генерируются из `app/assets/`: `npx @capacitor/assets generate --ios --android`.
