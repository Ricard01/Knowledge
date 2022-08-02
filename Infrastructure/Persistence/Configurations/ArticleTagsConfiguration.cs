using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class ArticleTagsConfiguration : IEntityTypeConfiguration<ArticleTags>
{

    public void Configure(EntityTypeBuilder<ArticleTags> builder)
    {

        builder.HasKey(at => new { at.ArticleId, at.TagId} );

        builder.HasOne(pt => pt.Article)
            .WithMany(p => p.ArticleTags)
            .HasForeignKey(pt => pt.ArticleId)
            .OnDelete(DeleteBehavior.Cascade); 

        builder.HasOne(pt => pt.Tag)
            .WithMany(t => t.ArticleTags)
            .HasForeignKey(pt => pt.TagId)
            .OnDelete(DeleteBehavior.Restrict); 
            
           
    }

}

