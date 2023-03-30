![Cratebox.io Logo](https://github.com/alexvcasillas/cratebox/blob/main/public/cratebox-logo.svg)

# Cratebox

```
cratebox.io/:package@:version/:file
```

## Cratebox.io is a global, fast content delivery network for NPM

Cratebox is a rapid and widespread content delivery network that caters to all of NPM's offerings. It enables you to promptly and effortlessly retrieve any file from any package by employing a URL.

## Examples

If you would like to have the 18.2.0 react production package, you just need to use the following URL:

https://cratebox.io/react@18.2.0/umd/react.production.min.js

### Including a served file in your application

A simple example about how you can include a library server by Cratebox.io into your HTML file.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <!-- Served with Cratebox.io --->
    <script src="https://cratebox.io/jquery@3.2.1/dist/jquery.min.js"></script>
    <!-- In src/index.js we have jQuery $ available! --->
    <script src="src/index.js"></script>
  </body>
</html>
```
