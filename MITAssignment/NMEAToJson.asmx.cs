using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.IO;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using MITAssignment.Models;

namespace MITAssignment
{
    /// <summary>
    /// Summary description for NMEAToJson
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [ScriptService]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class NMEAToJson : WebService
    {

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public string ConvertNMEAtoJSON()
        {
            try
            {
                string JSONresult = "";
                string path = Server.MapPath("/testNMEA.txt");
                List<NMEAModel> list = new List<NMEAModel>();
                if (File.Exists(path))
                {
                    string line;

                    StreamReader file = new StreamReader(path);
                    while ((line = file.ReadLine()) != null)
                    {
                        NMEAModel nmea = new NMEAModel();
                        string[] words = line.Split(',');
                        string type = words[0];
                        if (type == "$GPGGA")
                        {
                            nmea.Time = words[1];
                            nmea.Lat = words[2];
                            nmea.Lon = words[4];
                            list.Add(nmea);
                        }
                    }
                    file.Close();
                    var jss = new JavaScriptSerializer();
                    JSONresult = jss.Serialize(list);
                }
                return JSONresult;
            }
            catch (IOException ex)
            {
                throw ex;
            }
        }
    }
}
