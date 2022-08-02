using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Tags.Queries.GetTags;

public record GetTagsQuery : IRequest<TagsVm>;


public class GetTagsQueryHandler : IRequestHandler<GetTagsQuery, TagsVm>
{

    private readonly IApplicationDbContext _context;

    private readonly IMapper _mapper;

    public GetTagsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<TagsVm> Handle(GetTagsQuery request, CancellationToken cancellationToken)
    {
        return new TagsVm
        {
            Tags = await _context.Tags.TagWith("Get All Tags")
            .AsNoTracking()
            .ProjectTo<TagDto>(_mapper.ConfigurationProvider)
            .OrderBy(c => c.Category)
            .ToListAsync(cancellationToken)
        };
    }
}

