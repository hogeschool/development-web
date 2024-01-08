using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<BearerTokenOptions>(builder.Configuration.GetSection("BearerTokenOptions"));
builder.Services.AddTransient<IUserStorage, UserStorageOnDisc>();
builder.Services.AddControllers();

var app = builder.Build();

app.Urls.Add("http://localhost:5000");
app.MapControllers();

app.Run();

public record User(Guid Id, string Name, DateTime Birthday);

// /User/UserController.cs

[Route("api/user")]
public class UserController : Controller
{
  readonly IUserStorage userStorage;
  public UserController(IUserStorage userStorage)
  {
    this.userStorage = userStorage;
  }

  [HttpPost()]
  public async Task<IActionResult> CreateUser([FromBody] User newUser)
  {
    await userStorage.SaveUser(newUser with { Id = Guid.NewGuid() });
    return Ok();
  }

  [BearerTokenAuthorizationActionFilter]
  [HttpGet()]
  public async Task<IActionResult> GetUser([FromQuery] Guid userId) => Ok(await userStorage.GetUser(userId));

  [HttpGet("all")]
  public async Task<IActionResult> GetUsers([FromQuery] Guid[] userIds) => Ok(await userStorage.GetUsers(userIds));
}

public interface IUserStorage
{
  Task SaveUser(User newUser);
  Task<UserReadResult> GetUser(Guid userId);
  Task<UserBatchReadResult> GetUsers(Guid[] userIds);
}

public class UserStorageOnDisc : IUserStorage
{
  public async Task SaveUser(User newUser)
  {
    var path = $"users/{newUser.Id}.json";
    await System.IO.File.WriteAllTextAsync(path, JsonSerializer.Serialize(newUser));
  }

  public async Task<UserReadResult> GetUser(Guid userId)
  {
    var path = $"users/{userId}.json";
    if (System.IO.Path.Exists(path) == false) return new UserReadResultFailure($"User {userId} not found.");
    var user = JsonSerializer.Deserialize<User>(await System.IO.File.ReadAllTextAsync(path));
    if (user == null) return new UserReadResultFailure($"User {userId} found but cannot be deserialized.");
    return new UserReadResultSuccessful(user);
  }

  public async Task<UserBatchReadResult> GetUsers(Guid[] userIds) {
    var results = new List<User>();
    var errors = new List<Guid>();
    foreach (var userId in userIds)
    {
      try
      {
        var user = await this.GetUser(userId);
        if (user is UserReadResultSuccessful(User u)) {
          results.Add(u);
        } else {
          errors.Add(userId);  
        }
      }
      catch (System.Exception)
      {
        errors.Add(userId);
      }
    }
    return new UserBatchReadResult(results, errors);
  }
}

public record UserBatchReadResult(List<User> Successful, List<Guid> Failed);
public interface UserReadResult {}
public record UserReadResultSuccessful(User User) : UserReadResult {}
public record UserReadResultFailure(string Error) : UserReadResult {}

public class BearerTokenAuthorizationActionFilter : Attribute, IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext actionContext, ActionExecutionDelegate next)
    {
      var context = actionContext.HttpContext;
      var bearerTokenOptions = context.RequestServices.GetService<IOptions<BearerTokenOptions>>()!.Value;
      if (!context.Request.Headers.ContainsKey("BearerToken")) {
        Console.WriteLine($"{context.Request.Path} was denied because no bearer token was found");
        context.Response.StatusCode = 401;
        return;
      }
      if (context.Request.Headers["BearerToken"] != bearerTokenOptions.BearerToken) {
        Console.WriteLine($"{context.Request.Path} was denied because the bearer token was not valid");
        context.Response.StatusCode = 401;
        return;
      }
      Console.WriteLine($"{context.Request.Path} was handled");
      await next();
    }
}

public class BearerTokenOptions {
  public string BearerToken { get; set; } = "";
}
