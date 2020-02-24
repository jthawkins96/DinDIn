using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.DAL
{
    public class DinDinContext : DbContext
    {
        public DinDinContext(DbContextOptions<DinDinContext> options)
            : base(options)
        {
        }
    }
}
