using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace SwaggerUI.BodySave;

public static class SwaggerUICustomizer
{
    public static void UseCustomSwaggerUI(this IApplicationBuilder app)
    {
        app.UseSwaggerUI(options =>
        {
            options.InjectJavascript("SwaggerUI.BodySave.swagger-custom.js");
        });
    }

    private static void InjectJavascript(this SwaggerUIOptions options, string resourceName)
    {
        var assembly = typeof(SwaggerUICustomizer).Assembly;
        using var stream = assembly.GetManifestResourceStream(resourceName);
        using var reader = new StreamReader(stream);
        var js = reader.ReadToEnd();
        options.HeadContent += $"<script>{js}</script>";
    }
}