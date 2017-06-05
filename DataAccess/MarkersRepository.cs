using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccess
{
    public class MarkersRepository:ConnectionClass
    {
        private static MarkersRepository single = null;

        public static MarkersRepository Instance
        {
            get
            {
                if (single == null)
                {
                    single = new MarkersRepository();
                }
                return single;
            }
        }
        public void AddMarker(Location marker)
        {

            DataContext.Locations.Add(marker);
            DataContext.SaveChanges();
        }
        public List<Location> GetMarkersByUsername(string username)
        {
            return DataContext.Locations.Where(p => p.Username == username).ToList();
        }
        public void DeleteMarkersByUsername(string username)
        {
            List<Location> markers = GetMarkersByUsername(username);

            foreach (Location m in markers)
            {
                this.DataContext.Locations.Remove(m);
                this.DataContext.SaveChanges();
            }
        }
    }
}
