using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MITAssignment.Startup))]
namespace MITAssignment
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
