@props(['message'])

<div class="w-full bg-nl-400  dark:bg-nl-400  rounded-md">
  <div class="py-3 px-4 flex gap-x-8">
    <p class="text-sm text-nl-200 leading-4">{{$message->message}}</p>
  </div>
  <div class="flex justify-between w-full px-4 bg-nl-500 dark:bg-nl-600 text-sm text-nl-200 rounded-md rounded-t-none">
    <span class=" flex gap-2 flex-wrap items-center">{{$message->name}} <span
        class="select-all">{{$message->phone}}</span>
    </span>
    <span class="select-all flex gap-1 items-center">{{$message->created_at->format('M:d')}}</span>
  </div>
</div>