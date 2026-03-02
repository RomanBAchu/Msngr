# Этап сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "Ambe.Server/Ambe.Server.csproj"
RUN dotnet publish "Ambe.Server/Ambe.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false


# Финальный этап
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Ambe.Server.dll"]
