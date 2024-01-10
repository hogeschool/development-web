using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using frontend.Models;

namespace frontend.Controllers;

public class HomeController : Controller
{
    public HomeController()
    {
    }

    [HttpGet("/")]
    public IActionResult HomePage()
    {
        return View();
    }
}
