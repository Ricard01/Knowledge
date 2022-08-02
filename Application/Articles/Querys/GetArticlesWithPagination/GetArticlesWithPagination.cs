using Application.Articles.Dto;
using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Articles.Querys.GetArticlesWithPagination;


public class GetArticlesWithPaginationQuery : IRequest<PaginatedList<ArticleDto>>
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}

public class GetArticlesWithPaginationQueryHandler : IRequestHandler<GetArticlesWithPaginationQuery, PaginatedList<ArticleDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetArticlesWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<ArticleDto>> Handle(GetArticlesWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query =
                      _context.Articles
                    .ProjectTo<ArticleDto>(_mapper.ConfigurationProvider)
                    .OrderByDescending(art => art.Id);


        return await query.PaginatedListAsync(request.PageNumber, request.PageSize);
        
    }
}


