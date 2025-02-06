@props(['name'])
@error($name)
<p class=" text-sm text-nl-prime dark:text-nl-prime-light font-light">{{$message}}</p>
@enderror