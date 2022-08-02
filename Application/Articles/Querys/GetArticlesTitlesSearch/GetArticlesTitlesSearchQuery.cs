using Application.Articles.Dto;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Articles.Querys.GetArticlesTitlesSearch;

public class GetArticlesTitlesSearchQuery : IRequest<ArticlesTitlesVm>
{
    public string Title { get; set; }

    public int? CategoryId { get; set; }

}

public class GetArticlesTitlesSearchQueryHandler : IRequestHandler<GetArticlesTitlesSearchQuery, ArticlesTitlesVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetArticlesTitlesSearchQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ArticlesTitlesVm> Handle(GetArticlesTitlesSearchQuery request, CancellationToken cancellationToken)
    {

        var query = _context.Articles
          .AsNoTracking()
          .ProjectTo<ArticleTitleDto>(_mapper.ConfigurationProvider)
          .OrderBy(c => c.Title)
          .Take(1000);
        if (request.CategoryId > 0)
        {
            query = query.Where(art => art.CategoryId == request.CategoryId);
        }
        query = query.Where(art => art.Title.Contains(request.Title));

        return new ArticlesTitlesVm { Articles = await query.ToListAsync(cancellationToken) };

    }
}