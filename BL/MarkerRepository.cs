using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;
using DataAccess;
namespace BL
{
    public class MarkerRepository
    {
        private static MarkerRepository single = null;
        public static MarkerRepository Instance
        {
            get
            {
                if (single == null)
                {
                    single = new MarkerRepository();
                }
                return single;
            }
        }
        public void AddMarker(Location marker)
        {
            MarkerRepository.Instance.AddMarker(marker);
        }

        public void DeleteMarkersByUsername(string username)
        {
            MarkerRepository.Instance.DeleteMarkersByUsername(username);
        }
    }
    }
