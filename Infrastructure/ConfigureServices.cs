using Application.Common.Interfaces;
using Infrastructure.Identity;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Interceptors;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{


    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddScoped<AuditableEntitySaveChangesInterceptor>();

        //  A DbContext instance represents a combination of the Unit Of Work and Repository patterns such that it can be used to query from a database
        // and group together changes that will then be written back to the store as a unit

        if (configuration.GetValue<bool>("UseMysql"))
        {
            string mySqlConnectionStr = configuration.GetConnectionString("MySql");

            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseMySql(mySqlConnectionStr, ServerVersion.AutoDetect(mySqlConnectionStr),
            b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
        }
        else
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("Sql"),
                    b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
        }

        services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());

        services.AddScoped<ApplicationDbContextInitialiser>();

        // Identity with the default UI:
        services
            .AddDefaultIdentity<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();


        // Sets up some default ASP.NET Core conventions on top of IdentityServer
        services.AddIdentityServer()
            .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();



        services.AddTransient<IDateTime, DateTimeService>();
        services.AddTransient<IIdentityService, IdentityService>();

        // Configures the app to validate JWT tokens produced by IdentityServer
        services.AddAuthentication()
            .AddIdentityServerJwt();

        // Configurations for password, user  or lockout settings 
        services.Configure<IdentityOptions>(options =>
        {
            options.Password.RequiredLength = 6;
            options.Password.RequireUppercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireDigit = false;
        });


        return services;

    }

}



