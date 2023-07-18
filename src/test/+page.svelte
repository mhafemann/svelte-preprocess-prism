<script>
    let name = 'world';
</script>

<pre class="language-svelte" data-linenumbers="false" data-highlight="10,12">
{`
<script lang="ts">
    import RecentPosts from '$lib/components/RecentPosts.svelte';
 
    function sayHello(name: string) {
        console.log('Hello ' + name);
    }
<\/script>

<!-- example html comment -->
<p class="md:w-2/3">
    Do id id anim duis. Adipisicing elit elit elit magna do occaecat 
    proident irure.
</p>

<RecentPosts bind:posts/>

<style>
    /* example css comment */
    .test {
        padding: 0px;
    }
    div {
        color: red;
    }
</style>
`}
</pre>

<pre class="language-ts test" data-linenumbers="false" data-highlight="10,12">
<code>
{`
import RecentPosts from '$lib/components/RecentPosts.svelte';

function sayHello(name: string) {
    console.log('Hello ' + name);
}

sayHello('world'); // -> Hello world
`}
</code>
</pre>