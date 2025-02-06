@props(['product'])
<a href="{{url('product/'.$product->i)}}" class=" px-4 grid grid-cols-4  bg-nl-400 hover:bg-nl-500">
  <span class="col-span-2 text-xs text-nl-200 pt-2">{{$product->name}} </span>
  <span class=" text-xs text-nl-200 border-l border-nl-300 pl-2 pt-2">{{$product->price}}</span>
  <span class=" text-xs text-nl-200 border-l border-nl-300 pl-2 pt-2">{{$product->message->count()}}</span>
</a>