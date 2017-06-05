using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace DataAccess
{
    public class UserRepository:ConnectionClass
    {
        public bool authLogin(string username, string password)
        {
            foreach (User u in DataContext.Users)
            {
                if (u.Username == username && u.Password == password)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
