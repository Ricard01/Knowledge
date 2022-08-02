using Application.Common.Interfaces;
using FluentValidation.AspNetCore;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using NSwag;
using NSwag.Generation.Processors.Security;
using WebUI.Services;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{


    public static IServiceCollection AddWebUIservices(this IServiceCollection services)
    {
        // Only if u want to call your api throw another domain name. 
        services.AddCors(options =>
        {
            options.AddPolicy("AllowDomains",
                policy =>
                {
                    policy.WithOrigins("https://knowledge.com")
                            .SetIsOriginAllowedToAllowWildcardSubdomains()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                });
        });

        services.AddDatabaseDeveloperPageExceptionFilter();

        // Singleton objects are the same for every object and every request.
        services.AddSingleton<ICurrentUserService, CurrentUserService>();

        // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/http-context?view=aspnetcore-5.0
        services.AddHttpContextAccessor();

        // https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-5.0#entity-framework-core-dbcontext-probe
        // https://www.michalbialecki.com/2020/03/13/entity-framework-core-health-check/
        services.AddHealthChecks().AddDbContextCheck<ApplicationDbContext>();

        services.AddControllersWithViews(options =>
            options.Filters.Add<ApiExceptionFilterAttribute>())
            .AddFluentValidation(x => x.AutomaticValidationEnabled = false);

        services.AddRazorPages();

        // Customise default API behaviour
        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });  

        services.AddOpenApiDocument(configure =>
                  {
                      configure.Title = "Knowledge API";

                      configure.PostProcess = document =>
                      {
                          document.Info.Version = "v1";
                          document.Info.Title = "Knowleadge API";
                          document.Info.Description = "A simple ASP.NET Core web API";
                          document.Info.TermsOfService = "www.linktomyterms...com";
                          document.Info.Contact = new NSwag.OpenApiContact
                          {
                              Name = "Ricardo Chavez",
                              Email = string.Empty,
                              Url = "https://twitter.com/rickardo_43"
                          };
                          document.Info.License = new NSwag.OpenApiLicense
                          {
                              Name = "Use it at your own risk ",
                              Url = "https://iwantbeersalldaylong.mx"
                          };
                      };

                      configure.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
                      {
                          Type = OpenApiSecuritySchemeType.ApiKey,
                          Name = "Authorization",
                          In = OpenApiSecurityApiKeyLocation.Header,
                          Description = "Type into the textbox: Bearer {your JWT token}."
                      });

                      configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));

                  });

        return services;

    }

}
