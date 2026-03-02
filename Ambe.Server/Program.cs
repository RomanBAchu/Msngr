using Ambe.Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

// 1. Добавляем CORS, чтобы браузеры друзей не блокировали чат
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .SetIsOriginAllowed((host) => true) // Разрешаем любым сайтам подключаться
              .AllowCredentials(); // Важно для SignalR
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

var app = builder.Build();

// 2. Включаем CORS сразу после Build
app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Закомментируй HttpsRedirection для тестов на Render/Localtunnel, 
// так как они сами дают HTTPS, и двойное перенаправление может глючить
// app.UseHttpsRedirection();

app.UseAuthorization();
app.UseStaticFiles();

app.MapControllers();
app.MapHub<ChatHub>("/chathub");

app.MapGet("/", () => Results.Redirect("/test.html"));

app.Run();
