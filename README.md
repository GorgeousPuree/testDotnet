# This is an implementation of a random test task from the Internet. Built with `Asp.Net Core` + `React/Redux`. 
## Task - https://github.com/emleonid/test-case-react
### How to start:
* Set default connection string for database in **appsettings.json** or **secrets.json** like this:
```
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost; Port=5432; Database=DotnetTest; Username=postgres; Password=12345;"
  }
}
```
* Go to `testDotnet/testDotnetBackend/testDotnetBackend.Web/` and run **dotnet run**;
* Go to `testDotnet/test-dotnet-frontend/` and run **npm start**;
* Go to `localhost:3000`;


# Results:
* Provided API
![swagger](https://user-images.githubusercontent.com/46875481/91648375-6b425480-ea6f-11ea-9f1e-c6be5c43653b.PNG)
* Client interface
![interface](https://user-images.githubusercontent.com/46875481/91648408-e146bb80-ea6f-11ea-8b0b-a021816a8340.PNG)
* Filters
![filters](https://user-images.githubusercontent.com/46875481/91661292-cc0b7480-eae3-11ea-85c6-596cc7f6417d.gif)
* Update and delete transaction
![updateDelete](https://user-images.githubusercontent.com/46875481/91661347-1e4c9580-eae4-11ea-84c4-77d3c733d736.gif)
* Pagination
![pageChanger](https://user-images.githubusercontent.com/46875481/91661721-797f8780-eae6-11ea-940b-b1151259c40b.gif)
* Export table based on chosen filters
![export](https://user-images.githubusercontent.com/46875481/91661741-8ac89400-eae6-11ea-93c6-972b18319ad4.gif)
* Import csv based on upsert
![import](https://user-images.githubusercontent.com/46875481/91661754-9b790a00-eae6-11ea-97c1-7ac24d5387a5.gif)
* Information toasts that display current process/result/error

![unknownStatus](https://user-images.githubusercontent.com/46875481/91661783-d11df300-eae6-11ea-8c99-327a4be3bc60.gif)

---
![unknownType](https://user-images.githubusercontent.com/46875481/91661788-d67b3d80-eae6-11ea-820c-319a5e700eb9.gif)

---
![notSupported](https://user-images.githubusercontent.com/46875481/91661795-dc711e80-eae6-11ea-893d-57ab944041d4.gif)

---
![networkError](https://user-images.githubusercontent.com/46875481/91661798-e004a580-eae6-11ea-9c8b-5180cb40042f.gif)
