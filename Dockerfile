FROM ://mcr.microsoft.com AS build
WORKDIR /src

# ВАЖНО: Если твоя папка называется по-другому, поправь путь ниже!
COPY ["Ambe.Server/Ambe.Server.csproj", "Ambe.Server/"]
RUN dotnet restore "Ambe.Server/Ambe.Server.csproj"

COPY . .
WORKDIR "/src/Ambe.Server"
RUN dotnet build "Ambe.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Ambe.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM ://mcr.microsoft.com AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENV ASPNETCORE_URLS=http://+:10000

ENTRYPOINT ["dotnet", "Ambe.Server.dll"]
