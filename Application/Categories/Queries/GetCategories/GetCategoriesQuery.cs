
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Categories.Queries.GetCategories;

public record GetCategoriesQuery : IRequest<CategoriesVm>;


public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, CategoriesVm>
{

    private readonly IApplicationDbContext _context;

    private readonly IMapper _mapper;

    public GetCategoriesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<CategoriesVm> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        return new CategoriesVm
        {
            Categories = await _context.Categories
            .AsNoTracking()
            .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
            .OrderBy(c => c.Name)
            .ToListAsync(cancellationToken)
        };
    }
}

