using Application.Articles.Dto;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Articles.Querys.GetArticleById;

public record GetArticleByIdQuery(int Id) : IRequest<ArticleDto>;


public class GetArticleByIdQueryHandler : IRequestHandler<GetArticleByIdQuery, ArticleDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetArticleByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ArticleDto> Handle(GetArticleByIdQuery request, CancellationToken cancellationToken)
    {
        var query =
                      _context.Articles.TagWith("Get Article By Id")
                    .ProjectTo<ArticleDto>(_mapper.ConfigurationProvider)
                    .Where(art => art.Id == request.Id);

        return await query.FirstOrDefaultAsync();

    }
}


