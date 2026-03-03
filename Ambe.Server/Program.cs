using Ambe.Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

// 1. Настройка SignalR
builder.Services.AddSignalR();

// 2. Настройка CORS (оставляем как есть, это важно для тестов)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .SetIsOriginAllowed(_ => true)
              .AllowCredentials();
    });
});

var app = builder.Build();

// 3. Конвейер обработки (Middleware)
app.UseStaticFiles(); // Сначала отдаем index.html
app.UseCors();        // Затем разрешаем доступ
app.UseRouting();     // Включаем маршрутизацию

// Убираем лишние проверки на Development, если чат простой
app.MapHub<ChatHub>("/chathub");

// Редирект на главную
app.MapGet("/", () => Results.Redirect("/index.html"));

app.Run();
