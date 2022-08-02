using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class ArticleConfiguration : IEntityTypeConfiguration<Article>
{

    public void Configure(EntityTypeBuilder<Article> builder)
    {
        
        builder.Property(a => a.Title) 
        .HasMaxLength(120)
        .IsRequired();

        builder.Property(a => a.Message)
        .HasColumnType("Text")
        .IsRequired();

    }
}

