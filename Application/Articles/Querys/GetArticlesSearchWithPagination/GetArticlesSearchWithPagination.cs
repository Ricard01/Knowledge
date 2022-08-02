using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Articles.Dto;
using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Articles.Querys.GetArticlesSearchWithPagination;

    public class GetArticlesSearchWithPaginationQuery : IRequest<PaginatedList<ArticleDto>>
    {
        public string Title { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int? CategoryId { get; set; }
    }

    public class GetArticlesSearchWithPaginationQueryHandler : IRequestHandler<GetArticlesSearchWithPaginationQuery, PaginatedList<ArticleDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetArticlesSearchWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PaginatedList<ArticleDto>> Handle(GetArticlesSearchWithPaginationQuery request, CancellationToken cancellationToken)
        {
            var query =
                          _context.Articles
                        .ProjectTo<ArticleDto>(_mapper.ConfigurationProvider)
                        .OrderBy(art => art.Title)
                        .Where(art => art.Title.Contains(request.Title) || art.Message.Contains(request.Title));

            if (request.CategoryId > 0)
            {
                query = query.Where(art => art.CategoryId == request.CategoryId);
            }            

            return await query.PaginatedListAsync(request.PageNumber, request.PageSize);

        }
    }


