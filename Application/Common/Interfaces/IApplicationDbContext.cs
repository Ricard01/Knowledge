using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces;

// https://www.w3schools.com/cs/cs_interface.asp force ApplcationDbContext
public interface IApplicationDbContext
{

    DbSet<Category> Categories { get;  }

    DbSet<Tag> Tags { get;  }

    DbSet<Article> Articles { get; }

    DbSet<ArticleTags> ArticleTags { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);


}

