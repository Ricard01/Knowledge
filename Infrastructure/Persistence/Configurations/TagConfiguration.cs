using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class TagConfiguration : IEntityTypeConfiguration<Tag>
{

    public void Configure(EntityTypeBuilder<Tag> builder)
    {
        builder.Property(t => t.Name)
        .HasMaxLength(30)
        .IsRequired();

        builder.HasIndex(t => new { t.Name, t.CategoryId }).IsUnique();
    }

}

