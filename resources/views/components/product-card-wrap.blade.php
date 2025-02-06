<div class="w-full bg-nl-400  dark:bg-nl-400 rounded-md">
    <div class="grid grid-cols-4 w-full px-4 bg-nl-500 dark:bg-nl-600 text-sm text-nl-200 rounded-md rounded-b-none">
        <span class="col-span-2">name</span>
        <span class="border-l border-nl-300 pl-2">price</span>
        <span class="border-l border-nl-300 pl-2">messages</span>
    </div>
    {{$slot}}
    <div class=" px-4 grid grid-cols-4">
        <span class="col-span-2 text-xs text-nl-200 pt-2"> </span>
        <span class=" text-xs text-nl-200 border-l border-nl-300 pl-2  pt-2"></span>
        <span class=" text-xs text-nl-200 border-l border-nl-300 pl-2  pt-2"></span>
    </div>
</div>