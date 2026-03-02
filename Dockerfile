# 1. Используем SDK 8.0 для сборки
FROM ://mcr.microsoft.com AS build
WORKDIR /src

# 2. КОПИРУЕМ ФАЙЛ ПРОЕКТА ИЗ ПОДПАПКИ
# Если твоя папка называется Msngr или Ambe.Server, проверь это имя!
# Предположим, папка называется Ambe.Server:
COPY ["Ambe.Server/Ambe.Server.csproj", "Ambe.Server/"]

# 3. Восстанавливаем зависимости
RUN dotnet restore "Ambe.Server/Ambe.Server.csproj"

# 4. Копируем все файлы из корня в контейнер
COPY . .

# 5. Собираем проект
WORKDIR "/src/Ambe.Server"
RUN dotnet build "Ambe.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Ambe.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

# 6. Финальный образ для запуска
FROM ://mcr.microsoft.com AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Указываем порт, который мы задали в Render (10000)
ENV ASPNETCORE_URLS=http://+:10000

ENTRYPOINT ["dotnet", "Ambe.Server.dll"]
