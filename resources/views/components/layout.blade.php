<!DOCTYPE html>
<html lang="en" data-theme="">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>E-com</title>
  @vite('resources/css/app.css')
</head>

<body class="min-h-screen font-maven bg-nl-150 dark:bg-nl-600 text-nl-150 ">
  {{$slot}}
  @vite('resources/js/app.js')
</body>


</html>