using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Common;
using DataAccess;
using BL;
using MITAssignment;
using System.Web.Script.Serialization;
using System.Web.Services;
using MITAssignment.Models;

namespace MITAssignment.Controllers
{
    public class MapController : Controller
    {
        // GET: Map
        public ActionResult Index()
        {
            return View();
        }
        public void SaveMarker(string Username, string Longitude, string Latitude, string Title, string Description, string Icon)
        {
            try
            {
                Location marker = new Location();
                marker.Username = Username;
                marker.Title = Title;
                marker.Description = Description;
                marker.Latitude = Latitude;
                marker.Longitude = Longitude;
                marker.Icon = Icon;
                MarkerRepository.Instance.AddMarker(marker);
            }
            catch (Exception ex)
            {

            }
        }
        public ActionResult NMEAToJsonList()
        {
            var jss = new JavaScriptSerializer();
            NMEAToJson n = new NMEAToJson();
            var json = n.ConvertNMEAtoJSON();
            var test = jss.Deserialize<List<NMEAModel>>(json);
            var TheJson = new { markers = json };
            return Json(json, JsonRequestBehavior.AllowGet);
        }
        public FileResult DownloadBackupFile(string Url)
        {

            string path = Server.MapPath("/Markers/" + Url);
            byte[] fileBytes = System.IO.File.ReadAllBytes(path);
            return File(fileBytes, "application/force-download", User.Identity.Name + "BackupFile.txt");
        }
    }
}