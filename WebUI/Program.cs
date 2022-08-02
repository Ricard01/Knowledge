using Infrastructure.Persistence;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices();

builder.Services.AddInfrastructureServices(builder.Configuration);

builder.Services.AddWebUIservices();

var app = builder.Build();

app.UseMigrationsEndPoint();


// Initialise and seed database
using (var scope = app.Services.CreateScope())
{
    var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();
    await initialiser.InitialiseAsync();
    await initialiser.SeedAsync();
}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
 


}
else
{
    app.UseCors("AllowDomains");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// navitate to the path to check if there is connection to the DB
app.UseHealthChecks("/health");
app.UseHttpsRedirection();
app.UseStaticFiles();


//  Define OpenAPI/Swagger document route (defined with UseSwaggerWithApiExplorer)
// Add web UIs to interact with the document
app.UseSwaggerUi3(settings => // Serves the Swagger UI 3 web ui to view the OpenAPI/Swagger documents by default on `/swagger`
{
    // Define web UI route
    settings.Path = "/api";

    // Define OpenAPI/Swagger document route (defined with UseSwaggerWithApiExplorer)
    settings.DocumentPath = "/api/specification.json";

});


app.UseRouting();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.Run();

// Make the implicit Program class public so test projects can access it
public partial class Program { }


