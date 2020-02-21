using DinDin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin
{
    public class DataManager
    {
        public static List<Test> GetData()
        {
            var r = new Random();
            return new List<Test>()
        {
           new Test { Data = new List<int> { r.Next(1, 40) }, Label = "Data1" },
           new Test { Data = new List<int> { r.Next(1, 40) }, Label = "Data2" },
           new Test { Data = new List<int> { r.Next(1, 40) }, Label = "Data3" },
           new Test { Data = new List<int> { r.Next(1, 40) }, Label = "Data4" }
        };
        }
    }
}
