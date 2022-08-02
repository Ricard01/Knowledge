using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace Application.Tags.Queries.GetTagsByCategory;

public record GetTagsByCategoryQuery(int CategoryId) : IRequest<TagsCategoryVm>;


public class GetTagsByCategoryQueryHandler : IRequestHandler<GetTagsByCategoryQuery, TagsCategoryVm>
{

    private readonly IApplicationDbContext _context;

    private readonly IMapper _mapper;

    public GetTagsByCategoryQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<TagsCategoryVm> Handle(GetTagsByCategoryQuery request, CancellationToken cancellationToken)
    {
        return new TagsCategoryVm
        {
            Tags = await _context.Tags.TagWith("Get Tags By Category")
            .Where(t => t.CategoryId == request.CategoryId)
            .AsNoTracking()
            .ProjectTo<TagCategoryDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken)
        };

    }
}

