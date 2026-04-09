# Crowdin Quick Start Guide

Быстрое руководство для начала работы с переводом документации через Crowdin.

## 1️⃣ Подготовка (5 минут)

### Создайте Crowdin проект

1. Зайдите на [crowdin.com](https://crowdin.com)
2. Создайте новый проект для документации
3. Скопируйте **Project ID** из URL или settings
4. Создайте **Personal API Token** в Settings → API Tokens

### Установите зависимости

```bash
npm install -g @crowdin/cli
```

### Установите переменные окружения

```bash
cp .env.example .env
# Отредактируйте .env и добавьте Project ID и Token
```

Или экспортируйте переменные:

```bash
export CROWDIN_PROJECT_ID="your_id"
export CROWDIN_PERSONAL_TOKEN="your_token"
```

## 2️⃣ Инициализация языков (2 минуты)

Создайте директории для всех языков:

```bash
npm run init-locales
```

Это создаст структуру:
- `docs/de/` - Немецкий
- `docs/fr/` - Французский
- `docs/es/` - Испанский
- `docs/it/` - Итальянский
- `docs/pt/` - Португальский
- `docs/nl/` - Голландский

## 3️⃣ Первая загрузка (3 минуты)

### Инициализируйте Crowdin конфиг

```bash
crowdin init
```

### Загрузите исходники

```bash
npm run crowdin:push
# или
crowdin push
```

✅ Теперь ваша документация в Crowdin и готова к переводу!

## 4️⃣ Скачивание переводов

Когда переводчики завершат работу:

```bash
npm run crowdin:pull
# или
crowdin pull
```

Переводы загрузятся в директории `docs/{lang_code}/*`

## 📋 Полезные команды

```bash
# Помощь по Crowdin командам
npm run crowdin:help

# Проверка конфигурации
npm run crowdin:check

# Загрузить исходники
npm run crowdin:push

# Скачать переводы
npm run crowdin:pull

# Полная синхронизация
npm run crowdin:sync

# Просмотр локально
npm run docs:dev

# Сборка
npm run docs:build
```

## 🔄 Workflow

```
1. Выправьте English документы
   ↓
2. npm run crowdin:push
   ↓
3. Переводчики работают в Crowdin
   ↓
4. npm run crowdin:pull
   ↓
5. Проверьте переводы локально: npm run docs:dev
   ↓
6. git add . && git commit && git push
```

## ⚙️ GitHub Actions (автоматизация)

Если вы хотите автоматическую синхронизацию:

1. Добавьте в Settings → Secrets:
   - `CROWDIN_PROJECT_ID`
   - `CROWDIN_PERSONAL_TOKEN`

2. Workflow автоматически:
   - **crowdin-push.yml**: Загружает изменения при push в main
   - **crowdin-pull.yml**: Ежедневно проверяет новые переводы

## 🐛 Troubleshooting

### Error: "CROWDIN_PROJECT_ID not found"

```bash
# Убедитесь что переменные установлены
echo $CROWDIN_PROJECT_ID
echo $CROWDIN_PERSONAL_TOKEN

# Если нет, установите их
export CROWDIN_PROJECT_ID="your_id"
export CROWDIN_PERSONAL_TOKEN="your_token"
```

### Файлы не загружаются

```bash
# Проверьте конфиг
npm run crowdin:check

# Проверьте что crowdin.yml существует
ls crowdin.yml
```

### Переводы не загружаются

```bash
# Убедитесь что есть готовые переводы на Crowdin
# Попробуйте с --no-backup
crowdin pull --no-backup
```

## 📚 Дополнительно

- **CROWDIN.md** - Полное руководство
- [Crowdin Docs](https://crowdin.com/docs)
- [Crowdin CLI Guide](https://crowdin.github.io/crowdin-cli/)
- [VitePress i18n](https://vitepress.dev/guide/i18n-routing)

## ✨ Что дальше?

1. ✅ Инициализировали Crowdin и загрузили исходники
2. 🌐 Пригласите переводчиков в ваш проект на Crowdin
3. 📥 Когда переводы готовы, скачайте их
4. 🚀 Постройте документацию: `npm run docs:build`

Готово! 🎉
