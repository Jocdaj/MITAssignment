using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MITAssignment.Models
{
    [Serializable]
    public class NMEAModel
    {
        public string Lat { get; set; }
        public string Lon { get; set; }
        public string Time { get; set; }
    }
}