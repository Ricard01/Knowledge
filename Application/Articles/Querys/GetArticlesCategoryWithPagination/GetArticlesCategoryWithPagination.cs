using Application.Articles.Dto;
using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Articles.Querys.GetArticlesCategoryWithPagination;


public class GetArticlesCategoryWithPaginationQuery : IRequest<PaginatedList<ArticleDto>>
{
    public int CategoryId { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}

public class GetArticlesCategoryWithPaginationQueryHandler : IRequestHandler<GetArticlesCategoryWithPaginationQuery, PaginatedList<ArticleDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetArticlesCategoryWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<ArticleDto>> Handle(GetArticlesCategoryWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query =
                      _context.Articles.TagWith("Get Articles By Category")
                    .ProjectTo<ArticleDto>(_mapper.ConfigurationProvider)
                    .Where(category => category.CategoryId == request.CategoryId)
                    .OrderByDescending(art => art.Id);

        return await query.PaginatedListAsync(request.PageNumber, request.PageSize);

    }
}


