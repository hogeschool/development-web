using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddTransient<UserStorageOnDisc>();
builder.Services.AddControllers();

var app = builder.Build();

app.Urls.Add("http://localhost:5000");
app.MapControllers();

// app.UseHttpsRedirection();
// app.UseAuthorization();

app.Run();

public record User(Guid Id, string Name, DateTime Birthday);

// /User/UserController.cs

[Route("api/user")]
public class UserController : Controller
{
  readonly UserStorageOnDisc userStorageOnDisc;
  public UserController(UserStorageOnDisc userStorageOnDisc)
  {
    this.userStorageOnDisc = userStorageOnDisc;
  }

  [HttpPost()]
  public async Task<IActionResult> CreateUser([FromBody] User newUser)
  {
    await userStorageOnDisc.SaveUser(newUser with { Id = Guid.NewGuid() });
    return Ok();
  }

  [HttpGet()]
  public async Task<IActionResult> GetUser([FromQuery] Guid userId) => Ok(await userStorageOnDisc.ReadUser(userId));

  [HttpGet("all")]
  public async Task<IActionResult> GetUsers([FromQuery] Guid[] userIds) => Ok(await userStorageOnDisc.GetUsers(userIds));
}

public class UserStorageOnDisc
{
  public async Task SaveUser(User newUser)
  {
    var path = $"users/{newUser.Id}.json";
    await System.IO.File.WriteAllTextAsync(path, JsonSerializer.Serialize(newUser));
  }

  public async Task<UserReadResult> ReadUser(Guid userId)
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
        var user = await this.ReadUser(userId);
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