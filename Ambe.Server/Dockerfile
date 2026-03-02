# 1. Берем образ с SDK (инструменты разработчика), чтобы собрать проект
FROM ://mcr.microsoft.com AS build
WORKDIR /src

# 2. Копируем файл проекта и восстанавливаем зависимости
# ВНИМАНИЕ: Если у тебя папки называются иначе, поправь пути!
COPY ["Ambe.Server.csproj", "./"]
RUN dotnet restore "./Ambe.Server.csproj"

# 3. Копируем всё остальное и собираем
COPY . .
RUN dotnet publish "Ambe.Server.csproj" -c Release -o /app/publish

# 4. Берем легкий образ для запуска (Runtime)
FROM ://mcr.microsoft.com
WORKDIR /app
COPY --from=build /app/publish .

# 5. Команда для запуска
ENTRYPOINT ["dotnet", "Ambe.Server.dll"]
