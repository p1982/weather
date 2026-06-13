# Weather App

Next.js застосунок для перегляду актуальної погоди в обраному місті.

## Стек

- **Next.js** (App Router)
- **TypeScript**
- **MUI** — UI та глобальні стилі
- **i18next** + **react-i18next** — локалізація (`uk`, `en`)
- **Zustand** — стан
- **Axios** — HTTP-запити
- **React Hook Form** — форми

## Структура проєкту

```
app/
  layout.tsx              # кореневий layout, шрифти, globals.css
  [locale]/
    layout.tsx            # MUI + i18n providers
    page.tsx              # головна сторінка
middleware.ts             # редірект на /uk або /en
src/
  api/                    # запити до Visual Crossing Weather API
  components/             # UI-компоненти
  i18n/                   # конфіг i18next та переклади
  providers/              # AppProviders (MUI, i18n)
  theme/                  # MUI theme, шрифти
  types/                  # TypeScript типи
  styles/globals.css      # базові глобальні стилі
public/
```

## Роутинг

- `/` → редірект на `/uk`
- `/uk` — українська версія
- `/en` — англійська версія

## Налаштування

1. Встановіть залежності:

```bash
npm install
```

2. Створіть `.env.local`:

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_visual_crossing_api_key
```

## Запуск

```bash
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000).

## Збірка

```bash
npm run build
npm start
```
