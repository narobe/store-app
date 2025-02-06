@props([ 'class' => null, 'icon' => null])

<a {{$attributes}} class="font-normal hover:text-nl-50 {{$class}}">
    <div class="flex items-center gap-2">
        <x-icon icon="{{$icon ?? ''}}" />
        {{$slot}}
    </div>
</a>