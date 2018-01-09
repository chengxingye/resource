<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
    <style>
        a{
          display:block;
          margin-top:5px;
        }
    </style>
</head>
<body>
{{#each files}}
    <a href="{{../dpr}}/{{files}}">[{{icon}}]{{files}}</a>
{{/each}}
</body>
</html>
