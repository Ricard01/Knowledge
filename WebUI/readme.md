# WebUI

This layer is a single page application based on Angular 13 and ASP.NET Core 6. This layer depends on both the Application and Infrastructure layers, however, the dependency on Infrastructure is only to support dependency injection. Therefore only Startup.cs should reference Infrastructure.

## IIS Deployment

* [Enable IIS](https://dzone.com/articles/publish-and-deploy-angular-and-net-core-applicatio).
* Install the [.NET Core Hosting Bundle](https://dotnet.microsoft.com/permalink/dotnetcore-current-windows-runtime-bundle-installer) on the IIS server.
* Create SSL Selft Signed Certificate.
* ![Create your Site](https://github.com/Ricard01/img/blob/main/knowledge/IIS%20Site.png)
* Update **WebUI/appsettings.Production.json** so that the SSL Certificate CN:"Name" matches.
* `dotnet publish -c Release /p:PublishDir='C:/Web Sites/Knowledge'`

### More Information

* [Create SSL Certificate on IIS](https://msftwebcast.com/2019/11/create-and-bind-a-self-signed-certificate-in-iis-10.html).
* [PowerhShell Self Sign Certificate](https://adamtheautomator.com/new-selfsignedcertificate/).
  * In PowerShell
    * `$cert = New-SelfSignedCertificate -FriendlyName 'Knowledge Certificate' -DnsName knowledge.com, knowledge.ddns.me, PcName -NotAfter (Get-Date).AddYears(3) -CertStoreLocation Cert:\LocalMachine\My`

  * Display the new certificate properties
    * `$cert | Format-List -Property *`

  * optional export for azure or another deploy
    * `$pwd = ConvertTo-SecureString -String 'NoWayJosePassword!!' -Force -AsPlainText`

  * $path = 'Cert:\LocalMachine\My\' + $cert.thumbprint
    * `Export-PfxCertificate -cert $path -FilePath c:KnowledgeCertificate.pfx -Password $pwd`

* Modify host file (c:\Windows\System32\Drivers\etc\hosts) if you want to connect using a diferent domain name example. 192.168.XXX.XXX knowledge.com.
* [Automatically generating C# API clients on build with NSwag](https://blog.sanderaernouts.com/autogenerate-csharp-api-client-with-nswag).

### Common Errors

* Folder Permissions <https://stackoverflow.com/questions/67540956/allow-write-permissions-for-asp-net-core-api-application>.
* Nswag fails on build wihout migrations => Comment NSwag on WebUi.csproj before Initial migration.
* [Net Core IIS Not Working](https://www.youtube.com/watch?v=xnhEOBP-Hf4&ab_channel=RoundTheCode).
* [Solution CryptographicException](https://stackoverflow.com/questions/12106011/system-security-cryptography-cryptographicexception-keyset-does-not-exist).
