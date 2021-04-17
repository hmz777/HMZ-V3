using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMZ_V3.Models.Skills
{
    public class SkillListModel
    {
        public string Title { get; set; }
        public ICollection<string> Skills { get; set; }
    }
}
