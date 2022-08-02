using System.Reflection;
using Application.Common.Interfaces;
using Domain.Entities;
using Infrastructure.Identity;
using Infrastructure.Persistence.Interceptors;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Infrastructure.Persistence;


// A DbContext instance represents a session with the database and can be used to query and save instances of your entities
// ApiAuthorizationDbContext ( Database abstraction for a combined DbContext using ASP.NET Identity and Identity Server)
public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>, IApplicationDbContext
{

    private readonly AuditableEntitySaveChangesInterceptor _auditableEntitySaveChangesInterceptor;   
    
    //private ILoggerFactory GetLoggerFactory()
    //{
    //    IServiceCollection serviceCollection = new ServiceCollection();
    //    serviceCollection.AddLogging(builder =>
    //    builder.AddConsole()
    //    .AddFilter(DbLoggerCategory.Database.Command.Name,
    //    LogLevel.Information));
    //    return serviceCollection.BuildServiceProvider()
    //    .GetService<ILoggerFactory>();
    //}
 

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        IOptions<OperationalStoreOptions> operationalStoreOptions,
        AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor
       ) : base(options, operationalStoreOptions)
    {
        _auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
    }

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<Tag> Tags => Set<Tag>();

    public DbSet<Article> Articles => Set<Article>();

    public DbSet<ArticleTags> ArticleTags => Set<ArticleTags>();

    protected override void OnModelCreating(ModelBuilder builder)
    {

        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
     
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(_auditableEntitySaveChangesInterceptor);
    }
    // NOTE 10 Execution Order
    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {  

        return await base.SaveChangesAsync(cancellationToken); 
    }






}


